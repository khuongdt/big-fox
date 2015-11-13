/**
 * Created by khuongdt on 11/12/2015.
 */

goog.provide('bigfox.core.websocket.BFConnection');
//goog.provide('bigfox.core.websocket.BFConnection.EventType');
goog.provide('bigfox.core.websocket.BFConnection.MessageEvent');

goog.require('goog.log');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('goog.net.WebSocket');
goog.require('goog.net.WebChannel');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.base.CSClientInfo');
goog.require('bigfox.core.util.BFUtil');
goog.require('bigfox.core.util.BFCompressUtil');
goog.require('bigfox.core.crypt.CryptManager');


bigfox.core.websocket.BFConnection = function (opt_autoReconnect, opt_getNextReconnect) {
    bigfox.core.websocket.BFConnection.base(this, 'constructor', opt_autoReconnect, opt_getNextReconnect);

    this._logger = goog.log.getLogger('bigfox.core.websocket.BFConnection');
}
goog.inherits(bigfox.core.websocket.BFConnection, goog.net.WebSocket);
goog.exportSymbol('BFConnection', bigfox.core.websocket.BFConnection);
goog.exportSymbol('BFConnection.randomSessionId', bigfox.core.websocket.BFConnection.randomSessionId);
goog.exportSymbol('BFConnection.prototype.open', bigfox.core.websocket.BFConnection.prototype.open);
goog.exportSymbol('BFConnection.prototype.close', bigfox.core.websocket.BFConnection.prototype.close);
goog.exportSymbol('BFConnection.prototype.getValidationCode', bigfox.core.websocket.BFConnection.prototype.getValidationCode);
goog.exportSymbol('BFConnection.prototype.getSessionId', bigfox.core.websocket.BFConnection.prototype.getSessionId);
goog.exportSymbol('BFConnection.prototype.getCurMsgSeq', bigfox.core.websocket.BFConnection.prototype.getCurMsgSeq);
goog.exportSymbol('BFConnection.prototype.getCurSvrSeq', bigfox.core.websocket.BFConnection.prototype.getCurSvrSeq);


bigfox.core.websocket.BFConnection.MAX_POOL_SIZE = 1000;


bigfox.core.websocket.BFConnection.prototype._logger = undefined;
/**
 * @type {string}
 * @private
 */
bigfox.core.websocket.BFConnection.prototype._sid = "";

bigfox.core.websocket.BFConnection.prototype.mSequence = 0;

bigfox.core.websocket.BFConnection.prototype.sSequence = 0;

/**
 * @type {!number}
 * @private
 */
bigfox.core.websocket.BFConnection.prototype._validationCode = 0;


/**
 * An array of queued messages that need to be sent to the server.
 * @type {Array.<bigfox.core.base.BaseMessage>}
 */
bigfox.core.websocket.BFConnection.prototype.outgoingMessages = [];

/**
 * An array of dequeued maps that we have either received a non-successful
 * response for, or no response at all, and which therefore may or may not
 * have been received by the server.
 * @type {Array.<bigfox.core.base.BaseMessage>}
 */
bigfox.core.websocket.BFConnection.prototype.pendingMessages = [];


bigfox.core.websocket.BFConnection.prototype.getSessionId = function () {
    return this._sid;
}

bigfox.core.websocket.BFConnection.prototype.setSessionId = function (sid) {
    this._sid = sid;
}

bigfox.core.websocket.BFConnection.prototype.getCurMsgSeq = function () {
    return this.mSequence;
}
bigfox.core.websocket.BFConnection.prototype.getNextMsgSeq = function () {
    return ++this.mSequence;
}

bigfox.core.websocket.BFConnection.prototype.getCurSvrSeq = function () {
    return this.sSequence;
}

/**
 * @private
 * @param sSequence
 */
bigfox.core.websocket.BFConnection.prototype.setSvrSequence = function (sSequence) {
    this.sSequence = sSequence;
}

bigfox.core.websocket.BFConnection.prototype.getValidationCode = function () {
    return this._validationCode;
}

/**
 * @param {!number} code  The validation code that sent from server in the 1st message.
 * @private
 */
bigfox.core.websocket.BFConnection.prototype.setValidationCode = function (code) {
    this._validationCode = code;
}

bigfox.core.websocket.BFConnection.prototype.onMessage_ = function (event) {

    var message = event.data;
    var self = this;
    //todo: convert blob -> typed array
    var reader = new FileReader();
    reader.addEventListener("loadend", function () {
        // reader.result contains the contents of blob as a typed array
        var data = reader.result;

        var bfUtil = bigfox.core.util.BFUtil.getInstance();

        var dataView = new DataView(data);
        var typedData = new Uint8Array(data.slice(0, 24));
        var headerTag = 0;
        headerTag |= (typedData[4] << 24);
        headerTag |= (typedData[5] << 16);
        headerTag |= (typedData[6] << 8);
        headerTag |= typedData[7];


        if (headerTag != SC_VALIDATION_CODE) {
            var dataBuffer = new Uint8Array(data);
            //decompress data
            dataBuffer = bigfox.core.util.BFCompressUtil.decompress(dataBuffer, 24);
            //decrypt data
            dataView = bigfox.core.crypt.CryptManager.decryptByteArray(self._validationCode, dataBuffer);
        }
        //todo: make correct class
        var msg = bfUtil.readDataToMessage(dataView);

        switch (headerTag){
            //Big fox core message when initialize
            case SC_VALIDATION_CODE:
                self._validationCode = msg.getValidationCode();
                //todo: Send CSClientInfo
                self.sendClientInfo_();
                break;
            case SC_INIT_SESSION:
                break;
            case SC_PING:
                break;
            default :
                break;
        }
        //if (msg instanceof  bigfox.core.base.SCValidationCode) {
        //    self._validationCode = msg.getValidationCode();
        //
        //    self.sendClientInfo_();
        //
        //}

        self.dispatchEvent(new bigfox.core.websocket.BFConnection.MessageEvent(msg));
    });
    reader.readAsArrayBuffer(message);

    //this.dispatchEvent(new goog.net.WebSocket.MessageEvent(message));
}

bigfox.core.websocket.BFConnection.getRandomSessionId = function(length){
    var len = length || 12;
    return goog.string.getRandomString();
}

/**
 * Send CSClientInfo to Bigfox Server
 * @private
 */
bigfox.core.websocket.BFConnection.prototype.sendClientInfo_ = function(){
    var csClient = new bigfox.core.base.CSClientInfo();
    if(this._sid.length==0){
        this._sid = bigfox.core.websocket.BFConnection.getRandomSessionId();
    }
    csClient.setSessionId(this._sid);
    csClient.mSequence = this.getNextMsgSeq();
    csClient.sSequence = this.getCurSvrSeq();

    this.sendMessage(csClient);

}

/**
 * Send base message to server
 * @param {bigfox.core.base.MessageOut} messageOut The base message to send
 */
bigfox.core.websocket.BFConnection.prototype.sendMessage = function(messageOut){
    goog.asserts.assert(messageOut instanceof  bigfox.core.base.BaseMessage,' Invalid message instance');

    messageOut.mSequence = this.getNextMsgSeq();
    messageOut.sSequence = this.getCurSvrSeq();

    var buffer =messageOut.toByteArray();
    //send csClientInfo to Server
    buffer = new Int8Array(buffer);

    //encrypt message data to send
    buffer = bigfox.core.crypt.CryptManager.encrypt(this._validationCode, buffer);
    //compress message
    buffer = bigfox.core.util.BFCompressUtil.compress(buffer, 24);

    //todo: Send and Queue to outgoingMessage
    this.send(buffer);
}

/**
 * Object representing a new incoming message event.
 *
 * @param {bigfox.core.base.BaseMessage} baseMessage The raw message coming from the web socket.
 * @extends {goog.events.Event}
 * @constructor
 * @final
 */
bigfox.core.websocket.BFConnection.MessageEvent = function (baseMessage) {
    bigfox.core.websocket.BFConnection.MessageEvent.base(
        this, 'constructor', goog.net.WebSocket.EventType.MESSAGE);

    /**
     * The new message from the BFConnection.
     * @type {bigfox.core.base.BaseMessage}
     */

    this.message = baseMessage;
};
goog.inherits(bigfox.core.websocket.BFConnection.MessageEvent, goog.events.Event);