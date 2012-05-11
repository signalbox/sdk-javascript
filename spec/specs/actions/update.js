suite('SignalBox', {

  'context Actions' : {

    'context Update' : {

      "it should successfully update a record given valid parameters" : function(){
        var success = sinon.spy();

        SignalBox.update('users', '4fa12df79c790b15b100021a', {
          success : success,
          params  : {
            name : "Updated"
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.putOK);

        expect(this.request.last).toHaveURLPart('/resources/users/4fa12df79c790b15b100021a?')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.putOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should remove any _id properties from the params before encoding" : function(){
        var success = sinon.spy();

        SignalBox.update('users', '4fa12df79c790b15b100021a', {
          success : success,
          params  : {
            _id  : '12345',
            name : "Updated"
          }
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.putOK);
        expect(this.request.last.requestBody).toEqual('{"name":"Updated"}');
      },

      "it should trigger the error callback should the resource params be invalid" : function(){
        var error = sinon.spy();

        SignalBox.update('users', '4fa12df79c790b15b100021a', {
          error  : error,
          params : {
            name : ""
          }
        });

        this.request.respondToLast(422, TestEnvironment.stubs.users.putUnprocessibleEntity);

        expect(this.request.last).toHaveURLPart('/resources/users/4fa12df79c790b15b100021a?')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.putUnprocessibleEntity);
        expect(error.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should the resource not exist" : function(){
        var error = sinon.spy();

        SignalBox.update('users', '12345', {
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
      }

    }

  }

});
