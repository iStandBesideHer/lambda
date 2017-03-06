var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');

// GET /her-page/{id}?pagePW=hash
// If pagePW isn't provided, it will be masked in the response
exports.handler = function(event, response) {
  var id;
  var pagePW;
  return Promise.resolve()
    .then(function() {
      id = event.path.split('/')[2];
      pagePW = event.queryStringParameters.pagePW;
      return exports.getEntry(id);
    })
    .then(function(entry){
      if (pagePW && entry.customContent.pagePW != pagePW) {
        throw new Error('Invalid password');
      }
      if (!pagePW) {
        entry.customContent.pagePW = "******";
      }
      response.send(entry);
    })
    .catch(function(e) {
      response.statusCode = 500;
      response.send({msg:'Error getting post ID ' + id, err:e.message || e});
    });
};

exports.getEntry = function(id) {
  return Promise.resolve()
    .then(function() {
      var opts = {
        url: template.herBlogUrl + '/' + id,
        method: 'GET',
        json: true,
        headers: template.sqsHeaders
      }
      return rp(opts);
    });
}
