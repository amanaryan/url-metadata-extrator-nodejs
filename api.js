var request = require('request');
var cheerio = require('cheerio');
const express = require('express')
const app = express();

app.get('/1/extract/', function (req, res) {

var url = req.query.url ;

  console.log("Request received for the url :" +url);
  request(url, function (error, response, html) {


    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var ex_title = $('meta[property="og:title"]');
      var ex_url = $('meta[property="og:url"]');
      var ex_description = $('meta[property="og:description"]');
      var ex_image = $('meta[property="og:image"]');

      res_json = {
        original_url:url,
        url:ex_url[ex_url.length-1]['attribs']['content'],
        title:ex_title[ex_title.length-1]['attribs']['content'],
        description:ex_description[ex_description.length-1]['attribs']['content'],
        thumbnail_url:ex_image[ex_image.length-1]['attribs']['content']
      }

      res.json(res_json);
    }


  });







});





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
