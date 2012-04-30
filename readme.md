# Signal Box JavaScript SDK

The Signal Box JavaScript SDK aims to provide a light wrapper to communicate with your Signal Box apps. The library depends on jQuery, however suggestions for compatability with other libraries are welcome.


## Contents

* [Setup](#setup)
* [Actions](#actions)
* [HTTP Verbs](#http-verbs)


## Setup

In order to start communicating with your resources API, you'll need to tell Signal Box who you are and what application you're using. To do this, call the `setup` function.

```javascript
SignalBox.setup({
  app      : 'myapp',
  username : 'demo'
});
```

This will ensure your credentials are set correctly for each request.


# Actions

...


## HTTP Verbs

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
