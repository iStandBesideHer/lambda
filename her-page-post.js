var Promise = require('bluebird');
var rp = require('request-promise');
var template = require('./template');

// POST /her-page
// body: {
//   herName: 'Robin West',
//   pagePW: 'c3VnYXJsaXBz' // lowercased, base64 encoded pw (SugarLips)
// }
// response: 'redirect URL to edit page'
exports.handler = function(event, response) {
  var postBody;
  return Promise.resolve()
    .then(function(){
      postBody = JSON.parse(event.body);
      var entry = exports.buildEntry(postBody);
      return exports.postEntry(entry);
    })
    .then(function(postedEntry){
      var urlId = template.slugify(postBody.herName) + '-' + postedEntry.id;
      var updatePageUrl = '/her-page' +
        '?page=' + encodeURIComponent(urlId) +
        '&hash=' + encodeURIComponent(postBody.pagePW);
      response.headers['Content-Type'] = 'text/plain';
      response.send(updatePageUrl);
    })
    .catch(function(e) {
      response.statusCode = 500;
      response.send({msg:'Error adding ' + postBody.herName, err:e.message || e});
    });
};

// Return a new herPage with postBody items merged
exports.buildEntry = function(postBody) {
  var entry = JSON.parse(JSON.stringify(template.blankHerPage));
  entry.customContent = {
    herName: postBody.herName,
    pagePW: postBody.pagePW
  }
  entry.addedOn = Date.now();
  return entry;
}

exports.postEntry = function(entry) {
  return Promise.resolve()
    .then(function() {
      template.renderTitle(entry);
      var opts = {
        url: template.herBlogUrl,
        method: 'POST',
        json: true,
        body: entry,
        headers: JSON.parse(JSON.stringify(template.sqsHeaders))
      }
      opts.headers['x-autosave'] = 'true';
      return rp(opts);
    });
}
