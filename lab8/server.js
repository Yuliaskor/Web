const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    maxHttpBufferSize: 1e8
});

app.use(express.static(path.join(__dirname+"/public")));

let messagesHistory = [];

function addMessageToHistory(message) {
    const newMessage = {
        username: message.username,
        timestamp: new Date().toLocaleString()
    }
    if ("image" in message) {
        newMessage.type = "image"
        newMessage.image = `data:image/png;base64,${message.image}`
    } else if ("text" in message) {
        newMessage.type = "text"
        newMessage.text = message.text
    }
    messagesHistory.push(newMessage);
    console.log(newMessage);
}

io.on("connection", function(socket) {
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
        messagesHistory.forEach(message => {
            socket.emit("history", message);  
        })
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    socket.on("chat", function(message){
        addMessageToHistory(message);
        socket.broadcast.emit("chat", message);
    });

    socket.on("typing", function(data){
        socket.broadcast.emit("typingResponse", data)
    });

    socket.on("image", function(message) {
        addMessageToHistory(message);
        socket.broadcast.emit("image", message);
    });
})

const port = 5000;
server.listen(5000, () =>
    console.log("server listening on localhost:" + port)
);
