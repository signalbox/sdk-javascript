$(function(){

  // Note: this is an example showing each action
  // in order, from listing collections to creating
  // and deleting record instances.

  SignalBox.setup({
    app      : 'sdk_test',
    username : 'signalboxdemo'
  });

  function list(){
    SignalBox.list('users', {
      success : function(response, xhr){
        console.log(response.records.length + " user records found.")

        if(response.records[0])
          read(response.records[0]._id);
      }
    });
  };

  function read(id){
    SignalBox.read('users', id, {
      success : function(user, xhr){
        console.log("Found: " + user._id);

        create();
      }
    });
  };

  function create(){
    SignalBox.create('users', {
      params : {
        name  : 'Bob',
        email : 'test@example.com'
      },
      success : function(user, xhr){
        console.log('Created: ' + user._id, user);

        update(user._id);
      }
    });
  };

  function update(id){
    SignalBox.update('users', id, {
      params : {
        name : 'Updated'
      },
      success : function(user, xhr){
        console.log("Updated: ", user._id, user);

        destroy(user._id);
      }
    });
  };

  function destroy(id){
    SignalBox.destroy('users', id, {
      success : function(xhr){
        console.log("Destroyed: ", id);
      }
    });
  };

  list();

});
