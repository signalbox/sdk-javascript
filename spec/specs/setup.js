suite('SignalBox', {

  'context setup' : {

    'it should accept an options object' : function(){
      var settings = {
        username : 'example'
      };

      SignalBox.setup(settings);

      expect(SignalBox.settings.username).toEqual(settings.username);
    },

    'it should return sensible defaults to optional values' : function(){
      var settings = {
        app      : 'test',
        username : 'example'
      };

      SignalBox.setup(settings);

      expect(SignalBox.settings.username).toEqual(settings.username);
      expect(SignalBox.settings.app).toEqual(settings.app);
      expect(SignalBox.settings.version).toEqual(1);
      expect(SignalBox.settings.https).toBeFalsy();
    },

    'it should allow optional values to be overriden' : function(){
      var settings = {
        app        : 'test',
        username   : 'example',
        https      : true,
        version    : 2
      };

      SignalBox.setup(settings);

      expect(SignalBox.settings.username).toEqual(settings.username);
      expect(SignalBox.settings.app).toEqual(settings.app);
      expect(SignalBox.settings.version).toEqual(settings.version);
      expect(SignalBox.settings.https).toEqual(settings.https);
    },

    'it should return itself to allow function chaining' : function(){
      expect(SignalBox.setup({})).toEqual(SignalBox);
    }

  }

});
