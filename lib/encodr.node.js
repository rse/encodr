"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _cbor = require("cbor");

var _cbor2 = _interopRequireDefault(_cbor);

var _msgpackLite = require("msgpack-lite");

var _msgpackLite2 = _interopRequireDefault(_msgpackLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  the encoder/decoder abstraction  */
/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017-2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external dependencies  */
const codec = {
    /*  CBOR [RFC7049](https://tools.ietf.org/html/rfc7049)  */
    cbor: {
        encode(data) {
            try {
                data = _cbor2.default.encode(data);
            } catch (ex) {
                throw new Error("failed to encode CBOR format");
            }
            if (!ArrayBuffer.isView(data) && process.browser) data = new Uint8Array(data);
            return data;
        },
        decode(data) {
            if (ArrayBuffer.isView(data) && process.browser) data = data.buffer;
            try {
                data = _cbor2.default.decode(data);
            } catch (ex) {
                throw new Error("failed to decode CBOR format");
            }
            return data;
        }
    },

    /*  MsgPack [MsgPack.org](https://github.com/msgpack/msgpack/blob/master/spec.md)  */
    msgpack: {
        encode(data) {
            try {
                data = _msgpackLite2.default.encode(data);
            } catch (ex) {
                throw new Error("failed to encode MsgPack format");
            }
            return data;
        },
        decode(data) {
            try {
                data = _msgpackLite2.default.decode(data);
            } catch (ex) {
                throw new Error("failed to decode MsgPack format");
            }
            return data;
        }
    },

    /*  JSON [RFC4627](https://tools.ietf.org/html/rfc4627)  */
    json: {
        encode(data) {
            try {
                data = (0, _stringify2.default)(data);
            } catch (ex) {
                throw new Error("failed to encode JSON format");
            }
            return data;
        },
        decode(data) {
            try {
                data = JSON.parse(data);
            } catch (ex) {
                throw new Error("failed to decode JSON format");
            }
            return data;
        }
    }

    /*  the API class  */
};class Encodr {
    constructor(type = "cbor") {
        if (codec[type] === undefined) throw new Error("invalid coded");
        this.type = type;
    }
    encode(data) {
        return codec[this.type].encode(data);
    }
    decode(data) {
        return codec[this.type].decode(data);
    }
}

/*  export the API class  */
module.exports = Encodr;
