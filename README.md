
Encodr
======

Encoding/Decoding to/from JSON/CBOR/MsgPack for Node.js and Browser.

<p/>
<img src="https://nodei.co/npm/encodr.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/encodr.png" alt=""/>

About
-----

This is a small JavaScript abstraction layer for Node.js and the Browser
to encode/decode JavaScript values to/from the binary object serialization formats
MessagePack ([MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md)),
Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049))
and UTF8-encoded JavaScript Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)).
The actual encoding/decoding is performed by underyling libraries. This
package is just a convenient abstraction layer to ensure the correct
library is used and consistent data types are used.

Installation
------------

```shell
$ npm install encodr
```

Usage
-----

```js
const Encodr  = require("encodr")

const MsgPack = new Encodr("msgpack")
const CBOR    = new Encodr("cbor")
const JSON    = new Encodr("json")

let data = {
    foo: "bar",
    baz: 42,
    baz: [ 1.0, "quux", true ],
    quux: {}
}

data = MsgPack.encode(data)
data = MsgPack.decode(data)

data = CBOR.encode(data)
data = CBOR.decode(data)

data = JSON.encode(data)
data = JSON.decode(data)
```

Application Programming Interface
---------------------------------

- `type BLOB = Buffer | Uint8Array`
  The `BLOB` data type depends on the execution environment:
  In Node.js it is `Buffer`, in the Browsers it is `Uint8Array`.

- `new Encodr(format: string = "msgpack"): API`
  Create a new Encodr instance for a particular serialization
  format. The supported formats are `msgpack`, `cbor` and `json`.
  The default is `msgpack`.

- `API::encode(data: any): BLOB`
  Encode a JavaScript value to the serialization format.

- `API::decode(data: BLOB): any`
  Decode a JavaScript value from the serialization format.

Notice: for convenience and application debugging reasons, there is
also the special format named `jsons`. This is plain JSON encoded into
a regular UTF-16 character string (instead of a UTF-8 byte array) and
hence `BLOB` here becomes `String`. It exists for debugging purposes
where one wants to switch the encoding to a human-readable string
representation.

Encoding Formats
----------------

- msgpack: MessagePack ([MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md)):<br/>
  This is a very compact, efficient and battle-tested encoding.

- cbor: Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049)):<br/>
  This is a very compact, efficient and IETF-standardized encoding.

- json: UTF-8-based binary-encoded JavaScript Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)):<br/>
  This is a less compact, less efficient but IETF-standardized and well-known encoding.

- jsons: UTF-16 string-encoded JavaScript Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)):<br/>
  This is a non-compact, non-efficient but IETF-standardized and human-readable encoding.

License
-------

Copyright (c) 2017 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

