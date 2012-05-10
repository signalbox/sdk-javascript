suite('SignalBox', {

  'context Actions' : {

    'context Read' : {

      "it should perform a successful request to fetch a single resource" : function(){
        var success = sinon.spy();

        SignalBox.read('users', '4fa130879c790b15b1000246', {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.getOk);

        expect(this.request.last).toHaveURLPart('/resources/users/4fa130879c790b15b1000246?')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.getOk);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.read('users', '12345', {
          error : error
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(this.request.last).toHaveURLPart('/resources/users/12345?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
