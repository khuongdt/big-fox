/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.core.util.BFUtil');

goog.require('goog.log');
goog.require('goog.json');

goog.require('bigfox.core.base.BaseMessage');


/**
 * @const
 */
var PrefixMapping = {
    "0x00": 0,  //NULL
    '0x01': 1,  // INT
    '0x02': 2,  //SHORT
    '0x03': 3,  //BYTE
    '0x04': 4,  //LONG
    '0x05': 5,  //FLOAT
    '0x06': 6,  //DOUBLE
    '0x07': 7,  //BOOLEAN
    '0x08': 8,  //CHAR
    '0x09': 9,  //STRING
    '0x0a': 10, //OBJECT
    '0x0b': 11, //ARRAY_INT
    '0x0c': 12,
    '0x0d': 13,
    '0x0e': 14,
    '0x0f': 15,
    '0x10': 16,
    '0x11': 17,
    '0x12': 18,
    '0x13': 19,
    '0x14': 20
}

bigfox.core.util.BFUtil = function () {

};
goog.addSingletonGetter(bigfox.core.util.BFUtil);

/**
 * @const
 */
bigfox.core.util.BFUtil.NULL = 0;
bigfox.core.util.BFUtil.NOT_NULL = 1;
bigfox.core.util.BFUtil.INT = 1;
bigfox.core.util.BFUtil.SHORT = 2;
bigfox.core.util.BFUtil.BYTE = 3;
bigfox.core.util.BFUtil.LONG = 4;
bigfox.core.util.BFUtil.FLOAT = 5;
bigfox.core.util.BFUtil.DOUBLE = 6;
bigfox.core.util.BFUtil.BOOLEAN = 7;
bigfox.core.util.BFUtil.CHAR = 8;
bigfox.core.util.BFUtil.STRING = 9;
bigfox.core.util.BFUtil.OBJECT = 10;
bigfox.core.util.BFUtil.ARRAY_INT = 11;
bigfox.core.util.BFUtil.ARRAY_SHORT = 12;
bigfox.core.util.BFUtil.ARRAY_BYTE = 13;
bigfox.core.util.BFUtil.ARRAY_LONG = 14;
bigfox.core.util.BFUtil.ARRAY_FLOAT = 15;
bigfox.core.util.BFUtil.ARRAY_DOUBLE = 16;
bigfox.core.util.BFUtil.ARRAY_BOOLEAN = 17;
bigfox.core.util.BFUtil.ARRAY_CHAR = 18;
bigfox.core.util.BFUtil.ARRAY_STRING = 19;
bigfox.core.util.BFUtil.ARRAY_OBJECT = 20;

bigfox.core.util.BFUtil.prototype.readHeader = function (data, opt_appendObject) {
    var header = opt_appendObject || {};
    //read header only
    header.length = data.getUint32(0);
    header.tag = data.getUint32(4);
    header.mSequence = data.getUint32(8);
    header.sSequence = data.getInt32(12);
    header.status = data.getInt32(16);
    header.checkSum = data.getInt32(20);
    return header;
}


/**
 *  Using property prefix to the property type
 * @param data
 * @param [opt_appendObject]
 * @param [opt_offset]
 * @returns { BaseMessage | {}}
 */
bigfox.core.util.BFUtil.prototype.readContentData = function (data, opt_offset, opt_appendObject) {

    var content = opt_appendObject || {};
    var offset = opt_offset || 24;
    var fieldLength = data.getUint8(24); //number of property
    offset += 1;
    for (var i = 0; i < fieldLength; i++) {

        //read property name
        var res = this.readString(data, offset);
        var propertyName = res.value;
        var propertyPrefix = "";

        offset = res.byteOffset;

        //read property type
        var proType = data.getUint8(offset++);//type of property

        var val;
        //read property value
        switch (proType) {
            case  this.constructor.NULL:
                val = data.getInt8(offset++);
                break;
            case  bigfox.core.util.BFUtil.INT:
                val = data.getInt32(offset);
                offset += 4; //default int 4 bytes
                break;
            case bigfox.core.util.BFUtil.SHORT:
                val = data.getInt16(offset);
                offset += 2; //default short 2 bytes
                break;
            case  bigfox.core.util.BFUtil.BYTE :
                val = data.getInt8(offset++);
                break;
            case bigfox.core.util.BFUtil.LONG :
                // in JS don't have type Long
                val = data.getFloat64(offset);
                offset += 8;
                break;
            case bigfox.core.util.BFUtil.FLOAT :
                val = data.getFloat32(offset);
                offset += 4;
                break;
            case bigfox.core.util.BFUtil.DOUBLE :
                val = data.getFloat64(offset);
                offset += 8;
                break;
            case bigfox.core.util.BFUtil.BOOLEAN :
                val = data.getInt8(offset++);
                break;
            case bigfox.core.util.BFUtil.CHAR :
                val = data.getInt16(offset++);
                offset += 2;
                break;
            case  bigfox.core.util.BFUtil.STRING:
                var res = this.readString(data, offset);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.OBJECT :
                var res = this.readContentData(data, offset);
                val = res.value;
                offset = res.byteOffset;
                break;

            //Read array
            case bigfox.core.util.BFUtil.ARRAY_INT :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.INT);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_SHORT :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.SHORT);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_BYTE :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.BYTE);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_LONG :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.LONG);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_FLOAT :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.FLOAT);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_DOUBLE :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.DOUBLE);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_BOOLEAN :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.BOOLEAN);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_CHAR :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.CHAR);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_STRING :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.STRING);
                val = res.value;
                offset = res.byteOffset;
                break;
            case bigfox.core.util.BFUtil.ARRAY_OBJECT :
                var res = this.readArray(data, offset, bigfox.core.util.BFUtil.OBJECT);
                val = res.value;
                offset = res.byteOffset;
                break;
            default :
                throw new Error('unknow propert type: ', proType);
                break;
        }
        propertyPrefix = this.getPropertyPrefix(proType);
        content[propertyPrefix + propertyName] = val;
    }
    return {'value': content, 'byteOffset': offset};
}


bigfox.core.util.BFUtil.prototype.readArray = function (data, offset, element_type) {
    "use strict";
    var result = {};
    var arr = [];

    //read  length of array
    var count = data.getInt32(offset);
    offset += 4;

    var fn;
    var fn_increment = 0;
    
    switch (element_type) {
        case bigfox.core.util.BFUtil.INT:
            fn = DataView.prototype.getInt32;
            fn_increment = 4;
            break;
        case bigfox.core.util.BFUtil.SHORT:
            fn = DataView.prototype.getInt16;
            fn_increment = 2;
            break;
        case bigfox.core.util.BFUtil.BYTE:
            fn = DataView.prototype.getInt8;
            fn_increment = 1;
            break;
        case bigfox.core.util.BFUtil.LONG:
            fn = DataView.prototype.getFloat64;
            fn_increment = 8;
            break;
        case bigfox.core.util.BFUtil.FLOAT:
            fn = DataView.prototype.getFloat32;
            fn_increment = 4;
            break;
        case bigfox.core.util.BFUtil.DOUBLE:
            fn = DataView.prototype.getFloat64;
            fn_increment = 8;
            break;
        case bigfox.core.util.BFUtil.BOOLEAN:
            fn = DataView.prototype.getInt8;
            fn_increment = 1;
            break;
        case bigfox.core.util.BFUtil.CHAR:
            fn = DataView.prototype.getInt16;
            fn_increment = 2;
            break;
        case bigfox.core.util.BFUtil.STRING:
            return this.readArrayString(data, offset, count);
            break;

        case bigfox.core.util.BFUtil.OBJECT:
            return this.readArrayObject(data, offset, count);
            break;
        default :
            throw new Error('Unknow element type to read from buffer');
            break;
    }
    //read all elements
    for (var i = 0; i < count; i++) {
        var val = fn.call(data, offset);
        offset += fn_increment;
        arr.push(val);
    }
    result.value = arr;
    result.byteOffset = offset;
    return result;
}

/**
 *
 * @param {DataView} data
 * @returns {BaseMessage}
 */
bigfox.core.util.BFUtil.prototype.readDataToMessage = function (data) {

    var header = this.readHeader(data);

    var proto = coreMapping[header.tag];
    if (!proto) {
        proto = userMapping[header.tag];
    }
    if (proto) {
        var message = new proto();

        message = this.readHeader(data, message);
        message = this.readContentData(data, 24, message);
    } else {
        return {};
    }

    return message.value;

}
/**
 *
 * @param {Number} propertyType
 * @returns {string}
 */
bigfox.core.util.BFUtil.prototype.getPropertyPrefix = function (propertyType) {
    "use strict";
    var proType = propertyType || bigfox.core.util.BFUtil.NULL;
    for (var key in PrefixMapping) {
        if (PrefixMapping[key] == proType) {
            return key;
        }
    }
    return '0x00' //NULL;
}

/**
 * read string from dataview
 * @param data
 * @param byteOffset the index to read string
 * @returns {{value: string, byteOffset: number}}
 */
bigfox.core.util.BFUtil.prototype.readString = function (data, byteOffset) {
    //read 2 bytes to know number of byte to follow
    var nFollow = data.getInt16(byteOffset);
    byteOffset += 2;
    var buffer = [];
    for (var i = 0; i < nFollow; i++) {
        //todo : read byte and convert to character using UTF-8
        var charCode = data.getUint8(byteOffset++);
        buffer.push(charCode);
    }
    //convert array buffer to UTF-8 string
    var str = String.fromCharCode.apply(null, new Uint8Array(buffer));

    //todo: need to return byteOffset changed
    return {'value': str, 'byteOffset': byteOffset};
}
bigfox.core.util.BFUtil.prototype.readArrayString = function (data, opt_offset, opt_count) {
    "use strict";
    var offset = opt_offset || 0;
    var count = opt_count || 0;
    if (count == 0) {
        //read length
        count = data.getInt32(offset);
        offset += 4;
    }

    var result = {};
    var arr = [];
    for (var i = 0; i < count; i++) {
        //get 1st byte to know string is null or not
        var isNotNull = data.getInt8(offset++);
        if (!isNotNull) {
            arr.push(null);
        } else {
            //read string value
            var tmp = this.readString(data, offset);
            arr.push(tmp.value);
            offset = tmp.byteOffset;
        }
    }
    result.value = arr;
    result.byteOffset = offset;
    return result;
}

bigfox.core.util.BFUtil.prototype.readArrayObject = function (data, opt_offset, opt_count) {
    "use strict";
    var offset = opt_offset || 0;

    var count = opt_count || 0;
    if (count == 0) {
        //read length
        count = data.getInt32(offset);
        offset += 4;
    }
    var result = {};
    var arr = [];
    for (var i = 0; i < count; i++) {
        //get 1st byte to know Object is null or not
        var isNull = data.getInt8(offset++);
        if (isNull) {
            arr.push(null);
        } else {
            //read object value
            var tmp = this.readContentData(data, offset);
            arr.push(tmp.value);
            offset = tmp.byteOffset;
        }
    }
    result.value = arr;
    result.byteOffset = offset;
    return result;
}

/**
 *
 * @param {BaseMessage} baseMessage
 * @return {Uint8Array}
 */
bigfox.core.util.BFUtil.prototype.write = function (baseMessage) {
    "use strict";

    var buffer = [];
    //write header
    buffer = this.writeHeaderToByteArray(baseMessage, buffer);
    //write content
    buffer = this.writeContentToByteArray(baseMessage, buffer);
    return new Uint8Array(buffer);
}

bigfox.core.util.BFUtil.prototype.writeHeaderToByteArray = function (baseMessage, opt_outputStream) {
    "use strict";
    var buffer = opt_outputStream || [];

    //length
    buffer = this.writeInt(baseMessage.length, buffer);

    //tag
    buffer = this.writeInt(baseMessage.tag, buffer);

    //mSequence
    buffer = this.writeInt(baseMessage.mSequence, buffer);

    //sSequence
    buffer = this.writeInt(baseMessage.sSequence, buffer);

    //status
    buffer = this.writeInt(baseMessage.status, buffer);

    //checkSum
    buffer = this.writeInt(baseMessage.checkSum, buffer);

    return buffer;
}

bigfox.core.util.BFUtil.prototype.writeContentToByteArray = function (baseMessage, opt_outputStream) {
    var buffer = opt_outputStream || [];

    var count = Object.keys(baseMessage).length;

    //write property length
    buffer = this.writeByte(count - 8, buffer);

    for (var key in baseMessage) {
        var prefix = key.substr(0, 4);
        var propertyName = key.substr(4);
        var val = baseMessage[key];      
        

        if (PrefixMapping[prefix]) {
            //write property name
            buffer = this.writeString(propertyName, buffer);
            //write property type
            buffer = this.writeByte(PrefixMapping[prefix], buffer);

            //write property value
            switch (PrefixMapping[prefix]) {
                case bigfox.core.util.BFUtil.NULL:
                    buffer = this.writeInt(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.NOT_NULL:
                    buffer = this.writeInt(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.INT:
                    buffer = this.writeInt(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.SHORT:
                    buffer = this.writeShort(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.BYTE:
                    buffer = this.writeByte(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.LONG:
                    buffer = this.writeLong(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.FLOAT:
                    buffer = this.writeFloat(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.DOUBLE:
                    buffer = this.writeDouble(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.BOOLEAN:
                    buffer = this.writeBoolean(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.CHAR:
                    buffer = this.writeChar(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.STRING:
                    buffer = this.writeString(val, buffer);
                    break;
                case bigfox.core.util.BFUtil.OBJECT:
                    buffer = this.writeContentToByteArray(val, buffer);
                    break;

                //array
                case bigfox.core.util.BFUtil.ARRAY_INT:
                    buffer = this.writeArrayInt(val, buffer);
                    //buffer = this.writeArray(val, bigfox.core.util.BFUtil.INT, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_SHORT:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.SHORT, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_BYTE:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.BYTE, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_LONG:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.LONG, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_FLOAT:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.FLOAT, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_DOUBLE:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.DOUBLE, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_BOOLEAN:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.BOOLEAN, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_CHAR:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.CHAR, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_STRING:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.STRING, buffer);
                    break;
                case bigfox.core.util.BFUtil.ARRAY_OBJECT:
                    buffer = this.writeArray(val, bigfox.core.util.BFUtil.OBJECT, buffer);
                    break;
            }
        }

    }
    return buffer;
}

bigfox.core.util.BFUtil.prototype.writeToUint8Array = function (baseMessage, opt_outputStream) {

    var binaryStream = opt_outputStream || [];

    binaryStream = this.writeHeaderToByteArray(baseMessage, binaryStream);

    binaryStream = this.writeContentToByteArray(baseMessage, binaryStream);

    return binaryStream;
}

/**
 *
 * @private
 * @param {number} number
 * @param {Array<byte>} [opt_buffer]
 * @returns {*|Array}
 */
bigfox.core.util.BFUtil.prototype.writeInt = function (number, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    var val = number || 0;
    buffer.push(val >> 24 & 0xff);  //first byre
    buffer.push(val >> 16 * 0xff);   //second byte
    buffer.push(val >> 8 & 0xff);   //3rd byte
    buffer.push(val & 0xff);   //4th byte
    return buffer;
}

bigfox.core.util.BFUtil.prototype.writeShort = function (number, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    buffer.push(number >> 8 & 0xff);
    buffer.push(number & 0xff);
    return buffer;
}
bigfox.core.util.BFUtil.prototype.writeByte = function (number, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    buffer.push(number & 0xff);
    return buffer;
}
/**
 * Write Long number ( 8 bytes)
 * @param {number} number
 * @param {Array.<byte> } [opt_buffer]
 * @returns {*|Array}
 */
bigfox.core.util.BFUtil.prototype.writeLong = function (number, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    buffer = this.writeInt(number >> 32, buffer);
    buffer = this.writeInt(number, buffer);
    return buffer;
}
bigfox.core.util.BFUtil.prototype.writeDouble = function (number, opt_buffer) {
    "use strict";
    return this.writeLong(number, opt_buffer);
}

bigfox.core.util.BFUtil.prototype.writeFloat = function (number, opt_buffer) {
    "use strict";
    return this.writeInt(number, opt_buffer);
}
bigfox.core.util.BFUtil.prototype.writeBoolean = function (bool, opt_buffer) {
    "use strict";
    return this.writeByte(bool, opt_buffer);
}
bigfox.core.util.BFUtil.prototype.writeChar = function (char, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    buffer.push(char.charCodeAt(0) & 0xff);
    return buffer;
}
bigfox.core.util.BFUtil.prototype.writeString = function (str, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    var strBuffer = this.stringToUtf8ByteArray(str);
    //adds 2 bytes buffer length
    buffer = this.writeShort(strBuffer.length, buffer);
    buffer = buffer.concat(strBuffer);
    return buffer;
}

bigfox.core.util.BFUtil.prototype.writeArrayInt = function (arr, opt_buffer) {
    "use strict";
    var buffer = opt_buffer || [];
    if (Array.isArray(arr)) {
        //write number of element in this array
        buffer = this.writeInt(arr.length);
    }
    var self = this;
    arr.forEach(function (el) {
        buffer = self.writeInt(el, buffer);
    });
    return buffer;
}

bigfox.core.util.BFUtil.prototype.writeArray = function (arr, element_type, opt_buffer) {
    "use strict";
    if (!element_type) return opt_buffer;
    var buffer = opt_buffer || [];
    if (Array.isArray(arr)) {
        //write number of element in this array
        buffer = this.writeInt(arr.length);
    } else {
        throw new Error('invalide arguments');
    }
    var fn;
    var BFUtil =bigfox.core.util.BFUtil;
    switch (element_type) {

        case BFUtil.NULL:
            fn = this.writeInt;
            break;
        case BFUtil.NOT_NULL:
            fn = this.writeInt;
            break;
        case BFUtil.INT:
            fn = this.writeInt;
            break;
        case BFUtil.SHORT:
            fn = this.writeShort;
            break;
        case BFUtil.BYTE:
            fn = this.writeByte;
            break;
        case BFUtil.LONG:
            fn = this.writeLong;
            break;
        case BFUtil.FLOAT:
            fn = this.writeFloat;
            break;
        case BFUtil.DOUBLE:
            fn = this.writeDouble;
            break;
        case BFUtil.BOOLEAN:
            fn = this.writeBoolean;
            break;
        case BFUtil.CHAR:
            fn = this.writeChar;
            break;
        case BFUtil.STRING:
            var self = this;
            arr.forEach(function (el) {
                if (!el || el == null || el == 'undefined') {
                    buffer = self.writeByte(BFUtil.NULL, buffer);
                } else {
                    buffer = self.writeByte(BFUtil.NOT_NULL, buffer);
                    buffer = self.writeString(el, buffer)
                }
            });
            return buffer;
            break;
        case BFUtil.OBJECT:
            var self = this;
            arr.forEach(function (el) {
                if (el == null || el == 'undefined') {
                    buffer = self.writeByte(BFUtil.NULL, buffer);
                } else {
                    buffer = self.writeByte(BFUtil.NOT_NULL, buffer);
                    buffer = self.writeContentToByteArray(el, buffer)
                }
            });
            return buffer;
            break;
    }
    if (!fn) {
        throw new Error('Property type not found!');
    }
    arr.forEach(function (el) {
        buffer = fn(el, buffer);
    });
    return buffer;
}