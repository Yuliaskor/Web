const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    maxHttpBufferSize: 1e8
});

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket) {
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });

    socket.on("typing", function(data){
        socket.broadcast.emit("typingResponse", data)
    });

    socket.on("image", function(message) {
        socket.broadcast.emit("image", message);
    });
})

const port = 5000;
server.listen(5000, () =>
    console.log("server listening on localhost:" + port)
);
