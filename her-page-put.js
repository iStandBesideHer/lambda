var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');
var herPageGet = require('./her-page-get');
var photo = require('./photo');

// PUT /her-page/{id}?pagePW=hash
// body: {
//   herName: 'Robin West',
//   pagePW: 'c3VnYXJsaXBz', // Changed or existing PW
//   herPicture: base64 encoded png
//   herDoing: 'What shes doing',
//   whenMM: 
//   whenDD:
//   whenYY:
// }
// response: 'redirect URL to view page'
exports.handler = function(event, response) {
  var id;
  var putBody;
  var pagePW;
  return Promise.resolve()
    .then(function(){
      id = event.path.split('/')[2];
      pagePW = event.queryStringParameters.pagePW;
      putBody = JSON.parse(event.body);
      return herPageGet.getEntry(id);
    })
    .then(function(entry){
      if (entry.customContent.pagePW != pagePW) {
        throw new Error('Invalid password');
      }
      return exports.mergeEntry(entry, putBody);
    })
    .then(function(mergedEntry){
      if (putBody.herPicture) {
        return exports.attachPicture(mergedEntry, putBody.herPicture);
      }
      return mergedEntry;
    })
    .then(function(mergedEntry){
      mergedEntry.workflowState = 1; // This publishes the entry
      return exports.putEntry(mergedEntry);
    })
    .then(function(putEntry){
      var viewPageUrl = '/beside/' + putEntry.urlId;
      response.headers['Content-Type'] = 'text/plain';
      response.send(viewPageUrl);
    })
    .catch(function(e) {
      response.statusCode = 500;
      response.send({msg:'Error updating ' + putBody.herName, err:e.message || e});
    });
};

// Merges the PUT body with an existing entry
exports.mergeEntry = function(entry, putBody) {
  return Promise.resolve()
    .then(function() {

      // Set some data elements
      entry.urlId = template.slugify(putBody.herName) + '-' + entry.id;
      entry.fullUrl = '/beside/' + entry.urlId;
      var cc = entry.customContent = entry.customContent || {};
      cc.herName = putBody.herName || cc.herName;
      cc.pagePW = putBody.pagePW || cc.pagePW;
      cc.herDoing = putBody.herDoing || cc.herDoing;
      cc.whenMM = putBody.whenMM || cc.whenMM;
      cc.whenDD = putBody.whenDD || cc.whenDD;
      cc.whenYY = putBody.whenYY || cc.whenYY;

      return entry;
    });
};

exports.attachPicture = function(mergedEntry, herPicture) {
  return Promise.resolve()
    .then(function() {
      var imgBuff = Buffer.from(herPicture, 'base64');
      return photo.upload('her-photo.png', 'image/png', imgBuff);
    })

    .then(function(photoInfo) {
      // Merge photo into mergedEntry
      var photoEntry = JSON.parse(JSON.stringify(template.photoEntry));
      photoEntry.value.imageId = photoInfo.id;
      var middleBlocks = mergedEntry.body.layout.rows[0].columns[1].blocks;
      var topItem = middleBlocks[0];
      if (topItem.type == 5) {
        // Replace existing photo
        middleBlocks[0] = photoEntry;
      }
      else {
        // Add photo
        middleBlocks.splice(0,0,photoEntry);
      }
      return mergedEntry;
    });
};

exports.putEntry = function(entry) {
  return Promise.resolve()
    .then(function() {
      // Make sure HTML is rendered based on the entry
      template.renderTitle(entry);
      template.renderHerPicture(entry);
      template.renderHerDoing(entry);
      var opts = {
        url: template.herBlogUrl + '/' + entry.id,
        method: 'PUT',
        json: true,
        body: entry,
        headers: template.sqsHeaders
      }
      return rp(opts);
    });
};
