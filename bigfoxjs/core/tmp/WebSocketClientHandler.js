/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.core.WebSocketClientHandler');


goog.require('goog.log');
goog.require('goog.crypt');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.Listenable');
goog.require('goog.net.WebSocket');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.util.BFUtil');
goog.require('bigfox.core.util.BFCompressUtil');
goog.require('bigfox.core.crypt.CryptManager');

bigfox.core.WebSocketClientHandler = function (uri, websocket) {
    bigfox.core.WebSocketClientHandler.base(this,'constructor');
    this.wsUri = uri || "";
    this._connection = websocket;
    this.init();

}
goog.inherits(bigfox.core.WebSocketClientHandler, goog.events.EventTarget);

bigfox.core.WebSocketClientHandler.prototype.wsUri = "";

/**
 * @type {number}
 * @private
 */
bigfox.core.WebSocketClientHandler.prototype._validationCode =0 ;

bigfox.core.WebSocketClientHandler.prototype._logger = goog.log.getLogger('bigfox.core.WebSocketClientHandler');

/**
 *
 * @type {goog.net.WebSocket}
 * @private
 */
bigfox.core.WebSocketClientHandler.prototype._connection = null;

bigfox.core.WebSocketClientHandler.prototype._logger = goog.log.getLogger('bigfox.core.WebSocketClientHandler');


bigfox.core.WebSocketClientHandler.prototype.init = function () {

    goog.events.listen(this._connection, goog.net.WebSocket.EventType.OPENED, this.onOpen, false, this);
    goog.events.listen(this._connection, goog.net.WebSocket.EventType.ERROR, this.onError, false, this);
    goog.events.listen(this._connection, goog.net.WebSocket.EventType.MESSAGE, this.onMessage, false, this);
    goog.events.listen(this._connection, goog.net.WebSocket.EventType.CLOSED, this.onClose, false, this);

}

bigfox.core.WebSocketClientHandler.prototype.onOpen = function (e) {
    if (goog.DEBUG) {
        goog.log.info(this._logger, 'On websocket open!', e);
        console.log('On open connection:', e);
    }
}
bigfox.core.WebSocketClientHandler.prototype.onError = function (e) {
    goog.log.info(this._logger, 'On websocket Error!', e);
}

bigfox.core.WebSocketClientHandler.prototype.onMessage = function (e) {
    goog.log.info(this._logger, 'On websocket message!', e);
    //TODO: Read binary stream information
    var data = e.message;

    var message = e.message;
    var self = this;
    //todo: convert blob -> typed array
    var reader = new FileReader();
    reader.addEventListener("loadend", function () {
        // reader.result contains the contents of blob as a typed array
        var data = reader.result;

        var testData = new Int8Array(data.slice(0,24));
        var bfUtil = bigfox.core.util.BFUtil.getInstance();

        var dataView = new DataView(data);
        var headerTag = 0;
        headerTag = headerTag | (testData[4] << 24);
        headerTag = headerTag | (testData[5] << 16);
        headerTag = headerTag | (testData[6] << 8);
        headerTag = headerTag | testData[7];
        console.log(' Header tag: ', headerTag);

        var header = bfUtil.readHeader(dataView);

        if (header.tag != SC_VALIDATION_CODE) {
            var dataBuffer = new Uint8Array(data);

            //decompress data
            dataBuffer = bigfox.core.util.BFCompressUtil.decompress(dataBuffer, 24);

            //decrypt data
            dataView = bigfox.core.crypt.CryptManager.decryptByteArray(self._validationCode, dataBuffer);
        }
        //todo: make correct class
        var msg = bfUtil.readDataToMessage(dataView);

        if (msg instanceof  bigfox.core.base.SCValidationCode) {
            self._validationCode = msg.getValidationCode();

            //msg.execute(this._connection);
        }

        //self.dispatchEvent(new bigfox.core.websocket.BFConnection.MessageEvent(msg));
    });
    reader.readAsArrayBuffer(message);
    //goog.log.info(this._logger, 'Parse to Class: ', this.readBinaryStream(data));
    console.log('Parse to Class: ', this.readBinaryStream(data));
}
bigfox.core.WebSocketClientHandler.prototype.onClose = function (e) {
    console.log('On websocket Close!', e);
}

/**
 * Read binary stream input
 * @param {Array.<number> || Uint8Array} data the data from server
 * @return {BaseMessage}
 */
bigfox.core.WebSocketClientHandler.prototype.readBinaryStream = function (data) {
    //todo: test convert data


    //todo: decrypt data
    //data = bigfox.core.crypt.CryptManager.encrypt(data);
return;
    var dataView = new DataView(data);

    var bfUtil = bigfox.core.util.BFUtil.getInstance();

    var header = bfUtil.readHeader(dataView);
    if(header.tag != SC_VALIDATION_CODE){
        var dataBuffer = new Uint8Array(data);
        //todo: decompress data
        dataBuffer = bigfox.core.util.BFCompressUtil.decompress(dataBuffer, 24);

        //todo: decrypt data
        console.log('Data buffer: ', dataBuffer);

        dataView = bigfox.core.crypt.CryptManager.decryptByteArray(this._validationCode,dataBuffer);
    }
    //todo: read message content
    var content = bfUtil.readContentData(dataView, 24, header);
    console.log('Content: ', content);

    //todo: make correct class
    var msg = bfUtil.readDataToMessage(dataView);
    if (msg instanceof  bigfox.core.base.SCValidationCode) {
        this._validationCode = msg.getValidationCode();
        msg.execute(this._connection);
    } else {
        //console.log('Message from server', msg);
    }

    return msg;

    //test with array [1, 2, 6, 8, 9]

    var arr = [1, 2, 6, 8, 9, -1590];
    console.log('array test: ', arr);
    var arrayBytes = bfUtil.writeArrayInt(arr);

    var buffer = new ArrayBuffer((arr.length + 1) * 4);
    var dv = new DataView(buffer);
    var byteOffset = 0;

    console.log('Buffer length: ', dv.byteLength);

    dv.setInt32(byteOffset, arr.length);
    byteOffset += 4;

    arr.forEach(function (element, index) {
        "use strict";
        dv.setInt32(byteOffset, element);
        byteOffset += 4;
    });
    console.log('Array parsed: ', bfUtil.readArray(dv, 0, bigfox.core.util.BFUtil.INT));

    //console.log(bfUtil.writeArray(arr, BFUtil.INT));
    //console.log('string array: ', bfUtil.writeArray([null, 'b56', 'c', 'd', 'e56'], BFUtil.STRING));


    //test Array String
    var strs = ['abc', "1", "2", "3", "4", "5"];
    var len = 4; //length
    strs.forEach(function (el) {
        "use strict";
        len += 1; // for null value
        len += 2;  //length

        len += goog.crypt.stringToUtf8ByteArray(el).length;
    });
    console.log('byteLength of string array: ', len);
    buffer = new ArrayBuffer(len);
    dv = new DataView(buffer);
    byteOffset = 0;
    dv.setInt32(byteOffset, strs.length);
    byteOffset += 4;

    strs.forEach(function (el) {
        "use strict";
        dv.setInt8(byteOffset++, bigfox.core.util.BFUtil.NOT_NULL)
        dv.setInt16(byteOffset, el.length);
        byteOffset += 2;
        goog.crypt.stringToUtf8ByteArray(el).forEach(function (e) {
            dv.setInt8(byteOffset++, e);
        });
    });
    console.log('string array input: ', strs);
    console.log('Parsed string array: ', bfUtil.readArrayString(dv))

    return msg;


}