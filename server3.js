var http = require("http").createServer(handler); //require http server, and create server with function handler()
const { SerialPort, ReadlineParser } = require("serialport");
var fs = require("fs"); //require filesystem module
var io = require("socket.io")(http); //require socket.io module and pass the http object (server)
// importando la función que envia los mensajes a telegram
var {sendMessage} = require("./bot");


http.listen(8080); //listen to port 8080

function handler(req, res) {
  //create server
  fs.readFile(__dirname + "/public/index.html", function (err, data) {
    //read file index.html in public folder
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" }); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" }); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}


const port = new SerialPort({
  path: "/dev/ttyACM0",
  baudRate: 9600,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
//parser.on('data', (data) => {
//    console.log(data)
//})


function takePicture() {
  return new Promise((resolve, reject) => {
    const process = spawn("fswebcam", ["-r", "640x480", "image.jpg"]);
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}


io.sockets.on("connection", function (socket) {
  // WebSocket Connection
  var secs = 0;
  parser.on("data", async (data) => {
    //    secs=data
    //console.log(data);
    process.stdout.write(data + "\r");

    // Toma una foto
    await takePicture();

    sendMessage(data,"image.jpg"); // envia la notificación a telegram
    socket.emit("casa", data); //send button status to client


    //sendMessage("image.jpg");
    //socket.emit("image", "/image.jpg");
  });
});
