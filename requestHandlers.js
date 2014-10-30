var querystring = require("querystring"),
    fs = require("fs"),
    request = require("request"),
    formidable = require("formidable");
    //JSON = require("JSON");

var url = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1?url=https://boards.4chan.org/a/
var fourChanSenti;
var fCSOb;

	request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
			console.log(body);
			fourChanSenti = body;
			fCSOb = JSON.parse(fourChanSenti);
			console.log(fCSOb.aggregate);
		}
	})

function start(response) {
  console.log("Request handler 'start' was called.");
	
	
	var body = 
	'<div> 4chan/a/\'s overall sentiment about everything is' + 
	JSON.stringify(fCSOb.aggregate) + '</div>' +
	'<div> 4chan was chosen becauses its an easy way of grabbing a lot of sentiment without logging in or anything. ' +
	'The author does not recommend visiting this website.';	
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

/*
function idolCall() {
	request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
			console.log(body);
			fourChanSenti = body;
		}
	})
}
*/

exports.start = start;
//exports.idolCall = idolCall;
