/**
 * Created by khuongdt on 11/10/2015.
 */

goog.provide('bigfox.Global');

goog.require('bigfox.core.base.SCValidationCode');

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


//??
coreMapping[SC_VALIDATION_CODE] =   bigfox.core.base.SCValidationCode;

bigfox.Global = function(){

}