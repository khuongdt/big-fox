/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.SCInitSession');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.MessageIn');

bigfox.core.base.SCInitSession = function(tag, name, isCore){
    bigfox.core.base.SCInitSession.base(this,'constructor');

    this.isCore = true;
    this.tag = SC_INIT_SESSION;
    this.name = 'SC_INIT_SESSION';
    this.status = 1;
}

goog.inherits(bigfox.core.base.SCInitSession, bigfox.core.base.MessageIn);

bigfox.core.base.SCInitSession.prototype.getSessionStatus = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.INT);
    return this[propertyPrefix + 'sessionStatus'];
}

bigfox.core.base.SCInitSession.prototype.setSessionStatus = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.INT);
    this[propertyPrefix + 'sessionStatus'] = value;
}