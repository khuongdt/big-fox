/**
 * Created by khuongdt on 11/12/2015.
 */
goog.provide('bigfox.example.CSName');

goog.require('goog.log');

goog.require('bigfox.Global');
goog.require('bigfox.core.DataTypes');

goog.require('bigfox.example.ChatTags.Tags');

/**
 *
 * @param {string} name
 * @constructor
 */
bigfox.example.CSName = function(name){
    bigfox.example.CSName.base(this,'constructor',bigfox.example.ChatTags.Tags.CS_NAME, 'CS_NAME',false);

    this.setName(name);
}
goog.inherits(bigfox.example.CSName, bigfox.core.base.MessageOut);


bigfox.example.CSName.prototype.getName = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'msg'];
}

bigfox.example.CSName.prototype.setName = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'msg'] = value;
}