/**
 * Created by khuongdt on 11/13/2015.
 * Author : khuongdt
 * Copyright @ 2015 by OneSoft.,JSC
 */
goog.provide('com.onesoft.livetube.net.SessionHandler');
goog.provide('com.onesoft.livetube.net.SessionHandler.EventTypes');

goog.require('goog.log');
goog.require('goog.events');
goog.require('goog.events.EventTarget');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.websocket.BFConnection');
goog.require('bigfox.core.websocket.BFConnectionHandler');


com.onesoft.livetube.net.SessionHandler = function(connection){
    com.onesoft.livetube.net.SessionHandler.base(this,"constructor",connection)
}
goog.inherits(com.onesoft.livetube.net.SessionHandler,bigfox.core.websocket.BFConnectionHandler);

com.onesoft.livetube.net.SessionHandler.prototype.onOpen = function(e){

}
com.onesoft.livetube.net.SessionHandler.prototype.onMessage = function(e){
    var msg = e.message;
    console.log('Message: ', e.message);
    //this.dispatchEvent();
}

com.onesoft.livetube.net.SessionHandler.prototype.onError = function(e){

    console.log('Error: ', e);
}

com.onesoft.livetube.net.SessionHandler.prototype.onClose = function(e){
    if(goog.DEBUG){
        console.log('Connection closed!');
    }
}


com.onesoft.livetube.net.SessionHandler.EventTypes ={
    /**
     * Fired when an attempt to open the WebSocket fails or there is a connection
     * failure after a successful connection has been established.
     */
    CLOSED: goog.events.getUniqueId('closed'),

    /**
     * Fired when the WebSocket encounters an error.
     */
    ERROR: goog.events.getUniqueId('error'),

    /**
     * Fired when a new message arrives from the WebSocket.
     */
    MESSAGE: goog.events.getUniqueId('message'),

    /**
     * Fired when the WebSocket connection has been established.
     */
    OPENED: goog.events.getUniqueId('opened')
}