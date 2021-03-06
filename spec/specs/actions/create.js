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

        expect(this.request.last).toHaveURLPart('/resources/users?')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.postOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should remove any _id properties from the params before encoding" : function(){
        var success = sinon.spy();

        SignalBox.create('users', {
          success : success,
          params  : {
            _id   : '12345',
            name  : "Bob",
            email : 'bob@example.com'
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.postOK);
        expect(this.request.last.requestBody).toEqual('{"name":"Bob","email":"bob@example.com"}');
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

        expect(this.request.last).toHaveURLPart('/resources/users?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.postUnprocessibleEntity);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
