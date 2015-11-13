/**
 * Created by khuongdt on 11/10/2015.
 */
goog.provide('bigfox.example.ChatApp');

goog.require('goog.log');
goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.FancyWindow');


goog.require('bigfox.core.config.Config');
goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.websocket.BFConnection');
goog.require('bigfox.core.websocket.BFConnection.MessageEvent');
goog.require('bigfox.core.websocket.BFConnectionHandler');

goog.require('bigfox.core.base.CSClientInfo');
goog.require('bigfox.core.base.CSPing');
goog.require('bigfox.core.BigFox');
goog.require('bigfox.core.crypt.CryptManager');
goog.require('bigfox.core.util.BFCompressUtil');

goog.require('bigfox.example.ChatHandler');
goog.require('bigfox.example.CSName');
goog.require('bigfox.example.CSChatMessage');
goog.require('bigfox.example.SCChatMessage');
goog.require('bigfox.example.ChatTags.Tags');

bigfox.example.ChatApp = function () {

}

bigfox.example.ChatApp.run = function () {

    var debugWindow = new goog.debug.FancyWindow('main');
    //var debugWindow = new goog.debug.Console('main');
    debugWindow.setEnabled(true);
    debugWindow.init();

    var bigFox = bigfox.core.BigFox.getInstance();
    //start bigfox
    bigFox.wsUri = "ws://" + bigfox.core.config.Config.ServerInfo.host + ":" + bigfox.core.config.Config.ServerInfo.port + '/' + bigfox.core.config.Config.ServerInfo.channel + '/';

    //todo: register new application class to userMapping
    var chatClasses = {};
    chatClasses[bigfox.example.ChatTags.Tags.CS_NAME] = bigfox.example.CSName;
    chatClasses[bigfox.example.ChatTags.Tags.CS_CHAT] = bigfox.example.CSChatMessage;
    chatClasses[bigfox.example.ChatTags.Tags.SC_CHAT] = bigfox.example.SCChatMessage;
    bigFox.addAppClasses(chatClasses);

    //create Big fox connection
    var connection = new bigfox.core.websocket.BFConnection(true);
    bigfox.example.ChatApp.handler = new bigfox.example.ChatHandler(connection);
    connection.open(bigFox.wsUri);
}
/**
 * Handle this chat app
 * @type {bigfox.example.ChatHandler || undefined}
 */
bigfox.example.ChatApp.handler = undefined;

bigfox.example.ChatApp.sendUserName = function () {
    var name = $('#txtName').val();
    if (goog.string.isEmptyOrWhitespace(name)) return;

    //todo: send user name to server
    var csName = new bigfox.example.CSName(name);
    var connection = bigfox.example.ChatApp.handler.getCurrentConnection();

    connection.sendMessage(csName);

    //hide input user group
    $('#userName').hide();
    $('#chatRegion').show();

}

bigfox.example.ChatApp.sendChatMessage = function (e) {

    var msg = $('#txtMessage').val();
    if (goog.string.isEmptyOrWhitespace(msg)) return;
    var csChat = new bigfox.example.CSChatMessage(msg);
    var connection = bigfox.example.ChatApp.handler.getCurrentConnection();

    connection.sendMessage(csChat);
    $('#txtMessage').val("")
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('ChatApp.run', bigfox.example.ChatApp.run);
goog.exportSymbol('ChatApp.sendUserName', bigfox.example.ChatApp.sendUserName);
goog.exportSymbol('ChatApp.sendChatMessage', bigfox.example.ChatApp.sendChatMessage);

