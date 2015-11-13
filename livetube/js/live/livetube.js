/**
 * Created by khuongdt on 11/13/2015.
 */

goog.provide('com.onesoft.LiveTube');

goog.require('goog.log');
goog.require('goog.debug.FancyWindow');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.config.Config');
goog.require('bigfox.core.BigFox');
goog.require('bigfox.core.websocket.BFConnection');
goog.require('bigfox.core.websocket.BFConnectionHandler');

goog.require('com.onesoft.livetube.entity.CSLogin');
goog.require('com.onesoft.livetube.entity.SCLogin');
goog.require('com.onesoft.livetube.entity.CSEnterCode');
goog.require('com.onesoft.livetube.entity.SCEnterCode');
goog.require('com.onesoft.livetube.net.SessionHandler');


com.onesoft.LiveTube = function () {

}
com.onesoft.LiveTube.start = function () {

    var debugWindow = new goog.debug.FancyWindow('main');
    //var debugWindow = new goog.debug.Console('main');
    debugWindow.setEnabled(true);
    debugWindow.init();

    var bigFox = bigfox.core.BigFox.getInstance();
    //start bigfox
    bigFox.wsUri = "ws://" + bigfox.core.config.Config.ServerInfo.host + ":" + bigfox.core.config.Config.ServerInfo.port + '/' + bigfox.core.config.Config.ServerInfo.channel + '/';

    //todo: register new application class to userMapping
    var chatClasses = {};
    chatClasses[com.onesoft.livetube.base.LiveTag.CS_LOGIN] = com.onesoft.livetube.entity.CSLogin;
    chatClasses[com.onesoft.livetube.base.LiveTag.SC_LOGIN] = com.onesoft.livetube.entity.SCLogin;
    chatClasses[com.onesoft.livetube.base.LiveTag.CS_ENTER_CODE] = com.onesoft.livetube.entity.CSEnterCode;
    chatClasses[com.onesoft.livetube.base.LiveTag.SC_ENTER_CODE] = com.onesoft.livetube.entity.SCEnterCode;
    bigFox.addAppClasses(chatClasses);

    //create Big fox connection
    var connection = new bigfox.core.websocket.BFConnection(true);
    com.onesoft.LiveTube.sessionHandler = new com.onesoft.livetube.net.SessionHandler(connection);
    connection.open(bigFox.wsUri);
}
com.onesoft.LiveTube.sessionHandler = undefined;

com.onesoft.LiveTube.login = function (userName, password) {

    var csLogin = new com.onesoft.livetube.entity.CSLogin(userName, password);
    if (goog.isDef(csLogin.getPhone()) && goog.isDef(csLogin.getPassword())) {
        com.onesoft.LiveTube.sessionHandler.getCurrentConnection().sendMessage(csLogin);
    }
}


goog.exportSymbol('LiveTube', com.onesoft.LiveTube);
goog.exportSymbol('LiveTube.login', com.onesoft.LiveTube.login);


