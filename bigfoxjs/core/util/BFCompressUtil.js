/**
 * Created by khuongdt on 11/11/2015.
 */

goog.provide('bigfox.core.util.BFCompressUtil');

goog.require('goog.array');
goog.require('bigfox.core.base.BaseMessage');

bigfox.core.util.BFCompressUtil = function () {

}

bigfox.core.util.BFCompressUtil.compress = function (data, opt_byteOffset) {
    var offset = opt_byteOffset || 0;
    var header = [];
    var uncompress = data.slice(offset);
    var compressed = [];
    if (offset > 0) {
        header = data.slice(0, offset);
    }
    // uncompress = Array.<number> or Uint8Array
    var gzip = new Zlib.Gzip(uncompress);
    compressed = gzip.compress();

    /** Uint8Array */
    //outBuffer = outBuffer.concat(compressed);
    var outStream= [];
    //header
    for(var i=0; i < header.length; i++){
        outStream.push(header[i]);
    }
    //compressed content
    for(var i=0; i < compressed.length; i++){
        outStream.push(compressed[i]);
    }

    if (outStream.length < data.length) {
        var length =outStream.length;
        //rewrite length value
        outStream[0] = (length >> 24) & 0x00ff;
        outStream[1] = (length >> 16) & 0x00ff;
        outStream[2] = (length >> 8) & 0x00ff;
        outStream[3] = (length) & 0x00ff;
        //rewrite status
        outStream[19] = outStream[19] | bigfox.core.base.BaseMessage.STATUS_ZIP;
        return outStream;
    }
    return data;
}

bigfox.core.util.BFCompressUtil.decompress = function (compressedData, opt_byteOffset) {
    if ((compressedData[19] & bigfox.core.base.BaseMessage.STATUS_ZIP) != bigfox.core.base.BaseMessage.STATUS_ZIP) {
        return compressedData;
    }
    var offset = opt_byteOffset || 0;
    var header = [];
    var compressed = compressedData.slice(offset);
    if (offset > 0) {
        header = compressedData.slice(0, offset);
    }
    // compressed = Array.<number> or Uint8Array
    var gunzip = new Zlib.Gunzip(compressed);
    var decompress = gunzip.decompress();

    //outBuffer = outBuffer.concat(decompress);
    var outStream=[];
    //header
    for(var i=0; i< header.length; i++){
        outStream.push(header[i]);
    }

    //content
    for(var i=0; i< decompress.length; i++){
        outStream.push(decompress[i]);
    }

    var length = outStream.length;
    //rewrite length value
    outStream[0] = (length >> 24) & 0xff;
    outStream[1] = (length >> 16) & 0xff;
    outStream[2] = (length >> 8) & 0xff;
    outStream[3] = (length) & 0xff;

    return outStream;
}