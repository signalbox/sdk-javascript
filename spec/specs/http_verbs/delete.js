suite('SignalBox', {

  'context HTTP Verbs' : {

    'context DELETE' : {

      "it should successfully delete a record given a valid ID" : function(){
        var success = sinon.spy();

        SignalBox.delete('/resources/users/4f994bcb9c790b6b680000e4', {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.deleteOK);

        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.deleteOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should the resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.delete('/resources/users/12345', {
          error : error
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a server error occur" : function(){
        var error = sinon.spy();

        SignalBox.delete('/resources/users/12345', {
          error : error
        });

        this.request.respondToLast(500, TestEnvironment.stubs.generic.internalServerError);

        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.internalServerError);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
