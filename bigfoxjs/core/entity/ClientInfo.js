/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.entity.ClientInfo');

goog.require('goog.log');
goog.require('goog.crypt');
goog.require('bigfox.Global');


bigfox.core.entity.ClientInfo = function () {

}

bigfox.core.entity.ClientInfo.DEVICE_IOS = "ios";
bigfox.core.entity.ClientInfo.DEVICE_ANDROID = "android";
bigfox.core.entity.ClientInfo.DEVICE_WP = "wp";
bigfox.core.entity.ClientInfo.DEVICE_WEB = "web";
bigfox.core.entity.ClientInfo.DEVICE_DESKTOP = "desktop";


bigfox.core.entity.ClientInfo.prototype.getDevice = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'device'];
}

bigfox.core.entity.ClientInfo.prototype.setDevice = function (device) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'device'] = device;
}


bigfox.core.entity.ClientInfo.prototype.getIMEI = function () {
    var propertyPrefix = this._bfUtil.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'imei'];
}

bigfox.core.entity.ClientInfo.prototype.setIMEI = function (imei) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'imei'] = imei;
}

bigfox.core.entity.ClientInfo.prototype.getVersion = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'version'];
}

bigfox.core.entity.ClientInfo.prototype.setVersion = function (version) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'version'] = version;
}

bigfox.core.entity.ClientInfo.prototype.getSessionId = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'sessionId'];
}

bigfox.core.entity.ClientInfo.prototype.setSessionId = function (sessionId) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'sessionId'] = sessionId;
}

bigfox.core.entity.ClientInfo.prototype.getMetadata = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'metadata'];
}

bigfox.core.entity.ClientInfo.prototype.setMetadata = function (metadata) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'metadata'] = metadata;
}

bigfox.core.entity.ClientInfo.prototype.getZone = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'zone'];
}

bigfox.core.entity.ClientInfo.prototype.setZone = function (zone) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'zone'] = zone;
}

//@Property(name = "device")
//public String device; // ios, android, wp
//@Property(name = "imei")
//public String imei;
//@Property(name = "version")
//public int version;
//@Property(name = "sessionId")
//public String sessionId = ""; //String duy nhất đinh danh session, lưu dynamic trên Ram, không lưu ổ cưng
//@Property(name = "metadata")
//public String metadata = "";
//@Property(name = "zone")
//public String zone = "";