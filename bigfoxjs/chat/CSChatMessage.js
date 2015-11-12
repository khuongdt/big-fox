/**
 * Created by khuongdt on 11/12/2015.
 */
goog.provide('bigfox.example.CSChatMessage');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.util.BFUtil');

goog.require('bigfox.example.ChatTags.Tags');

/**
 *
 * @param {string} message
 * @constructor
 */
bigfox.example.CSChatMessage = function (message) {
    bigfox.example.CSChatMessage.base(this, 'constructor', bigfox.example.ChatTags.Tags.CS_CHAT, 'Chat Message', false);
    if (!goog.string.isEmptyOrWhitespace(message)) {
        this.setMessage(message);
    }
}
goog.inherits(bigfox.example.CSChatMessage, bigfox.core.base.MessageOut);


bigfox.example.CSChatMessage.prototype.getMessage = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.STRING);
    return this[propertyPrefix + 'msg'];
}

bigfox.example.CSChatMessage.prototype.setMessage = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.util.BFUtil.STRING);
    this[propertyPrefix + 'msg'] = value;
}