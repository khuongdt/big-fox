/**
 * Created by khuongdt on 11/11/2015.
 */

goog.provide('bigfox.core.base.SCPing');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.DataTypes');

bigfox.core.base.SCPing = function(){
    bigfox.core.base.SCPing.base(this,'constructor');

}
goog.inherits(bigfox.core.base.SCPing,bigfox.core.base.MessageIn);

bigfox.core.base.SCPing.prototype.getServerTime = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.LONG);
    return this[propertyPrefix + 'serverTime'];
}


bigfox.core.base.SCPing.prototype.setServerTime = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.LONG);
    this[propertyPrefix + 'serverTime'] = value;
}