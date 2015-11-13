/**
 * Created by khuongdt on 11/13/2015.
 * Author : khuongdt
 * Copyright @ 2015 by OneSoft.,JSC
 */
goog.provide('com.onesoft.livetube.entity.CSEnterPass');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.BaseMessage');
goog.require('com.onesoft.livetube.base.LiveTag');

com.onesoft.livetube.entity.CSEnterPass = function(){
    com.onesoft.livetube.entity.CSEnterPass.base(this,'constructor',com.onesoft.livetube.base.LiveTag.CS_ENTER_PASS, "CS_ENTER_PASS", false );
}
goog.inherits(com.onesoft.livetube.entity.CSEnterPass, bigfox.core.base.BaseMessage);

com.onesoft.livetube.entity.CSEnterPass.prototype.getPhone = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'phone'];
}


com.onesoft.livetube.entity.CSEnterPass.prototype.setPhone = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'phone'] = value;
}

com.onesoft.livetube.entity.CSEnterPass.prototype.getPassword = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'password'];
}


com.onesoft.livetube.entity.CSEnterPass.prototype.setPassword = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'password'] = value;
}

com.onesoft.livetube.entity.CSEnterPass.prototype.getCode = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'code'];
}


com.onesoft.livetube.entity.CSEnterPass.prototype.setCode = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'code'] = value;
}