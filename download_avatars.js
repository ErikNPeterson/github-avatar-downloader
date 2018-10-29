var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, arrayOfUsers) {
  console.log("Errors:", err);
  arrayOfUsers.forEach((element, index) => {
    console.log(`Avatar URL at index ${index}`,element.avatar_url);
  });

});
  
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {

  request.get(url)     
  .on('error', function (err) {                                  
    throw err; 
  })
  .on('response', function (response) {                         
    console.log('Response Status Code: ', response.statusCode);
    console.log(response.statusMessage) 
    console.log('Downloading image...');
    console.log(response.headers['content-type']); // we use bracket notation because there is a "-" in the property/key
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function() {
   console.log('Download complete.')
   console.log('Response stream complete.');
 });
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")



  // function to parse the JSON string into an object and pass this object 
  // (an array of contributor objects) to the cb function.

  // WHERE IS OUR CALLBACK FUNCTION???

