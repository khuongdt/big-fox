/**
 * Created by khuongdt on 11/10/2015.
 */


goog.provide('bigfox.core.base.SCValidationCode');

goog.require('goog.log');

goog.require('bigfox.core.base.MessageIn');
goog.require('bigfox.core.base.MessageOut');
goog.require('bigfox.core.base.CSClientInfo');

bigfox.core.base.SCValidationCode = function (tag, name, isCore) {
    bigfox.core.base.SCValidationCode.base(this, 'constructor');

    this.isCore = true;
    this.tag = SC_VALIDATION_CODE;
    this.name = 'SCValidationCode';
}
goog.inherits(bigfox.core.base.SCValidationCode, bigfox.core.base.MessageIn);

/**
 * Execute logic here after client received this message
 * @param {goog.net.WebSocket} socket
 */
bigfox.core.base.SCValidationCode.prototype.execute = function (socket) {
    if (!socket.isOpen()) {
        throw new Error('Cannot send without an open socket')
    } else {
        var csClientInfo = new bigfox.core.base.CSClientInfo();

        console.log( "is MessageOut: ", csClientInfo )

        var buffer =csClientInfo.toByteArray();
        //send csClientInfo to Server
        socket.send(buffer);
    }

}


