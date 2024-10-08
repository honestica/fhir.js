fhir.js
=======

[![npm version](https://badge.fury.io/js/fhir.js.svg)](https://badge.fury.io/js/fhir.js)

[![Build Status](https://travis-ci.org/FHIR/fhir.js.svg)](https://travis-ci.org/FHIR/fhir.js)

[![Gitter chat](https://badges.gitter.im/FHIR/fhir.js.png)](https://gitter.im/FHIR/fhir.js)


JavaScript client for FHIR

## Goals:

 - Support FHIR CRUD operations
 - Friendly and expressive query syntax
 - Support for access control (HTTP basic, OAuth2, Cookies)
 - ...

## Development

`Node.js` is required for build.

We recommend installing Node.js using [nvm](https://github.com/creationix/nvm/blob/master/README.md#installation)

Build & test:

```
git clone https://github.com/FHIR/fhir.js
cd fhir.js
npm install

# build fhir.js
npm run-script build

# run tests in node
npm run-script test

# run tests in phantomjs
npm run-script integrate
```

## API


### Create instance of the FHIR client

To communicate with concrete FHIR server, you can
create instance of the FHIR client, passing a
configuration object & adapter object.  Adapters must be provided by the
client.

```
var config = {
  // FHIR server base url
  baseUrl: 'http://myfhirserver.com',
  auth: {
     bearer: 'token',
     // OR for basic auth
     user: 'user',
     pass: 'secret'
  },
  // Valid Options are 'same-origin', 'include'
  credentials: 'same-origin',
  headers: {
    'X-Custom-Header': 'Custom Value',
    'X-Another-Custom': 'Another Value',
  }
}

myClient = fhir(config, adapter)
```

#### Config Object
The config object is an object that is passed through the middleware chain. Any values in the config object that are not mutated by middleware will be available to the adapter.

Because middleware mutates the config, it is strongly recommended when implementing an adapter to not directly rely on config passed in.

##### baseUrl
This is the full url to your FHIR server. Resources will be appended to the end of it.

##### auth
This is an object representing your authentication requirements. Possible options include:

###### bearer
This is your Bearer token when provided, it will add an `Authorization: Bearer <token>` header to your requests.

###### user
This is your Basic auth Username.

When you provide both user name and password, basic auth will be used.

###### pass
This is your basic auth password.

When you provide both user name and password, basic auth will be used.

##### credentials
This option controls the behaviour of sending cookies to the remote server. Refer to the table below for how to configure the option for your desired adapter.

##### headers
A key:value object that represents headers. This object is passed through to you configured adapter.

If you choose to add custom headers to your requests, you should ensure that the server that you are talking to supplies the appropriate headers. Further reading on Allowed Headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
```javascript
const config = {
  headers: {
    'X-Custom-Header': 'Custom Value',
    'X-Another-Custom': 'Another Value',
  }
}
```

### Adapter implementation

Currently each adapter must implement an
`http(requestObj)` function:

Structure of requestObj:

* `method` - http method (GET|POST|PUT|DELETE)
* `url` - url for request
* `headers` - object with headers (i.e. {'Category': 'term; scheme="sch"; label="lbl"'}

and return promise (A+)

http(requestObj).then(success, error)

where:
`success` - success callback, which should be called with (data, status, headersFn, config)

  * data - parsed body of responce
  * status - responce HTTP status
  * headerFn - function to get header, i.e. headerFn('Content')
  * config - initial requestObj passed to http

`error` - error callback, which should be called with (data, status, headerFn, config)


Here are implementations for:

### Conformance & Profiles

### Resource's CRUD

#### Create Resource

To create a FHIR resource, call
`myClient.create(entry, callback, errback)`, passing
an object that contains the following properties:

* `resource` (required) - resource in FHIR json
* `tags` (optional) - list of categories (see below)

In case of success,the  callback function will be
invoked with an object that contains the following
attributes:

* `id` - url of created resource
* `content` - resource json
* `category` - list of tags

```javascript

var entry = {
  category: [{term: 'TAG term', schema: 'TAG schema', label: 'TAG label'}, ...]
  resource: {
    resourceType: 'Patient',
    //...
  }
}

myClient.create(entry,
 function(entry){
    console.log(entry.id)
 },
 function(error){
   console.error(error)
 }
)

```

#### Get resource

To get one specific object from a resource (usually by id), call `fhir.read({type: resourceType})`. To specify the patient identifier, call `fhir.read({type: resourceType, patient: patientIdentifier})`

Examples:

```js
fhir.read({type: 'Patient', patient: '8673ee4f-e2ab-4077-ba55-4980f408773e'})
```

#### Search Resource

To search a resource, call `fhir.search({type: resourceType, query: queryObject})`,
where queryObject syntax `fhir.js` adopts
mongodb-like query syntax ([see](http://docs.mongodb.org/manual/tutorial/query-documents/)):

```javascript
{name: 'maud'}
//=> name=maud

{name: {$exact: 'maud'}}
//=> name:exact=maud

{name: {$or: ['maud','dave']}}
//=> name=maud,dave

{name: {$and: ['maud',{$exact: 'dave'}]}}
//=> name=maud&name:exact=Dave

{birthDate: {$gt: '1970', $lte: '1980'}}
//=> birthDate=gt1970&birthDate=lte1980

{subject: {$type: 'Patient', name: 'maud', birthDate: {$gt: '1970'}}}
//=> subject:Patient.name=maud&subject:Patient.birthDate=gt1970

{'subject.name': {$exact: 'maud'}}
//=> subject.name:exact=maud

```

#### Update Resource

To update a resource, call `fhir.update({type: resourceType, id: identifier, resource: resourceObject})`.
In case of success,the  callback function will be invoked.

Example: 
```javascript
 	this.fhirClient.update({
            type: "Patient",
            id: 1,
            resource: {
		name: 'New Name'
            }
        }).catch(function(e){
            console.log('An error happened while updating patient: \n' + JSON.stringify(e));
            throw e;
        }).then(function(bundle){
            console.log('Updating patient successed');
            return bundle;
        });
```

#### Delete Resource

To update a resource, call `fhir.delete({type: resourceType, id: identifier})`.

For more information see [tests](https://github.com/FHIR/fhir.js/blob/master/test/querySpec.coffee)

## For Developers

FHIR.js is built on top of **middleware** concept.
What is middleware?
This is a high order function of shape:

```js
var mw  = function(next){
   return function(args){
     if (...) // some logic{
        return next(args); //next mw in chain
     } else {
        return promise; //short circuit chain
     }
  }
}
```

Using function Middleware(mw) you can get composable middle-ware (with .and(mw) method):

```
mwComposition = Middleware(mw).and(anotherMw).and(anotherMw);
```

Every API function is built as chain of middlewares with end handler in the end:

```js
conformance = $GET.and(BaseUrl.slash("metadata")).end(http)
create =  $POST.and($resourceTypePath).and($ReturnHeader).and($JsonData).end(http),
```

## Release Notes

### release 0.1

API changes history is split into 3 fns:

* fhir.history
* fhir.typeHistory
* fhir.resourceHistory

## TODO

* npm package
* bower package

## Contribute

Join us by [github issues](https://github.com/FHIR/fhir.js/issues) or pull-requests

## License

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
