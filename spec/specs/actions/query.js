suite('SignalBox', {

  'context Actions' : {

    'context Query' : {

      "it should perform a successful query given a valid string" : function(){
        var success = sinon.spy();

        SignalBox.query('SELECT * FROM {{resource}}', { resource : 'users' }, {
          success : success
        });

        this.request.respondToLast(200, TestEnvironment.stubs.users.getCollectionOK);

        expect(this.request.last).toHaveURLPart('/resources?query=SELECT%20*%20FROM%20users')
        expect(success.callCount).toBe(1);
        expect(success.lastCall.args[0]).toEqual(TestEnvironment.stubs.users.getCollectionOK);
        expect(success.lastCall.args[1]).toBeXHR();
      },

      "it should trigger the error callback should a query fail" : function(){
        var error = sinon.spy();

        SignalBox.query('SELECCT * FROM {{resource}}', { resource : 'users' }, {
          error : error
        });

        this.request.respondToLast(404, TestEnvironment.stubs.generic.notFound);

        expect(this.request.last).toHaveURLPart('/resources?query=SELECCT%20*%20FROM%20users')
        expect(error.callCount).toBe(1);
        expect(error.lastCall.args[0]).toEqual(TestEnvironment.stubs.generic.notFound);
        expect(error.lastCall.args[1]).toBeXHR();
      }

    }

  }

});
