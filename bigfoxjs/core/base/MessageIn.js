/**
 * Created by khuongdt on 11/10/2015.
 */

"use strict";

goog.provide('bigfox.core.base.MessageIn');

goog.require('goog.log');

goog.require('bigfox.core.base.BaseMessage');


bigfox.core.base.MessageIn = function (tag, name, isCore) {
    bigfox.core.base.MessageIn.base(this, 'constructor',tag, name, isCore);
    this._logger = goog.log.getLogger('bigfox.core.base.MessageIn');
}

goog.inherits(bigfox.core.base.MessageIn, bigfox.core.base.BaseMessage);


/**
 *
 * @param {goog.net.WebSocket} socket
 */
bigfox.core.base.MessageIn.prototype.execute = function(socket){
    throw new Error('not implement');
}