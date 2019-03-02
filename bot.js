var Twitter = require('twitter');

var tweeter = new Twitter({
		consumer_key: process.env.api_key,
		consumer_secret: process.env.secret_key,
		access_token_key: process.env.access_token,
		access_token_secret: process.env.access_token_secret
	});
	
var fs = require('fs');
	
setInterval(hub, 1000*60*60);

var words = fs.readFileSync('./words_alpha.txt').toString().split('\n');

function hub(){
	var canvas;
	tweeter.post('media/upload/', {media : canvas.toBuffer()}, function(err, data, response){
		
		
	});
}