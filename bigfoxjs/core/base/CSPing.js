/**
 * Created by khuongdt on 11/11/2015.
 */

goog.provide('bigfox.core.base.CSPing');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.util.BFUtil');

bigfox.core.base.CSPing = function(){
    bigfox.core.base.CSPing.base(this,'constructor',CS_PING,'CS_PING',true);
    this.status =1;

    this.setClientTime(Date.now());
}
goog.inherits(bigfox.core.base.CSPing,bigfox.core.base.MessageOut);

bigfox.core.base.CSPing.prototype.getClientTime = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.LONG);
    return this[propertyPrefix + 'clientTime'];
}


bigfox.core.base.CSPing.prototype.setClientTime = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.LONG);
    this[propertyPrefix + 'clientTime'] = value;
}