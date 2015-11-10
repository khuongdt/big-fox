/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.core.ConnectionManager');

goog.require('goog.log');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

goog.require('bigfox.Global');
goog.require('bigfox.core.config.Config');
goog.require('bigfox.core.WebSocketClientHandler');

bigfox.core.ConnectionManager = function (options) {
    bigfox.core.ConnectionManager.base(this, 'constructor');
    this.init();
}
goog.inherits(bigfox.core.ConnectionManager, goog.events.EventTarget);
goog.addSingletonGetter(bigfox.core.ConnectionManager);


bigfox.core.ConnectionManager.MAX_TIMEOUT = 20; //20 s

/**
 * @private
 * @type {number}
 */
bigfox.core.ConnectionManager.prototype.validationCode = 0;


/**
 * @public
 * @type {number}
 */
bigfox.core.ConnectionManager.prototype.curSSequence = 0;

/**
 * @public
 * @type {number}
 */
bigfox.core.ConnectionManager.prototype.curMSequence = 0;

/**
 * @public
 * @type {number}
 */
bigfox.core.ConnectionManager.prototype.mSequenceFromServer = 0;

/**
 *
 * @type {Object}
 */
bigfox.core.ConnectionManager.prototype.queueOutMessage = {};

/**
 * @type {number}
 */
bigfox.core.ConnectionManager.prototype.lastPingReceivedTime = 0;

bigfox.core.ConnectionManager.prototype._sessionId = "";

/**
 * @private
 */
bigfox.core.ConnectionManager.prototype._sessionControl = null;

bigfox.core.ConnectionManager.prototype.wsUri = null;


/**
 * Init connection manager
 */
bigfox.core.ConnectionManager.prototype.init = function () {
    if (this._sessionId == "") {
        //creates new web socket connection
        this.wsUri = "ws://" + bigfox.core.config.Config.ServerInfo.host + ":" + bigfox.core.config.Config.ServerInfo.port + '/' + bigfox.core.config.Config.ServerInfo.channel + '/';
        this._webSocketClientHandler = new bigfox.core.WebSocketClientHandler(this.wsUri);
        //this._webSocketChannelHandler = new WebSocketChanelDecoder();
    }

}

bigfox.core.ConnectionManager.prototype.setSessionId = function (sessionId) {
    this._sessionId = sessionId || "";
}

bigfox.core.ConnectionManager.prototype.getSessionId = function () {
    return this._sessionId;
}