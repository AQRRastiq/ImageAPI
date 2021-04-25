const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);
const path = require('path');
var fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const Canvas = require('canvas');
Canvas.registerFont(__dirname + '/fonts/bold.ttf', {
  family: 'Manrope',
  weight: 'bold',
  style: 'normal'
});
const font = "bold 15pt Manrope"

app.get("/api/biden", (req, res) => {
  let msgbiden = req.query.msg;
  let numberidbiden = req.query.id;
  if (!msgbiden) return res.send("Invalid arguments")
  if (!numberidbiden) return res.send("Invalid arguments")
  const bidencanvas = createCanvas(576, 138);
  const bidenctx = bidencanvas.getContext('2d');
  loadImage('images/biden.png').then((image) => {
    bidenctx.drawImage(image, 0, 0, 576, 138)
    bidenctx.font = font;
    bidenctx.fillText(msgbiden, 66, 70);
    
    
    const buffer = bidencanvas.toBuffer('image/png')
    const oldfilepath = `./results/biden/${numberidbiden}`;

    try {
      if (fs.existsSync(oldfilepath)) {
        fs.unlinkSync(oldfilePath);
      }
    } catch(err) {
      console.error(err)
    }
    fs.writeFileSync(`./results/biden/${numberidbiden}.png`, buffer)
    var options = {
        root: path.join(__dirname + "/results/biden/")
    };
      
    var fileName = `${numberidbiden}.png`;
    res.sendFile(fileName, options, function (err) {
    });

  })
})

app.get("/api/macron", (req, res) => {
  let msgmacron = req.query.msg;
  let numberidmacron = req.query.id;
  if (!msgmacron) return res.send("Invalid arguments")
  if (!numberidmacron) return res.send("Invalid arguments")
  const macroncanvas = createCanvas(603, 167);
  const macronctx = macroncanvas.getContext('2d');
  loadImage('images/macron.png').then((image) => {
    macronctx.drawImage(image, 0, 0, 603, 167)
    macronctx.font = font;
    macronctx.fillText(msgmacron, 80, 80);
    
    
    const buffer = macroncanvas.toBuffer('image/png')
    const oldfilepath = `./results/macron/${numberidmacron}`;

    try {
      if (fs.existsSync(oldfilepath)) {
        fs.unlinkSync(oldfilePath);
      }
    } catch(err) {
      console.error(err)
    }
    fs.writeFileSync(`./results/macron/${numberidmacron}.png`, buffer)
    var options = {
        root: path.join(__dirname + "/results/macron/")
    };
      
    var fileName = `${numberidmacron}.png`;
    res.sendFile(fileName, options, function (err) {
    });

  })
})

server.listen(80, function() {
  console.log(`App is enabled !`)
})