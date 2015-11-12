/**
 * Created by khuongdt on 11/12/2015.
 */

goog.provide('bigfox.core.websocket.BFConnectionHandler');

goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventHandler');
goog.require('goog.net.WebSocket.EventType');

goog.require('bigfox.core.websocket.BFConnection');
goog.require('bigfox.core.websocket.BFConnection.MessageEvent');


/**
 * @param {!bigfox.core.websocket.BFConnection} bfConnection The Big Fox connection
 * @constructor
 */
bigfox.core.websocket.BFConnectionHandler = function (bfConnection) {

    goog.asserts.assert(goog.isDefAndNotNull(bfConnection), 'Connection is null');
    goog.asserts.assert(bfConnection instanceof bigfox.core.websocket.BFConnection, 'Invalid connection type, must be BFConnection');

    bigfox.core.websocket.BFConnectionHandler.base(this, 'constructor');
    this._bfConnection = bfConnection;

    this.init_();
}
goog.inherits(bigfox.core.websocket.BFConnectionHandler, goog.events.EventHandler);

bigfox.core.websocket.BFConnectionHandler.prototype.init_ = function () {
    goog.events.listen(this._bfConnection, goog.net.WebSocket.EventType.OPENED, this.onOpen, false, this);
    goog.events.listen(this._bfConnection, goog.net.WebSocket.EventType.MESSAGE, this.onMessage, false, this);
    goog.events.listen(this._bfConnection, goog.net.WebSocket.EventType.ERROR, this.onError, false, this);
    goog.events.listen(this._bfConnection, goog.net.WebSocket.EventType.CLOSED, this.onClose, false, this);
}

bigfox.core.websocket.BFConnectionHandler.prototype.getCurrentConnection = function(){
    return this._bfConnection;
}

bigfox.core.websocket.BFConnectionHandler.prototype.onOpen = goog.abstractMethod;

bigfox.core.websocket.BFConnectionHandler.prototype.onMessage = goog.abstractMethod;

bigfox.core.websocket.BFConnectionHandler.prototype.onError = goog.abstractMethod;

bigfox.core.websocket.BFConnectionHandler.prototype.onClose = goog.abstractMethod;

goog.exportSymbol('BFConnectionHandler', bigfox.core.websocket.BFConnectionHandler);
goog.exportSymbol('BFConnectionHandler.prototype.onOpen', bigfox.core.websocket.BFConnectionHandler.prototype.onOpen);
goog.exportSymbol('BFConnectionHandler.prototype.onMessage', bigfox.core.websocket.BFConnectionHandler.prototype.onMessage);
goog.exportSymbol('BFConnectionHandler.prototype.onError', bigfox.core.websocket.BFConnectionHandler.prototype.onError);
goog.exportSymbol('BFConnectionHandler.prototype.onClose', bigfox.core.websocket.BFConnectionHandler.prototype.onClose);
goog.exportSymbol('BFConnectionHandler.prototype.getCurrentConnection', bigfox.core.websocket.BFConnectionHandler.prototype.getCurrentConnection);