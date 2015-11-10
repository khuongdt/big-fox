/**
 * Created by khuongdt on 11/10/2015.
 */
goog.provide('bigfox.example.ChatApp');

goog.require('goog.log');
goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.FancyWindow');

goog.require('bigfox.core.BigFox');

bigfox.example.ChatApp = function(){

}

bigfox.example.ChatApp.run=function(){
    var bigFox = BigFox.getInstance();
    //start bigfox
    bigFox.start();

    var debugWindow = new goog.debug.FancyWindow('main');
    //var debugWindow = new goog.debug.Console('main');
    debugWindow.setEnabled(true);
    debugWindow.init();

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('ChatApp.run', bigfox.example.ChatApp.run);