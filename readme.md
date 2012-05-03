# Signal Box JavaScript SDK

The Signal Box JavaScript SDK aims to provide a light wrapper to communicate with your Signal Box apps. The library depends on jQuery, however suggestions for compatability with other libraries are welcome.


## Contents

* [API Documentation](#api-documentation)
* [Setup](#setup)
* [Actions](#actions)
* [HTTP Verbs](#http-verbs)
* [Queries without an explicit scope](#queries-without-an-explicit-scope)
* [Query Encoding](#query-encoding)
* [Function Chaining](#function-chaining)
* [Cross Origin Requests](#cross-origin-requests)


## API Documentation

The API documentation related to each library call can be found on [the Signal Box documentation site](https://docs.getsignalbox.com/reference/resource-api).


## Setup

Include the SDK in your page:

```html
<script type="text/javascript" src="http://cdn.getsignalbox.com/sdks/javascript/sdk-0.1.0.js"></script>
```

In order to start communicating with your resources API, you'll need to tell Signal Box who you are and what application you're using. To do this, call the `setup` function.

```javascript
SignalBox.setup({
  app      : 'myapp',
  username : 'demo',
  version  : 1, // optional, latest (1) by default.
  https    : true // optional, HTTP by default.
});
```

This will ensure your credentials are set correctly for each request.


## Actions

Signal Box describes HTTP verbs using actions. There are 5 actions in total:

* [List](#list)
* [Read](#read)
* [Create](#create)
* [Update](#update)
* [Destroy](#destroy)

Each of these actions are exposed through the library API.


### List

```javascript
SignalBox.list(resource, options)
```

* **resource** - The resource plural name.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`), as well as:
  * **query** - A valid SBQL query, with replacement tags. See [query encoding](#query-encoding).
  * **queryReplacements** - A valid replacement object for the `query` parameter.

Makes a request to a resources list action, returning a collection of records. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### Read

```javascript
SignalBox.read(resource, id, options)
```

* **resource** - The resource plural name.
* **id** - The ID of the resource instance.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Makes a request to a resources read action, returning an instance of a resource. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### Create

```javascript
SignalBox.create(resource, options)
```

* **resource** - The resource plural name.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`), as well as:
  * **params** - An object representing the property values of the new resource.

Makes a request to a resources create action, creating and returning a new resource instance. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### Update

```javascript
SignalBox.update(resource, id, options)
```

* **resource** - The resource plural name.
* **id** - The ID of the resource instance.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`), as well as:
  * **params** - An object representing the property values to update on the resource.

Makes a request to a resources update action, updating and returning the resource instance. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### Destroy

```javascript
SignalBox.destroy(resource, id, options)
```

* **resource** - The resource plural name.
* **id** - The ID of the resource instance.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Makes a request to a resources destroy action, deleting the resource instance. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


## HTTP Verbs

Action functions are simply wrappers around the HTTP verbs API. If you wish, you can use these instead to communicate with your resources:

* [GET](#get)
* [POST](#post)
* [PUT](#put)
* [DELETE](#delete)


### GET

```javascript
SignalBox.get(url, options)
```

* **url** - the relative target URL.
* **options** - An object containing any keys supported by jQuery.ajax (including request parameters, `success` and `error`).

Performs a GET request to the given URL. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### POST

```javascript
SignalBox.post(resource, options)
```

* **url** - the relative target URL.
* **options** - An object containing any keys supported by jQuery.ajax (including request parameters, `success` and `error`).

Performs a POST request to the given URL. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### PUT

```javascript
SignalBox.put(resource, options)
```

* **url** - the relative target URL.
* **options** - An object containing any keys supported by jQuery.ajax (including request parameters, `success` and `error`).

Performs a PUT request to the given URL. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.


### DELETE

```javascript
SignalBox.delete(resource, options)
```

* **url** - the relative target URL.
* **options** - An object containing any keys supported by jQuery.ajax (including request parameters, `success` and `error`).

Performs a DELETE request to the given URL. Note that some older browsers may require you to access this method using the `SignalBox['delete']` syntax due to `delete` being a reserved word. The `success` and `error` callbacks are called with the arguments `response` and `xhr`.

## Queries without an explicit scope

SBQL queries can also be executed without an explicit scope (resource plural name). You can do this using the `query` function.

```javascript
SignalBox.query(query, replacements, options)
```

* **query** - The SBQL query, with supported replacement tags.
* **replacements** - A valid replacement object for the `query` parameter.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Example usage:

```javascript
SignalBox.query('SELECT * FROM {{resource}} ORDER BY {{order}}', {
  resource : 'users',
  order    : 'username'
}, {
  success : function(response){
    console.log(response)
  }
})
```


## Query Encoding

```javascript
SignalBox.encodeSBQL(query, replacements)
```

* **query** - A string representation of the SBQL query.
* **replacements** - An object containing query replacements.

Encodes a string as a URL parameter into a valid SBQL query. This is a convenience method to avoid scenarios where you may have a large query requiring you to concatenate many strings.

Example usage:

```javascript
SignalBox.encodeSBQL('SELECT * FROM {{resource}} ORDER BY {{order}}', {
  resource : 'users',
  order    : 'username'
}) // => SELECT%20*%20FROM%20users%20ORDER%20BY%20username
```

## Function Chaining

Just like jQuery's `$.ajax` function, each Signal Box action and HTTP verb call returns a deferred object, ensuring method chaining works the same as a regular jQuery AJAX call.


## Cross Origin Requests

In order to use the SDK from a remote server you'll need to use the Request Headers add-on. This allows you to set additional headers in API responses, including [CORS](https://developer.mozilla.org/en/HTTP_access_control) headers. For example, you may want to set the following headers:

```plain
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type, X-Requested-With
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

An alternative to allowing cross domain communication is to use a proxy. When proxying requests you can tell the SDK to use your local webserver instead of `api.getsignalbox.com` by changing the `SignalBox.host` value to your web server address.


## Specs

Specs are written using Jasmine and Sinon. Running the tests should be as simple as opening `specs/index.html` in your browser.


## Bugs

If you have any problems with the library, please file an [issue](https://github.com/signalbox/sdk-javascript/issues).


## Note on Patches & Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so we don't break it in a future version unintentionally.
* Commit, please do not mess with rakefile, version, or history.
* Send us a pull request.


## Copyright

Copyright (c) 2012 Signal Box <josh@getsignalbox.com>. See LICENSE for details.
