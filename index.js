const express =  require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server)
let port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => { // listen on the connection event for incoming sockets and log it to the console.
    console.log("a user connected")
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // to SEND an event to everyone, Socket.IO gives us the io.emit() method.
      });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})
server.listen(port, ()=>{
    console.log("server listening on port 3000")
})
