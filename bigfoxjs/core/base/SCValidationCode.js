/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.SCValidationCode');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.base.CSClientInfo');

goog.require('bigfox.core.ConnectionManager');

bigfox.core.base.SCValidationCode = function (tag, name, isCore) {
    bigfox.core.base.SCValidationCode.base(this, 'constructor');

    this.isCore = true;
    this.tag = SC_VALIDATION_CODE;
    this.name = 'SCValidationCode';
}
goog.inherits(bigfox.core.base.SCValidationCode, bigfox.core.base.MessageIn);


bigfox.core.base.SCValidationCode.prototype.getValidationCode = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.INT);
    return this[propertyPrefix + 'validationCode'];
}

/**
 *
 * @param {!number} value
 */
bigfox.core.base.SCValidationCode.prototype.setValidationCode = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.INT);
    this[propertyPrefix + 'validationCode'] = value;
}
/**
 * Execute logic here after client received this message
 * @param {goog.net.WebSocket} socket
 */
bigfox.core.base.SCValidationCode.prototype.execute = function (socket) {

    var connectionManager = bigfox.core.ConnectionManager.getInstance();
    connectionManager.validationCode = this.getValidationCode();

    //todo: implement business logic here

}


