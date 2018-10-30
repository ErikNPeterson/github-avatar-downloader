var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
 
var terminalInput = process.argv.slice(2) 

if (terminalInput.length !== 2) {
  throw new Error ("You have input less or more than 2 arguments")
} else {

console.log('Welcome to the GitHub Avatar Downloader!');

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
    console.log(response.headers['content-type']); 
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function() {
   console.log('Download complete.')
   console.log('Response stream complete.');
 });
}

getRepoContributors(terminalInput[0], terminalInput[1], function(err, arrayOfUsers) {
  console.log("Errors:", err);
  arrayOfUsers.forEach((element) => {
    downloadImageByURL(element.avatar_url, `avatars/${element.login}.jpg`);
  });

});
}

// you can run from ``node download_avatars.js "jquery" "jquery"`` from  terminal 


//learnings: we use bracket notation because there is a "-" in the property/key
//learnings : you can use ```throw new Error``` to create a new error.