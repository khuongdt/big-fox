/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.SCInitSession');

goog.require('goog.log');

goog.require('bigfox.core.base.MessageIn');

bigfox.core.base.SCInitSession = function(tag, name, isCore){
    bigfox.core.base.SCInitSession.base(this,'constructor');

    this.isCore = true;
    this.tag = SC_INIT_SESSION;
    this.name = 'SC_INIT_SESSION';
}

goog.inherits(bigfox.core.base.SCInitSession, bigfox.core.base.MessageIn);