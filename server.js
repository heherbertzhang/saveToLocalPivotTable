//to run it call "node server.js" on terminal

var http = require('http');
var fs = require('fs');

var jsonHeader = 'Access-Control-Allow-Origin';
var htmlHeader = 'Content-Type: text/html';

//use these regex pattern to analysize the http request
var userPattern = /users\/.*/; // any thing request start with users

function onRequest(req, res){
	//if the http request is get method we start parse it
	if(req.method === 'GET'){
		//analysize the request url
		if(userPattern.test(req.url)){
			// the url is in the format of domain_name/users/username
			//parse the user name
			var temp = req.url.match(/users\/.+/);
			var name = null;
			if(temp != null){
				name = temp[0].match(/\/.+$/);
				name = name[0].substring(1);

			}
			res.writeHead(200, {'Access-Control-Allow-Origin':'*'});
			res.end(getProfileByUserName(name));
		}
	}
}

//Get detailed profile information about a given user (given the user’s
//name).
function getProfileByUserName(name){
	// read the json data file. The file path for example can be ./linda.json
	// which stores info for Linda
	console.log(name);
	var readFile;
	readFile = fs.readFileSync('./'+ name + '.json');
	return readFile;
}

console.log("starting");
var server = http.createServer(onRequest).listen(3000);
