beforeEach(function(){

  this.request = {};
  this.request.headers = { "Content-Type": "application/json" };
  this.request.xhr = sinon.useFakeXMLHttpRequest();

  var requests = this.request.log = [];
  var lastRequest;

  this.request.xhr.onCreate = function(xhr){
    lastRequest = xhr;
    requests.push(xhr);
  };

  this.request.respondToLast = function(status, body){
    lastRequest.respond(status, this.headers, JSON.stringify(body));
  };

});

afterEach(function(){
  this.request.xhr.restore();
});
