/**
 * Created by khuongdt on 11/13/2015.
 */

goog.provide('com.onesoft.livetube.entity.SCLogin');
goog.provide('com.onesoft.livetube.entity.SCLogin.LoginStatus');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.BaseMessage');
goog.require('com.onesoft.livetube.base.LiveTag');
goog.require('com.onesoft.livetube.entity.UserInfo');

com.onesoft.livetube.entity.SCLogin = function () {
    com.onesoft.livetube.entity.SCLogin.base(this, 'constructor', com.onesoft.livetube.base.LiveTag.SC_LOGIN, "SC_LOGIN", false);
}
goog.inherits(com.onesoft.livetube.entity.SCLogin, bigfox.core.base.BaseMessage);

com.onesoft.livetube.entity.SCLogin.prototype.getResponseCode = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'responseCode'];
}


com.onesoft.livetube.entity.SCLogin.prototype.setResponseCode = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'responseCode'] = value;
}

com.onesoft.livetube.entity.SCLogin.prototype.getUserInfo = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.OBJECT);
    return this[propertyPrefix + 'userInfo'];
}


com.onesoft.livetube.entity.SCLogin.prototype.setUserInfo = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.OBJECT);
    this[propertyPrefix + 'userInfo'] = value;
}


com.onesoft.livetube.entity.SCLogin.LoginStatus = {
    'LOGIN_SUCCESS': 0,
    'LOGIN_UNSUCCESS': -1,
    'LOGIN_UNSUCCESS_BAN': -2,
    'LOGIN_UNSUCCESS_PASSWORD_INVALID': -3,//PASSWORD TOI THIEU 6 KY TU
    'LOGIN_RE': 1
}