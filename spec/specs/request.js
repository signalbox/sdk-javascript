suite('SignalBox', {

  'context request' : {

    'it should error if #setup has not been correctly called before making a request' : function(){
      SignalBox.settings = {};

      expect(function(){
        SignalBox.list('users', {});
      }).toThrow('Please call SignalBox.setup before making a request.');
    }

  }

});
