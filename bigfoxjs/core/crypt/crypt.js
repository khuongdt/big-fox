/**
 * Created by khuongdt on 11/11/2015.
 */

goog.provide('bigfox.core.crypt.CryptManager');

goog.require('goog.log');
goog.require('goog.crypt');


bigfox.core.crypt.CryptManager = function () {

}
goog.addSingletonGetter(bigfox.core.crypt.CryptManager);


bigfox.core.crypt.CryptManager.encrypt = function (cryptKey, data) {
    var validationCode = cryptKey || 0;
    for (var i = 24; i < data.length; i++) {
        var val = data[i] & 0xff;
        data[i] = (val ^ validationCode) & 0xff;
    }
    return data;
}


/**
 * decrypt byte array using XOR and return an DataView
 * @param cryptKey
 * @param data
 * @param opt_byteOffset
 * @returns {DataView}
 */
bigfox.core.crypt.CryptManager.decryptByteArray = function (cryptKey, data, opt_byteOffset) {
    if(!data && goog.isArray(data)){
        throw new Error("invalid array input");
    }
    var byteOffset = opt_byteOffset || 24;//default skip 24bytes header
    var buffer = new ArrayBuffer(data.length);
    var dataView = new DataView(buffer);

    data.forEach(function (el, index) {
        if(index < byteOffset) {
            dataView.setUint8(index, el);
        }else{
            dataView.setUint8(index, el ^ cryptKey);
        }
    });
    return dataView;
}