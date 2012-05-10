suite('SignalBox', {

  'context Actions' : {

    'context Create' : {

      "it should successfully create a record given valid parameters" : function(){
        var success = sinon.spy();

        SignalBox.create('users', {
          success : success,
          params  : {
            name  : 'Bob',
            email : 'bob@example.com'
          }
        });

        this.request.respondToLast(201, TestEnvironment.stubs.users.postOK);

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users?sb_username=example&sb_app_name=test&sb_version=2');
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.postOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should the resource params be invalid" : function(){
        var error = sinon.spy();

        SignalBox.create('users', {
          error  : error,
          params : {
            name : ''
          }
        });

        this.request.respondToLast(422, TestEnvironment.stubs.users.postUnprocessibleEntity);

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users?sb_username=example&sb_app_name=test&sb_version=2');
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.postUnprocessibleEntity);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
