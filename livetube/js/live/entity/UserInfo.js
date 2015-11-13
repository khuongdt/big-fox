/**
 * Created by khuongdt on 11/13/2015.
 */

goog.provide('com.onesoft.livetube.entity.UserInfo');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.BaseMessage');
goog.require('com.onesoft.livetube.base.LiveTag');
goog.require('com.onesoft.livetube.base.ClientTag');

com.onesoft.livetube.entity.UserInfo = function () {
    com.onesoft.livetube.entity.UserInfo.base(this, 'constructor', com.onesoft.livetube.base.ClientTag.USER_INFO, 'USER_INFO', false);
}
goog.inherits(com.onesoft.livetube.entity.UserInfo, bigfox.core.base.BaseMessage);

//id
com.onesoft.livetube.entity.UserInfo.prototype.setId = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'id'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getId = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'id'];
}

//photoId
com.onesoft.livetube.entity.UserInfo.prototype.setPhotoId = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'photoId'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getPhotoId = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'photoId'];
}

//fullname
com.onesoft.livetube.entity.UserInfo.prototype.setFullName = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'fullname'] = value;
}


com.onesoft.livetube.entity.UserInfo.prototype.getFullName = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'fullname'];
}

//photoUrl
com.onesoft.livetube.entity.UserInfo.prototype.setPhotoUrl = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'photoUrl'] = value;
}


com.onesoft.livetube.entity.UserInfo.prototype.getPhotoUrl = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'photoUrl'];
}

//birthday
com.onesoft.livetube.entity.UserInfo.prototype.setBirthDay = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.LONG);
    this[propertyPrefix + 'birthday'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getBirthDay = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.LONG);
    return this[propertyPrefix + 'birthday'];
}

//username
com.onesoft.livetube.entity.UserInfo.prototype.setUserName = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'username'] = value;
}


com.onesoft.livetube.entity.UserInfo.prototype.getUserName = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'username'];
}

//accountType
com.onesoft.livetube.entity.UserInfo.prototype.setAccountType = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'accountType'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getAccountType = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'accountType'];
}

//currentTxu
com.onesoft.livetube.entity.UserInfo.prototype.setCurrentTxu = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'currentTxu'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getCurrentTxu = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'currentTxu'];
}

//currentTvang
com.onesoft.livetube.entity.UserInfo.prototype.setCurrentTvang = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'currentTvang'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getCurrentTvang = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'currentTvang'];
}


//totalTxuIn
com.onesoft.livetube.entity.UserInfo.prototype.setTotalTxuIn = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'totalTxuIn'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getTotalTxuIn = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'totalTxuIn'];
}

//totalTxuOut
com.onesoft.livetube.entity.UserInfo.prototype.setTotalTxuOut = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'totalTxuOut'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getTotalTxuOut = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'totalTxuOut'];
}

//totalBalanceIn
com.onesoft.livetube.entity.UserInfo.prototype.setTotalBalanceIn = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.DOUBLE);
    this[propertyPrefix + 'totalBalanceIn'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getTotalBalanceIn = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.DOUBLE);
    return this[propertyPrefix + 'totalBalanceIn'];
}

//totalBalanceTxuIn
com.onesoft.livetube.entity.UserInfo.prototype.setTotalBalanceTxuIn = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'totalBalanceTxuIn'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getTotalBalanceTxuIn = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'totalBalanceTxuIn'];
}

//num_subscribe
com.onesoft.livetube.entity.UserInfo.prototype.setNum_subscribe = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'num_subscribe'] = value;
}

com.onesoft.livetube.entity.UserInfo.prototype.getNum_subscribe = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'num_subscribe'];
}