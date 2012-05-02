suite('SignalBox', {

  'context Actions' : {

    'context List' : {

      "it should perform a successful request to list a collection of resources" : function(){
        var success = sinon.spy();

        SignalBox.list('users', {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.getCollectionOK);

        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.getCollectionOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.list('missing', {
          error : error
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should an invalid query be passed" : function(){
        var error = sinon.spy();

        SignalBox.list('users', {
          error : error,
          query : 'SLECTT *'
        });

        this.request.respondToLast(422, TestEnvironment.stubs.generic.unprocessibleEntity);

        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.unprocessibleEntity);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
