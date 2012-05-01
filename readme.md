# Signal Box JavaScript SDK

The Signal Box JavaScript SDK aims to provide a light wrapper to communicate with your Signal Box apps. The library depends on jQuery, however suggestions for compatability with other libraries are welcome.


## Contents

* [Setup](#setup)
* [Actions](#actions)
* [HTTP Verbs](#http-verbs)
* [Query Encoding](#query-encoding)


## Setup

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

* List
* Read
* Create
* Update
* Destroy

Each of these actions are exposed through the library API.

### List

```javascript
SignalBox.list(resource, options)
```

* **resource** - The resource plural name.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`), as well as:
  * **query** - A valid SBQL query, with replacement tags. See [query encoding](#query-encoding).
  * **queryReplacements** - A valid replacements object for the `query` parameter.

Makes a request to a resources LIST action, returning a collection of records.


### Read

...


### Create

...


### Update

...


### Destroy

...


## HTTP Verbs

Action functions are simple wrappers around the HTTP verbs API. If you wish, you can use these instead to communicate with your resources.


### GET

```javascript
SignalBox.get(resource, params, options)
```

* **resource** - The individual resource or collection URL.
* **params** - An object containing parameters for the request.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).


Performs a GET request, fetching either a single resource or a collection of resources.


### POST

```javascript
SignalBox.post(resource, params, options)
```

* **resource** - The resource collection URL.
* **params** - An object containing the resource property values.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Performs a POST request, creating a resource instance.


### PUT

```javascript
SignalBox.put(resource, params, options)
```

* **resource** - The individual resource URL.
* **params** - An object containing the resource property values to update.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Performs a PUT request, updating a resource instance.


### DELETE

```javascript
SignalBox.delete(resource, options)
```

* **resource** - The individual resource URL.
* **options** - An object containing any keys supported by jQuery.ajax (including `success` and `error`).

Performs a DELETE request, deleting a resource instance. Note that this is the only function which does not have the same name as the HTTP verb due to `delete` being a reserved word in JavaScript.


## Query Encoding

```javascript
SignalBox.encodeSBQL(query, replacements)
```

* **query** - A string representation of the SBQL query.
* **replacements** - An object containing query replacement values.

Encodes a string as a URL parameter with the given replacements into a valid SBQL query. This is a convenience method to avoid scenarios where you may have a large query requiring you to concatenate many strings.

Example usage:

```javascript
SignalBox.encodeSBQL('SELECT * FROM {{resource}} ORDER BY {{order}}', {
  resource : 'users',
  order    : 'username'
}) // => SELECT%20*%20FROM%20users
```


## Specs

Specs are written using Jasmine and Sinon. Running the tests should be as simple as opening specs/index.html in your browser.


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
