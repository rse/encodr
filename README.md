
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
to encode/decode JavaScript values to/from the object serialization formats JavaScript
Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)),
Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049))
and [MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md).

Installation
------------

```shell
$ npm install encodr
```

Usage
-----

```js
const Encodr  = require("encodr")

const JSON    = new Encodr("json")
const CBOR    = new Encodr("cbor")
const MsgPack = new Encodr("msgpack")

let data = {
    foo: "bar",
    baz: 42,
    baz: [ 1.0, "quux", true ],
    quux: {}
}


data = JSON.encode(data)
data = JSON.decode(data)

data = CBOR.encode(data)
data = CBOR.decode(data)

data = MsgPack.encode(data)
data = MsgPack.decode(data)
```

Application Programming Interface
---------------------------------

- `new Encodr(format: string = "json"): API`
  Create a new Encodr instance for a particular serialization
  format. The supported formats are `json`, `cbor` and `msgpack`.

- `API::encode(data: any): BLOB`
  Encode a JavaScript value to the serialization format.

- `API::decode(data: BLOB): any`
  Decode a JavaScript value from the serialization format.

The `BLOB` type depends on the serialization format and the execution environment:

Format |Node.js|Browser
-------|-------|-------
json   |String |String
cbor   |Buffer |Uint8Array
msgpack|Buffer |Uint8Array

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

