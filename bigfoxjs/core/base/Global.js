/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.Global');
goog.provide('bigfox.core.DataTypes');


/**
 * @const
 */
var CS_PING = 0x000002;
var CS_CLIENT_INFO = 0x000003;

/**
 * @const
 */
var SC_VALIDATION_CODE = 0x110000;
var SC_PING = 0x110002;
var SC_INIT_SESSION = 0x110003;

var coreMapping = {};
var userMapping = {};

bigfox.core.DataTypes = {
    'NULL': 0,
    'NOT_NULL': 1,
    'INT': 1,
    'SHORT': 2,
    'BYTE': 3,
    'LONG': 4,
    'FLOAT': 5,
    'DOUBLE': 6,
    'BOOLEAN': 7,
    'CHAR': 8,
    'STRING': 9,
    'OBJECT': 10,
    'ARRAY_INT': 11,
    'ARRAY_SHORT': 12,
    'ARRAY_BYTE': 13,
    'ARRAY_LONG': 14,
    'ARRAY_FLOAT': 15,
    'ARRAY_DOUBLE': 16,
    'ARRAY_BOOLEAN': 17,
    'ARRAY_CHAR': 18,
    'ARRAY_STRING': 19,
    'ARRAY_OBJECT': 20
}


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
    '0x0c': 12, //ARRAY_SHORT
    '0x0d': 13, //ARRAY_BYTE
    '0x0e': 14, //ARRAY_LONG
    '0x0f': 15, //ARRAY_FLOAT
    '0x10': 16, //ARRAY_DOUBLE
    '0x11': 17, //ARRAY_BOOLEAN
    '0x12': 18, //ARRAY_CHAR
    '0x13': 19, //ARRAY_STRING
    '0x14': 20  //ARRAY_OBJECT
}

bigfox.Global = function(){

}

bigfox.Global.getPropertyPrefix = function (propertyType) {
    "use strict";
    var proType = propertyType || 0x00; //NULL
    for (var key in PrefixMapping) {
        if (PrefixMapping[key] == proType) {
            return key;
        }
    }
    return 0x00; //NULL;
}

