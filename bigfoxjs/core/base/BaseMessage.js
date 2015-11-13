/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.core.base.BaseMessage');

goog.require('goog.log');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');


/**
 * @extends {goog.events.EventTarget}
 * @constructor
 */
bigfox.core.base.BaseMessage = function (tag, name, isCore) {
    bigfox.core.base.BaseMessage.base(this, 'constructor');

    this.tag = tag || 0;
    this.name = name || "";
    this.status = 0;

    this._logger = goog.log.getLogger('bigfox.core.base.BaseMessage');
}
goog.inherits(bigfox.core.base.BaseMessage, goog.events.EventTarget);

bigfox.core.base.BaseMessage.prototype.length = 0;
bigfox.core.base.BaseMessage.prototype.tag = 0;
bigfox.core.base.BaseMessage.prototype.status = 0;
bigfox.core.base.BaseMessage.prototype.mSequence = 0;
bigfox.core.base.BaseMessage.prototype.sSequence = 0;
bigfox.core.base.BaseMessage.prototype.checkSum = 0;
bigfox.core.base.BaseMessage.prototype.isCore = false;
bigfox.core.base.BaseMessage.prototype.name = "";


/**
 *
 * @type {number}
 */
bigfox.core.base.BaseMessage.STATUS_CORE = 0x01;
bigfox.core.base.BaseMessage.STATUS_ZIP = 0x02;
bigfox.core.base.BaseMessage.STATUS_CONTINUE = 0x04;

/**
 *
 * @type {goog.log.Logger}
 * @protected
 */
bigfox.core.base.BaseMessage.prototype._logger = goog.log.getLogger('bigfox.core.base.BaseMessage');

