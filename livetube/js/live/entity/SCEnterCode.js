/**
 * Created by khuongdt on 11/13/2015.
 * Author : khuongdt
 * Copyright @ 2015 by OneSoft.,JSC
 */

goog.provide('com.onesoft.livetube.entity.SCEnterCode');
goog.provide('com.onesoft.livetube.entity.CSEnterCode');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.BaseMessage');
goog.require('com.onesoft.livetube.base.LiveTag');

com.onesoft.livetube.entity.SCEnterCode = function (responseCode) {
    com.onesoft.livetube.entity.SCEnterCode.base(this, 'constructor', com.onesoft.livetube.base.LiveTag.SC_ENTER_CODE, 'SC_ENTER_CODE');
    if (goog.isDefAndNotNull(responseCode)) {
        this.setResponseCode(responseCode);
    }
}
goog.inherits(com.onesoft.livetube.entity.SCEnterCode, bigfox.core.base.BaseMessage);

//responseCode
com.onesoft.livetube.entity.SCEnterCode.prototype.getResponseCode = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    return this[propertyPrefix + 'responseCode'];
}


com.onesoft.livetube.entity.SCEnterCode.prototype.setResponseCode = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.INT);
    this[propertyPrefix + 'responseCode'] = value;
}

/**
 * @constructor
 */
com.onesoft.livetube.entity.CSEnterCode = function () {
    com.onesoft.livetube.entity.CSEnterCode.base(this, 'constructor', com.onesoft.livetube.base.LiveTag.CS_ENTER_CODE, 'CS_ENTER_CODE');
}
goog.inherits(com.onesoft.livetube.entity.CSEnterCode, bigfox.core.base.BaseMessage);

com.onesoft.livetube.entity.CSEnterCode.prototype.getPhone = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'phone'];
}


com.onesoft.livetube.entity.CSEnterCode.prototype.setPhone = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'phone'] = value;
}

com.onesoft.livetube.entity.CSEnterCode.prototype.getCode = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'code'];
}


com.onesoft.livetube.entity.CSEnterCode.prototype.setCode = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'code'] = value;
}
