var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');
var herPageGet = require('./her-page-get');

// PUT /her-page/{id}?pagePW=hash
// body: {
//   herName: 'Robin West',
//   pagePW: 'c3VnYXJsaXBz', // Changed or existing PW
//   herPicture: (later)
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
