/**
 * Created by khuongdt on 11/10/2015.
 */
goog.provide('bigfox.core.BigFox');

goog.require('goog.log');
goog.require('goog.array');
goog.require('goog.json');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.SCValidationCode');
goog.require('bigfox.core.base.SCInitSession');
goog.require('bigfox.core.base.SCPing');

goog.require('bigfox.core.ConnectionManager');

bigfox.core.BigFox = function () {

    coreMapping[SC_VALIDATION_CODE] =   bigfox.core.base.SCValidationCode;
    coreMapping[SC_INIT_SESSION] =   bigfox.core.base.SCInitSession;
    coreMapping[SC_PING] =   bigfox.core.base.SCPing;

}
goog.addSingletonGetter(bigfox.core.BigFox);

bigfox.core.BigFox.prototype.start = function () {
    this.connectionManager = bigfox.core.ConnectionManager.getInstance();
}


/**
 * @private
 * @type { bigfox.core.ConnectionManager || undefined}
 */
bigfox.core.BigFox.prototype.connectionManager = undefined;

bigfox.core.BigFox.prototype.getConnectionManager = function(){
    return this.connectionManager
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('BigFox', bigfox.core.BigFox);
goog.exportSymbol('BigFox.prototype.start', bigfox.core.BigFox.prototype.start);