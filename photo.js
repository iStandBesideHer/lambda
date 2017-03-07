var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');


var https = require('https'); //Https module of Node.js
var FormData = require('form-data'); //Pretty multipart form maker.
var extend = require('extend');

var photo = module.exports = {}

// Post a photo
// Output: photoInfo: {id:'', url:'', size:xx};
photo.upload = function(filename, contentType, imageBuff) {

  return new Promise(function(resolve, reject){

    var statusCode;
    var form = new FormData(); //Create multipart form
    form.append('file', imageBuff, {
      filename: filename,
      contentType: contentType
    });

    var options = {
      host: 'istandbesideher.squarespace.com',
      path: '/api/uploads/images?crumb=' + process.env.csrfToken,
      method: 'post',
      json: true,
      headers: extend(true, {}, template.sqsHeaders, form.getHeaders())
    }

    //Do POST request, callback for response
    var req = https.request(options, function (res, data){
      statusCode = res.statusCode;
    });

    //Binds form to request
    form.pipe(req);

    //If anything goes wrong
    req.on('error', function (error) {
      reject(error);
    });

    // Process the response
    req.on('response', function(res) {
  
      // Read response data
      var rspData = '';
      res.on('data', function(data) {
        rspData += data.toString();
      });
      res.on('end', function(data) {
        if (statusCode == 200) {
          try {
            var rspBody = JSON.parse(rspData);
            var media = rspBody.media[0];
            var photoInfo = {
              id: media.id,
              url: media.assetUrl,
              size: media.dataSize
            }
console.log(photoInfo);
            var jobId = rspBody.job && rspBody.job.id;
            if (jobId) {
              return photo.wait(jobId)
                .catch(function(e) {
                  reject({msg:'Error with photo job processing', err:e});
                })
                .then(function(){
                  resolve(photoInfo);
                });
            }
            return resolve(photoInfo);
          }
          catch(e) {
            return reject({msg:'Bad JSON response from image update', err:e, rsp:rspData});
          }
        }
        return reject({msg:'Bad status code from image update', statusCode:statusCode});
      });
    });
  });
}

// Wait for photo processing, resolve when complete
photo.wait = function(jobId) {
  return Promise.resolve()
    .then(function() {
      var opts = {
        url: 'https://istandbesideher.squarespace.com/api/rest/jobs/?id=' + jobId,
        method: 'GET',
        json: true,
        headers: template.sqsHeaders
      }
      return rp(opts);
    })
    .then(function(result){
      if (result[0].status == 1) {
        return uploadPhoto.wait(jobId);
      }
    })
}


/*
{
  "media": [
    {
      "id": "58be489e6b8f5b38e4987700",
      "recordType": 2,
      "addedOn": 1488865438795,
      "updatedOn": 1488865439042,
      "workflowState": 1,
      "publishOn": 1488865438795,
      "authorId": "58b5e6ff1e5b6c6b3d2041b9",
      "systemDataId": "1488865439040-6QZCUGFG5LFNBE64I5LE",
      "systemDataSourceType": "PNG",
      "filename": "playstore-icon.png",
      "mediaFocalPoint": {
        "x": 0.5,
        "y": 0.5,
        "source": 3
      },
      "dataSize": 26166,
      "urlId": "7fx74fdesl8g1q0rs0xxb7dg1akdvj",
      "title": "",
      "body": {
        "raw": false
      },
      "likeCount": 0,
      "dislikeCount": 0,
      "commentCount": 0,
      "publicCommentCount": 0,
      "commentState": 2,
      "unsaved": false,
      "assetUrl": "https://static1.squarespace.com/static/58aa7ab359cc68ccc504b8af/t/58be489e6b8f5b38e4987700/1488865439042/playstore-icon.png",
      "contentType": "image/png",
      "pushedServices": {},
      "pendingPushedServices": {},
      "hasFileData": true,
      "recordTypeLabel": "image"
    }
  ]
}
*/
