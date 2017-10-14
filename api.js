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

      var ex_title = $('meta[property="og:title"]')[0]['attribs']['content'];
      var ex_url = $('meta[property="og:url"]')[0]['attribs']['content'];
      var ex_description = $('meta[property="og:description"]')[0]['attribs']['content'];
      var ex_image = $('meta[property="og:image"]')[0]['attribs']['content'];

      res_json = {
        original_url:url,
        url:ex_url,
        title:ex_title,
        description:ex_description,
        thumbnail_url:ex_image
      }

      res.json(res_json);
    }


  });







});





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
