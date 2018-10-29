var request = require('request');
var secrets = require('./secrets.js');

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

  // function to parse the JSON string into an object and pass this object 
  // (an array of contributor objects) to the cb function.

  // WHERE IS OUR CALLBACK FUNCTION???

