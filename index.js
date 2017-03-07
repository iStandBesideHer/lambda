// This is a manual test frontend

var httpMethod = 'PUT';
var resourcePath = 'her-page/58bdb60ac534a5c4ae54d075';
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
    herPicture: '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',
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
