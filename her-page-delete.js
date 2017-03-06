var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');
var herPageGet = require('./her-page-get');
var herPagePut = require('./her-page-put');

// DELETE /her-page/{id}?pagePW=hash
exports.handler = function(event, response) {
  var id;
  var pagePW;
  return Promise.resolve()
    .then(function() {
      id = event.path.split('/')[2];
      pagePW = event.queryStringParameters.pagePW;
      return herPageGet.getEntry(id);
    })
    .then(function(entry) {
      if (entry.customContent && entry.customContent.pagePW != pagePW) {
        throw new Error('Invalid password');
      }
      return exports.deleteEntry(entry);
    })
    .then(function(){
      response.send({msg:'deleted', id:id});
    })
    .catch(function(e) {
      response.statusCode = 500;
      response.send({msg:'Error deleting post ID ' + id, err:e.message || e});
    });
};

exports.deleteEntry = function(entry) {
  entry.workflowState = 6;
  return herPagePut.putEntry(entry);
}
