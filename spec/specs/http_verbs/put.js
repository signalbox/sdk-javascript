suite('SignalBox', {

  'context HTTP Verbs' : {

    'context PUT' : {

      "it should successfully update a record given valid parameters" : function(){
        var success = sinon.spy();

        SignalBox.put('/resources/users/12345', {
          success : success,
          params  : {
            name : "Updated"
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.putOK);

        expect(this.request.last).toHaveURLPart('/resources/users/12345?')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.putOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should remove any _id properties from the params before encoding" : function(){
        var success = sinon.spy();

        SignalBox.put('/resources/users/12345', {
          success : success,
          params  : {
            _id   : '12345',
            name  : "Updated",
            email : 'bob@example.com'
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.postOK);
        expect(this.request.last.requestBody).toEqual('{"name":"Updated","email":"bob@example.com"}');
      },

      "it should trigger the error callback should the resource params be invalid" : function(){
        var error = sinon.spy();

        SignalBox.put('/resources/users/12345', {
          error  : error,
          params : {
            name : ""
          }
        });

        this.request.respondToLast(422, TestEnvironment.stubs.users.putUnprocessibleEntity);

        expect(this.request.last).toHaveURLPart('/resources/users/12345?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.putUnprocessibleEntity);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should the resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.put('/resources/users/12345', {
          error  : error,
          params : {
            name : ""
          }
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(this.request.last).toHaveURLPart('/resources/users/12345?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a server error occur" : function(){
        var error = sinon.spy();

        SignalBox.put('/resources/users', {
          error : error
        });

        this.request.respondToLast(500, TestEnvironment.stubs.generic.internalServerError);

        expect(this.request.last).toHaveURLPart('/resources/users?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.internalServerError);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
