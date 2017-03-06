AWS Lambda Utilities
====================

TODO after debugging
--------------------
- Change origin from '*' to https://istandbesideher.org in AWS API gateway and index-lambda.js

To deploy
---------

- npm run zip
- Upload ~/Downloads/iStandBesideHer-lambda.zip into the lambda dashboard

To Update the auth cookie
-------------------------
- Open an in-cognito window
- Login to squarespace as istandbesideher / {pw}
- Open the developer window
- Extract the cookie header from any GET request
- Extract the csrfToken from the crumb element of the cookie

- Place into index.js for testing
- Place into lambda environment variables here:
  https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/i-stand-beside-her-api?tab=code

