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
        timestamp: new Date().toLocaleString(),
        room: message.room
    }
    if ("image" in message) {
        newMessage.type = "image"
        newMessage.image = `data:image/png;base64,${message.image}`
    } else if ("text" in message) {
        newMessage.type = "text"
        newMessage.text = message.text
    }
    messagesHistory.push(newMessage);
}

io.on("connection", function(socket) {
    socket.on("newuser", function(user){
        socket.join(user.room);
        socket.to(user.room).emit("update", user.username + " joined the conversation");
        messagesHistory
            .filter(message => message.room == user.room)
            .forEach(message => {
                socket.emit("history", message);  
            })
    });

    socket.on("exituser", function(user){
        socket.to(user.room).emit("update", user.username + " left the conversation");
    });

    socket.on("chat", function(message) {
        addMessageToHistory(message);
        socket.to(message.room).emit("chat", message);
    });

    socket.on("typing", function(data){
        socket.to(data.room).emit("typingResponse", data.username)
    });

    socket.on("image", function(message) {
        addMessageToHistory(message);
        socket.to(message.room).emit("image", message);
    });
})

const port = 5000;
server.listen(5000, () =>
    console.log("server listening on localhost:" + port)
);
