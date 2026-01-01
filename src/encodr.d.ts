/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017-2025 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

/**
 *  Serialization format types.
 */
type EncodrFormat = "cbor" | "msgpack" | "json"

/**
 *  Binary Large Object (BLOB) type for encoded data.
 *  In Node.js this is `Buffer`, in browsers this is `Uint8Array`.
 *  For JSON format, this becomes `string` as a special case.
 */
type BLOB = Buffer | Uint8Array | string

interface Encodr {
    /**
     *  Serialization format type of this Encodr instance.
     */
    type: EncodrFormat

    /**
     *  Encode a JavaScript value to the serialization format.
     *  For CBOR and MsgPack formats, returns a binary blob (Buffer/Uint8Array).
     *  For JSON format, returns a UTF-16 encoded string.
     *  @param data - JavaScript value to encode (any serializable value)
     *  @returns Encoded data as BLOB (Buffer/Uint8Array for binary formats, string for JSON)
     *  @throws Error if encoding fails
     */
    encode(data: any): BLOB

    /**
     *  Decode a JavaScript value from the serialization format.
     *  @param data - Encoded data to decode (Buffer/Uint8Array for binary formats, string for JSON)
     *  @returns Decoded JavaScript value
     *  @throws Error if decoding fails
     */
    decode(data: BLOB): any
}

interface EncodrConstructor {
    /**
     *  Create a new Encodr instance with default CBOR format.
     */
    new(): Encodr

    /**
     *  Create a new Encodr instance for a particular encoding format.
     *  @param format - Serialization format: "cbor" (default), "msgpack", or "json"
     *  @throws Error if an invalid format is specified
     */
    new(format: EncodrFormat): Encodr
}

declare const Encodr: EncodrConstructor
export = Encodr

