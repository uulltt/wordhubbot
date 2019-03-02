var Twitter = require('twitter');

var tweeter = new Twitter({
		consumer_key: process.env.api_key,
		consumer_secret: process.env.secret_key,
		access_token_key: process.env.access_token,
		access_token_secret: process.env.access_token_secret
	});
var Canvas = require('canvas');
var fs = require('fs');
var Image = Canvas.Image;
var Font = Canvas.Font;
var words = fs.readFileSync('./words_alpha.txt').toString().split('\n');
var index = 0;
	
	console.log("WE ARE LIVE");
setInterval(hub, 1000*60);



function hub(){
	console.log("NEXT WORD");
	var word = words[index].charAt(0).toString().toUpperCase() + words[index].substring(1);
		var textCanvas = new Canvas.createCanvas(1280, 450);	
			var ctx = textCanvas.getContext("2d");
			ctx.font = "700 240px Verdana";
			textCanvas.width = 1280 + Math.max((ctx.measureText(word).width - 640), 0);
			ctx = textCanvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.rect(0, 0, textCanvas.width, 450);
			ctx.fill();
			ctx.fillStyle = "#F7971D"
			roundRect(ctx, (textCanvas.width - 580), 80, 520, 320, 35, true);
			ctx.fillStyle = "black";
			
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText('hub', textCanvas.width - 320, 240);
			ctx.fillStyle = "white";
			ctx.textAlign = "right";
			ctx.fillText(word, textCanvas.width - 610, 240);
	tweeter.post('media/upload/', {media : textCanvas.toBuffer()}, function(err, data, response){
	var id = data.media_id_string;
	console.log("Error: " + err);
	console.log("Data: " + data);
	console.log("Response: " + response);
		tweeter.post('statuses/updates/', {status: word + 'hub', mediaIds: [id]}, function(err2, data2, response2){
		console.log(data2);
		});
		index++;
	});
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}