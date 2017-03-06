// This is a manual test frontend

var httpMethod = 'POST';
var resourcePath = 'her-page';
var testQueryParams = {pagePW:'c3VnYXJsaXBz'};

var testBodies = {
  GET: '',
  POST: {
    herName: 'Robin F. West',
    pagePW: 'c3VnYXJsaXBz'
  },
  PUT: {
    herName: 'Robin F. West',
    pagePW: 'c3VnYXJsaXBz',
    herPicture: '',
    herDoing: 'Test\nPage',
    whenMM: '10',
    whenDD: '',
    whenYY: '2017'
  },
  DELETE: ''
}

// Change these when necessary. Match with lambda (see README)
process.env.csrfToken = 'BCGnmM9Wf-1YNzk4NDM4ZGFlYTUyOTcyNDY2Y2RiZmJhYWRkNTVm';
process.env.cookie = 'SS_MID=b0700319-4014-4403-860a-94201ab6718dizqodhq0; SS_MATTR=eyJ2IjoyLCJhIjpbImRpcmVjdCIsIiIsIiIsIiIsIiJdLCJkIjoiMjAxNy0wMy0wMSAwODowMzoxNy42ODAifQ==; __utmt=1; _dc_gtm_UA-91901-13=1; _ga=GA1.2.1514510902.1488355398; __utma=46467109.1514510902.1488355398.1488355398.1488355398.1; __utmb=46467109.11.4.1488355401954; __utmc=46467109; __utmz=46467109.1488355398.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); secureauthtoken=f54a21f3-7697-4286-987e-7945d2ad8995&Z9J8K2KIVE; secureredirect=true; JSESSIONID=i52_29TTqTElc5zZwTf9pEfCZMk3JKZf8OG3KKWCkLh52oRDhxvsYA; crumb=BCGnmM9Wf-1YNzk4NDM4ZGFlYTUyOTcyNDY2Y2RiZmJhYWRkNTVm; ss_lastid=eyJpZGVudGlmaWVyIjoiaXN0YW5kYmVzaWRlaGVyIn0%3D';

var testRequest = {
  "body": JSON.stringify(testBodies[httpMethod]),
  "resource": "/{proxy+}",
  "requestContext": {
    "resourceId": "123456",
    "apiId": "1234567890",
    "resourcePath": "/{proxy+}",
    "httpMethod": httpMethod,
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "accountId": "123456789012",
    "identity": {
      "apiKey": null,
      "userArn": null,
      "cognitoAuthenticationType": null,
      "caller": null,
      "userAgent": "Custom User Agent String",
      "user": null,
      "cognitoIdentityPoolId": null,
      "cognitoIdentityId": null,
      "cognitoAuthenticationProvider": null,
      "sourceIp": "127.0.0.1",
      "accountId": null
    },
    "stage": "prod"
  },
  "queryStringParameters": testQueryParams,
  "headers": {
    "Content-Type": "application/json",
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "Accept-Language": "en-US,en;q=0.8",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Mobile-Viewer": "false",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "CloudFront-Viewer-Country": "US",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Upgrade-Insecure-Requests": "1",
    "X-Forwarded-Port": "443",
    "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
    "X-Forwarded-Proto": "https",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "CloudFront-Is-Tablet-Viewer": "false",
    "Cache-Control": "max-age=0",
    "User-Agent": "Custom User Agent String",
    "CloudFront-Forwarded-Proto": "https",
    "Accept-Encoding": "gzip, deflate, sdch"
  },
  "pathParameters": {
    "proxy": resourcePath
  },
  "httpMethod": httpMethod,
  "stageVariables": {
    "baz": "qux"
  },
  "path": "/" + resourcePath
}

var testContext = {
  succeed: function(response) {
    console.log(response.body);
  },
  fail: function(msg) {
    console.error('\nFail: ' + msg);
  }
}

// Invoke the lambda entry point
var lambdaEntryPoint = require('./index-lambda').handler(testRequest, testContext);
