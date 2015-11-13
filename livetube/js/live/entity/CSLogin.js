/**
 * Created by khuongdt on 11/13/2015.
 */

goog.provide('com.onesoft.livetube.entity.CSLogin');

goog.require('bigfox.Global');
goog.require('bigfox.core.base.BaseMessage');
goog.require('com.onesoft.livetube.base.LiveTag');

com.onesoft.livetube.entity.CSLogin = function(phone,password){
    com.onesoft.livetube.entity.CSLogin.base(this,'constructor',com.onesoft.livetube.base.LiveTag.CS_LOGIN, "CS_LOGIN", false );
    if(goog.isDef(phone) && goog.isDef(password)){
        this.setPhone(phone);
        this.setPassword(password);
    }
}
goog.inherits(com.onesoft.livetube.entity.CSLogin, bigfox.core.base.BaseMessage);

com.onesoft.livetube.entity.CSLogin.prototype.getPhone = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'phone'];
}


com.onesoft.livetube.entity.CSLogin.prototype.setPhone = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'phone'] = value;
}

com.onesoft.livetube.entity.CSLogin.prototype.getPassword = function () {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    return this[propertyPrefix + 'password'];
}


com.onesoft.livetube.entity.CSLogin.prototype.setPassword = function (value) {
    var propertyPrefix = bigfox.Global.getPropertyPrefix(bigfox.core.DataTypes.STRING);
    this[propertyPrefix + 'password'] = value;
}

