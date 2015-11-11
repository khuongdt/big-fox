/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.CSClientInfo');

goog.require('goog.log');
goog.require('goog.crypt');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.entity.ClientInfo');
goog.require('bigfox.core.ConnectionManager');
goog.require('bigfox.core.util.BFUtil');


bigfox.core.base.CSClientInfo = function () {

    bigfox.core.base.CSClientInfo.base(this, 'constructor',CS_CLIENT_INFO, 'CS_CLIENT_INFO', true);
    
    this.tag = CS_CLIENT_INFO;
    this.name = 'CS_CLIENT_INFO';
    this.status = 1;
    this.isCore = true;

    var connectionManager = bigfox.core.ConnectionManager.getInstance();

    var _clientInfo = new bigfox.core.entity.ClientInfo();
    _clientInfo.setDevice(bigfox.core.entity.ClientInfo.DEVICE_WEB);
    _clientInfo.setZone('BigFoxServerChatExample');
    _clientInfo.setIMEI("");
    _clientInfo.setSessionId(connectionManager.getSessionId());
    _clientInfo.setVersion(1);
    _clientInfo.setMetadata("Metadata");

    this.setClientInfo(_clientInfo);

    //this._bfUtil = bigfox.core.util.BFUtil.getInstance();
}

goog.inherits(bigfox.core.base.CSClientInfo, bigfox.core.base.MessageOut);

/**
 * @type {bigfox.core.entity.ClientInfo || null || undefined}
 * @private
 */
//bigfox.core.base.CSClientInfo.prototype._clientInfo = undefined;

bigfox.core.base.CSClientInfo.prototype._bfUtil = bigfox.core.util.BFUtil.getInstance();

bigfox.core.base.CSClientInfo.prototype.setClientInfo = function (clientInfo) {
    var propertyPrefix = this._bfUtil.getPropertyPrefix(bigfox.core.util.BFUtil.OBJECT);
    if (clientInfo instanceof  bigfox.core.entity.ClientInfo) {
        this[propertyPrefix + 'clientInfo'] = clientInfo;
    }
}

bigfox.core.base.CSClientInfo.prototype.getClientInfo = function () {
    var propertyPrefix = this._bfUtil.getPropertyPrefix(bigfox.core.util.BFUtil.OBJECT);
    return this[propertyPrefix + 'clientInfo'];
}

bigfox.core.base.CSClientInfo.prototype.send = function (socket) {

}