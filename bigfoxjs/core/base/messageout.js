/**
 * Created by khuongdt on 11/10/2015.
 */

"use strict";

goog.provide('bigfox.core.base.MessageOut');

goog.require('goog.log');

goog.require('bigfox.core.base.BaseMessage');
goog.require('bigfox.core.util.BFUtil');


bigfox.core.base.MessageOut = function (tag, name, isCore) {
    bigfox.core.base.MessageOut.base(this, 'constructor',tag, name, isCore);
    this._logger = goog.log.getLogger('bigfox.core.base.MessageOut');
}

goog.inherits(bigfox.core.base.MessageOut, bigfox.core.base.BaseMessage);

/**
 * Convert Message out to byte array
 * @returns {*|Uint8Array}
 * @public
 */
bigfox.core.base.MessageOut.prototype.toByteArray = function(){

    var bfUtil = bigfox.core.util.BFUtil.getInstance();
    var contentBuffer = bfUtil.writeContentToByteArray(this);
    this.length = contentBuffer.length + 24; //24 bytes header
    var headBuffer = bfUtil.writeHeaderToByteArray(this);
    var buffer = headBuffer.concat(contentBuffer);

    return bfUtil.write(buffer);
}

bigfox.core.base.MessageOut.prototype.send = function(socket){
    throw new Error('not implement');
}