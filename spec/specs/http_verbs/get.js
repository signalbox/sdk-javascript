suite('SignalBox', {

  'context HTTP Verbs' : {

    'context GET' : {

      "it should perform a successful request to an existing resource" : function(){
        var success = sinon.spy();

        SignalBox.get('/resources/users', {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.getCollectionOK);

        expect(this.request.last).toHaveURLPart('/resources/users?')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.getCollectionOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.get('/resources/missing', {
          error : error
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(this.request.last).toHaveURLPart('/resources/missing?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a server error occur" : function(){
        var error = sinon.spy();

        SignalBox.get('/resources/invalid', {
          error : error
        });

        this.request.respondToLast(500, TestEnvironment.stubs.generic.internalServerError);

        expect(this.request.last).toHaveURLPart('/resources/invalid?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.internalServerError);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
