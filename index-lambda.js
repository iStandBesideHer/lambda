exports.handler = function(event, context) {
  /*
  console.log("Event:");
  console.log(event);
  console.log("Context:");
  console.log(context);
  console.log("Env:");
  console.log(process.env);
  */
  event.queryStringParameters = event.queryStringParameters || {};
  var response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    send: function(msg) {
      var body = (typeof(msg) == 'string') ? msg : JSON.stringify(msg)
      // response.headers['Status'] = '' + response.statusCode;
      // response.headers['content-length'] = '' + body.length;
      // response.headers['date'] = new Date().toString();
      // response.headers['connection'] = 'close';
      context.succeed({
        statusCode: response.statusCode,
        headers: response.headers,
        body: body
      });
    }
  }
  var resource = event.path.split('/')[1];
  return require('./' + resource + '-' + event.httpMethod.toLowerCase()).handler(event, response);
};
