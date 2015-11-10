/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.CSClientInfo');

goog.require('goog.log');

goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.entity.ClientInfo');

goog.require('bigfox.core.ConnectionManager');

bigfox.core.base.CSClientInfo = function(tag, name, isCore){
    bigfox.core.base.CSClientInfo.base(this,'constructor');

    this.isCore = true;
    this.tag = CS_CLIENT_INFO;
    this.name = 'CS_CLIENT_INFO';

    var connectionManager = bigfox.core.ConnectionManager.getInstance();

    this._clientInfo = new bigfox.core.entity.ClientInfo();
    this._clientInfo.setDevice(bigfox.core.entity.ClientInfo.DEVICE_WEB);
    this._clientInfo.setZone('BigFoxServerChatExample');
    this._clientInfo.setIMEI("");
    this._clientInfo.setSessionId(connectionManager.getSessionId());

    //this._clientInfo.setVersion(version);
    //this._clientInfo.setMetadata("Metadata");
}

goog.inherits(bigfox.core.base.CSClientInfo, bigfox.core.base.MessageOut);

/**
 * @type {bigfox.core.entity.ClientInfo || null || undefined}
 * @private
 */
bigfox.core.base.CSClientInfo.prototype._clientInfo = undefined;

bigfox.core.base.CSClientInfo.prototype.send = function(socket){

}