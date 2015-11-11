/**
 * Created by khuongdt on 11/10/2015.
 */
goog.provide('bigfox.example.ChatApp');

goog.require('goog.log');
goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.FancyWindow');

goog.require('bigfox.core.ConnectionManager');

goog.require('bigfox.core.base.CSClientInfo');
goog.require('bigfox.core.base.CSPing');
goog.require('bigfox.core.BigFox');
goog.require('bigfox.core.crypt.CryptManager');
goog.require('bigfox.core.util.BFCompressUtil');

bigfox.example.ChatApp = function(){

}

bigfox.example.ChatApp.run=function(){
    var bigFox = BigFox.getInstance();
    //start bigfox
    bigFox.start();

    var debugWindow = new goog.debug.FancyWindow('main');
    //var debugWindow = new goog.debug.Console('main');
    debugWindow.setEnabled(true);
    debugWindow.init();

}

bigfox.example.ChatApp.SendClientInfo =function(){
    var connectionManager = bigfox.core.ConnectionManager.getInstance();

    /**  @type {bigfox.core.base.CSClientInfo} */
    var csClientInfo = new bigfox.core.base.CSClientInfo();
    csClientInfo.mSequence = connectionManager.curMSequence++;

    var buffer =csClientInfo.toByteArray();
    //send csClientInfo to Server
    buffer = new Int8Array(buffer);

    //encrypt message data to send
    buffer = bigfox.core.crypt.CryptManager.encrypt(connectionManager.validationCode, buffer);
    //compress message
    buffer = bigfox.core.util.BFCompressUtil.compress(buffer, 24);

    connectionManager.getConnection().send(buffer);

}

bigfox.example.ChatApp.sendPing= function(){
    var connectionManager = bigfox.core.ConnectionManager.getInstance();

    var ping = new bigfox.core.base.CSPing();
    ping.mSequence = connectionManager.curMSequence++;

    var buffer =ping.toByteArray();
    //send csClientInfo to Server
    buffer = new Int8Array(buffer);

    //encrypt message data to send
    buffer = bigfox.core.crypt.CryptManager.encrypt(connectionManager.validationCode, buffer);
    //compress message
    buffer = bigfox.core.util.BFCompressUtil.compress(buffer, 24);

    connectionManager.getConnection().send(buffer);

}
//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('ChatApp.run', bigfox.example.ChatApp.run);
goog.exportSymbol('ChatApp.SendClientInfo', bigfox.example.ChatApp.SendClientInfo);
goog.exportSymbol('ChatApp.sendPing', bigfox.example.ChatApp.sendPing);