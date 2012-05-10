suite('SignalBox', {

  'context Actions' : {

    'context Read' : {

      "it should perform a successful request to fetch a single resource" : function(){
        var success = sinon.spy();

        SignalBox.read('users', '4fa130879c790b15b1000246', {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.getOk);

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users/4fa130879c790b15b1000246?sb_username=example&sb_app_name=test&sb_version=2');
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

        expect(this.request.last.url).toEqual('https://api.getsignalbox.com/resources/users/12345?sb_username=example&sb_app_name=test&sb_version=2');
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
