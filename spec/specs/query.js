suite('SignalBox', {

  'context query' : {

    'context encodeSBQL' : {

      'it should return an empty string if no query is passed' : function(){
        expect(SignalBox.encodeSBQL('')).toEqual('');
      },

      'it should return a query as-is if no replacements are passed' : function(){
        expect(SignalBox.encodeSBQL('SELECT * FROM {{resource}}')).toEqual('SELECT%20*%20FROM%20%7B%7Bresource%7D%7D');
      },

      'it should replace tags with valid replacements if they are found in the replacements object' : function(){
        expect(SignalBox.encodeSBQL('SELECT * FROM {{resource}} ORDER BY {{order}}', {
          resource : 'users',
          order    : 'username'
        })).toEqual('SELECT%20*%20FROM%20users%20ORDER%20BY%20username');
      },

      'it should replace multiple instances of the same tag' : function(){
        expect(SignalBox.encodeSBQL('SELECT {{attribute}} FROM {{resource}} ORDER BY {{attribute}}', {
          resource  : 'users',
          attribute : 'username'
        })).toEqual('SELECT%20username%20FROM%20users%20ORDER%20BY%20username');
      }

    },

    'context query' : {}

  }

});
