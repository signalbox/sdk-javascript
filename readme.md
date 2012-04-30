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

...


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


Performs a GET request to the given resource.

...


### POST

...


### PUT

...


### DELETE

...


## Query Encoding

...


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
