TestEnvironment.stubs.users = {};
TestEnvironment.stubs.users.getCollectionOK = {"records":[{"_id":"4f994bcb9c790b6b680000e4","email":"test@example.com","name":"Bob"},{"_id":"4f994be49c790b4589000006","email":"test@example.com","name":"Bob"},{"_id":"4f994bee9c790b4589000009","email":"test@example.com","name":"Bob"},{"_id":"4f9983ad9c790b5533000003","email":"test@example.com","name":"Updated"},{"_id":"4f9983b99c790b5533000009","email":"test@example.com","name":"Updated"}],"query":{"input":"SELECT *","properties":["_id","email","name"],"limit":100}};
TestEnvironment.stubs.users.getOk = {"_id":"4fa12df79c790b15b100021a","name":"Bob","email":"test@example.com"};
TestEnvironment.stubs.users.postOK = {"_id":"4fa12df79c790b15b100021a","name":"Bob","email":"test@example.com"};
TestEnvironment.stubs.users.postUnprocessibleEntity = {"name":["can't be blank"]};
TestEnvironment.stubs.users.putOK = {"_id":"4fa12df79c790b15b100021a","name":"Updated","email":"test@example.com"};
TestEnvironment.stubs.users.putUnprocessibleEntity = {"name":["can't be blank"]};
TestEnvironment.stubs.users.deleteOK = {};
