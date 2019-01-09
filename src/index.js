import express from "express";
import { createServer } from "http";
import socketIo from "socket.io";

const port = process.env.PORT || 3001;
const app = express();

app.get('/', function (req, res) {
    res.send('hello');
  });

const server = createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected");
    socket.on('setScore', data => socket.broadcast.emit('setScore', data));
    socket.on('startTimer', data => socket.broadcast.emit('startTimer', data));
    socket.on('stopTimer', (data) => {
        socket.broadcast.emit('stopTimer', data);
        console.log('received stop event');
    });
    
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));