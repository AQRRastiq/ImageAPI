const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);
const path = require('path');
var fs = require('fs');

app.get("/api/biden", (req, res) => {
  let msg = req.query.msg;
  let numberid = req.query.id;
  if (!msg) return res.send("Invalid arguments")
  if (!numberid) return res.send("Invalid arguments")
  const { createCanvas, loadImage } = require('canvas');
  const Canvas = require('canvas');
  const canvas = createCanvas(576, 138);
  const ctx = canvas.getContext('2d');
  loadImage('images/biden.png').then((image) => {
    Canvas.registerFont(__dirname + '/fonts/bold.ttf', {
      family: 'Manrope',
      weight: 'bold',
      style: 'normal'
    });
    ctx.drawImage(image, 0, 0, 576, 138)
    ctx.font = 'bold 15pt Manrope';
    ctx.fillText(msg, 66, 70);
    
    
    const buffer = canvas.toBuffer('image/png')
    const oldfilepath = `./results/${numberid}`;

    try {
      if (fs.existsSync(oldfilepath)) {
        fs.unlinkSync(oldfilePath);
      }
    } catch(err) {
      console.error(err)
    }
    fs.writeFileSync(`./results/${numberid}.png`, buffer)
    var options = {
        root: path.join(__dirname + "/results/")
    };
      
    var fileName = `${numberid}.png`;
    res.sendFile(fileName, options, function (err) {
    });

  })
})

server.listen(80, function() {
  console.log(`App is enabled !`)
})