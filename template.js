var Mustache = require('mustache');

var template = module.exports = {}

template.herBlogId = '58b4f0816b8f5b9184f614cd';
template.herBlogUrl = 'https://istandbesideher.squarespace.com/api/content/blogs/' + template.herBlogId + '/text-posts';

template.blankHerPage = {
  "collectionId": template.herBlogId,
  "parentId": null,
  "authorId": "58b5e4309de4bb013640af4d",
  "proxyForId": null,
  "recordType": 1,
  "childType": null,
  "addedOn": 1488317393510,
  "updatedOn": null,
  "publishOn": 1488317393510,
  "unsaved": null,
  "urlId": "",
  "title": "",
  "body": {
    "raw": false,
    "layout": {
      "columns": 12,
      "rows": [
        {
          "columns": [
            {
              "span": 2,
              "blocks": [
                {
                  "type": 21,
                  "id": "left-spacer",
                  "value": {
                    "hSize": null,
                    "floatDir": null,
                    "vSize": 1,
                    "aspectRatio": null
                  }
                }
              ]
            },
            {
              "span": 8,
              "blocks": [
                {
                  "type": 23,
                  "id": "her-picture",
                  "value": {
                    "wysiwyg": {
                      "source": "",
                      "isSource": false,
                      "mode": "htmlmixed",
                      "engine": "source"
                    },
                    "html": "<img src=\"\" title=\"\" alt=\"\"/>"
                  }
                },
                {
                  "type": 23,
                  "id": "her-doing",
                  "value": {
                    "wysiwyg": {
                      "source": "",
                      "isSource": false,
                      "mode": "htmlmixed",
                      "engine": "source"
                    },
                    "html": "<h2 class=\"text-align-center\"></h2>"
                  }
                },
                {
                  "type": 23,
                  "id": "her-edit",
                  "value": {
                    "wysiwyg": {
                      "source": "",
                      "isSource": false,
                      "mode": "htmlmixed",
                      "engine": "source"
                    },
                    "html": "<div id=\"edit-her-page\"></div>"
                  }
                }
              ]
            },
            {
              "span": 2,
              "blocks": [
                {
                  "type": 21,
                  "id": "right-spacer",
                  "value": {
                    "hSize": null,
                    "floatDir": null,
                    "vSize": 1,
                    "aspectRatio": null
                  }
                }
              ]
            }
          ]
        }
      ],
      "legacyPromotedLayout": true,
      "promotedBlockId": null,
      "collectionId": template.herBlogId,
      "parentItemId": null,
      "span": 12
    }
  },
  "excerpt": {
    "html": "",
    "raw": false
  },
  "displayIndex": 0,
  "starred": false,
  "passthrough": false,
  "tags": [],
  "categories": [],
  "workflowState": 4,
  "systemDataId": null,
  "systemDataVariants": null,
  "systemDataOrigin": null,
  "contentType": null,
  "filename": null,
  "dataSize": null,
  "sourceUrl": "",
  "mediaProcessingState": null,
  "mediaFocalPoint": {
    "x": 0.5,
    "y": 0.5
  },
  "clickthroughUrl": null,
  "location": {
    "mapLat": 40.7207559,
    "mapLng": -74.00076130000002,
    "mapZoom": 12,
    "markerLat": 40.7207559,
    "markerLng": -74.00076130000002
  },
  "customContent": null, // {pagePW:'hash'}
  "likeCount": 0,
  "dislikeCount": 0,
  "commentCount": 0,
  "publicCommentCount": 0,
  "commentState": 1,
  "commentDisableOn": null,
  "pushedServices": [],
  "shareStates": [{"message":"Stand beside her - %t - #iStandBesideHer %u","connectedAccountId":"58b3457a86e6c04706d62094","pushEnabled":true}],
  "structuredContent": null,
  "licensedAssetPreview": null,
  "licensedAssetId": null,
  "isPusher": true
};

template.sqsHeaders = {
  'origin': 'https://istandbesideher.squarespace.com',
  'x-csrf-token': process.env.csrfToken,
  'accept-language': 'en-US,en;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
  'content-type': 'application/json;charset=UTF-8',
  'accept': 'application/json, text/plain, */*',
  'referer': 'https://istandbesideher.squarespace.com/config/pages/58b4f0816b8f5b9184f614cd',
  'authority': 'istandbesideher.squarespace.com',
  'cookie': process.env.cookie
};

template.slugify = function(text) {
  return text.toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

template.title = '{{herName}}';
template.renderTitle = function(entry) {
  entry.title = Mustache.render(template.title, entry.customContent);
};

template.picture = '<img src="" title="" alt=""/>';
template.renderHerPicture = function(entry) {
  var view = {}
  var pictureBlock = entry.body.layout.rows[0].columns[1].blocks[0];
  pictureBlock.value.html = Mustache.render(template.picture, view);
};

template.doing = '<h2 class="text-align-center">{{herDoing}}</h2>'
template.renderHerDoing = function(entry) {
  var cc = entry.customContent || {};
  var view = {
    herDoing: cc.herDoing || ''
  }
  var doingBlock = entry.body.layout.rows[0].columns[1].blocks[1];
  doingBlock.value.html = Mustache.render(template.doing, view).replace(/\n/g, '<br />');
};
