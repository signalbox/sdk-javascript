suite('SignalBox', {

  'context HTTP Verbs' : {

    'context PUT' : {

      "it should successfully update a record given valid parameters" : function(){
        var success = sinon.spy();

        SignalBox.put('/resources/users', {
          success : success,
          params  : {
            name : "Updated"
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.putOK);

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users?sb_username=example&sb_app_name=test&sb_version=2');
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.putOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should the resource params be invalid" : function(){
        var error = sinon.spy();

        SignalBox.put('/resources/users', {
          error  : error,
          params : {
            name : ""
          }
        });

        this.request.respondToLast(422, TestEnvironment.stubs.users.putUnprocessibleEntity);

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users?sb_username=example&sb_app_name=test&sb_version=2');
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

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users/12345?sb_username=example&sb_app_name=test&sb_version=2');
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

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users?sb_username=example&sb_app_name=test&sb_version=2');
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.internalServerError);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
