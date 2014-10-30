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
	
	
	var body = '<form class="js-autoSubmit" method="GET"' + 
	'enctype="multipart/form-data"' +
	'action=idolCall' +//"https://api.idolondemand.com/1/api/async/analyzesentiment/v1" ' +
	//'target="_blank">' +
	'<fieldset><h5></h5><div class="source-param-box"></div>' +
	'<input type="submit" value="submit"></input>' +
	//'name="apikey"></input>' +
	//'<input value="https://boards.4chan.org/a/" ' +
	//'name="url"></input>' +
	'</fieldset>' +
	JSON.stringify(fCSOb.aggregate) +
	'</form>';
	
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function idolCall() {
	request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
			console.log(body);
			fourChanSenti = body;
		}
	})
}

exports.start = start;
exports.idolCall = idolCall;
