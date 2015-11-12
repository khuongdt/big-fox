/**
 * Created by khuongdt on 11/12/2015.
 */


goog.provide('bigfox.example.ChatHandler');

goog.require('goog.log');
goog.require('goog.events');
goog.require('goog.events.EventTarget');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');

goog.require('bigfox.core.crypt.CryptManager');
goog.require('bigfox.core.util.BFCompressUtil');
goog.require('bigfox.core.websocket.BFConnectionHandler');


/**
 *
 * @param {!bigfox.core.websocket.BFConnection} connection
 * @constructor
 */
bigfox.example.ChatHandler= function(connection){
    bigfox.example.ChatHandler.base(this,'constructor', connection)
}
goog.inherits(bigfox.example.ChatHandler,bigfox.core.websocket.BFConnectionHandler);


bigfox.example.ChatHandler.prototype.onOpen = function(e){

}
bigfox.example.ChatHandler.prototype.onMessage = function(e){

    console.log('On Message in Chat handler: ', e.message);
    if(e.message instanceof bigfox.example.SCChatMessage){
        $('.chat').append(e.message.getMessage());
        $('.chat').append('<br>');
    }

}

bigfox.example.ChatHandler.prototype.onError = function(e){

}

bigfox.example.ChatHandler.prototype.onClose = function(e){
    if(goog.DEBUG){
        console.log('Connection closed!');
    }
}