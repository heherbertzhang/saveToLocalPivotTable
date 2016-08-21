//to run it call "node server.js" on terminal

var http = require('http');
var fs = require('fs');

var jsonHeader = 'Content-Type: application/json';
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
			res.writeHead(200, jsonHeader);
			res.end(getProfileByUserName(name));
		}
	}
}

//Get detailed profile information about a given user (given the user’s
//name).
function getProfileByUserName(name){
	// read the json data file. The file path for example can be ./linda.json
	// which stores info for Linda
	var readFile;
	fs.readFile('./'+ name+ '.json', function(err, data){
		if(err){
			readFile = 'error reading json file: ' + JSON.stringify(err, null, 4);
		}
		else{
			readFile = data;
		}
		return;
	});
	return readFile;
}


var server = http.createServer(onRequest).listen(3000);
