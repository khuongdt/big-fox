/**
 * Created by khuongdt on 11/12/2015.
 */
goog.provide('bigfox.example.SCChatMessage');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.util.BFUtil');

goog.require('bigfox.example.ChatTags.Tags');

/**
 *
 * @param {string} message
 * @constructor
 */
bigfox.example.SCChatMessage = function (message) {
    bigfox.example.SCChatMessage.base(this, 'constructor', bigfox.example.ChatTags.Tags.SC_CHAT, 'Chat Message', false);
    if (!goog.string.isEmptyOrWhitespace(message)) {
        this.setMessage(message);
    }
}
goog.inherits(bigfox.example.SCChatMessage, bigfox.core.base.MessageOut);


bigfox.example.SCChatMessage.prototype.getMessage = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'msg'];
}

bigfox.example.SCChatMessage.prototype.setMessage = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'msg'] = value;
}