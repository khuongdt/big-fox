/**
 * Created by khuongdt on 11/10/2015.
 */
goog.provide('bigfox.core.BigFox');

goog.require('goog.log');
goog.require('goog.array');
goog.require('goog.json');


goog.require('bigfox.core.ConnectionManager');

bigfox.core.BigFox = function () {

}
goog.addSingletonGetter(bigfox.core.BigFox);

bigfox.core.BigFox.prototype.start = function () {
    this.connectionManager = bigfox.core.ConnectionManager.getInstance();
}


bigfox.core.BigFox.prototype.connectionManager = undefined;

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('BigFox', bigfox.core.BigFox);
goog.exportSymbol('BigFox.prototype.start', bigfox.core.BigFox.prototype.start);