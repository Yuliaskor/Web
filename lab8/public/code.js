(function(){

    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    let userRoom;
    let isTyping = false;

    app.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        let room = app.querySelector(".join-screen #chatroom-select").value;
        if (username === "") {
            return;
        }
        socket.emit("newuser", {
            room: room,
            username: username
        });
        uname = username;
        userRoom = room;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
        app.querySelector(".chat-screen .header .logo").innerHTML = "Chatroom " + room
    });

    app.querySelector(".chat-screen #message-input").addEventListener("input", function(){
        socket.emit("typing", {
            username: uname,
            room: userRoom
        });
    });
    
    app.querySelector(".chat-screen #send-message").addEventListener("click", function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message === "" || username === "") {
            return;
        }

        renderMessage("my", {
            username: uname,
            text: message
        });
        
        socket.emit("chat", {
            username: uname,
            text: message,
            room: userRoom
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #image-file").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!/^image\//.test(file.type)) {
            app.querySelector(".chat-screen #image-file").value = null;
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

            socket.emit("image", {
                username: uname,
                image: base64String,
                room: userRoom
            });

            renderImage("my", {
                username: uname,
                image: reader.result
            });
        };
        app.querySelector(".chat-screen #image-file").value = null;
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function(){
        socket.emit("exituser", {
            username: uname,
            room: userRoom
        });
        window.location.href = window.location.href;
    })

    socket.on("update", function(update) {
        renderMessage("update", update);
    })

    socket.on("chat", function(message) {
        renderMessage("other", message);
    })

    socket.on("typingResponse", function(username) {
        let typingEl = app.querySelector(".chat-screen .typing");
        typingEl.innerText = username + " is typing...";
        typingEl.style.display = "block";
        setTimeout(function(){
            typingEl.style.display = "none";
        }, 2000);
    });

    socket.on("image", function(message) {
        renderImage("other", {
            username: message.username,
            image: `data:image/png;base64,${message.image}`
        });
    })

    
    socket.on("history", function(message) {
        if (message.type == "text") {
            if (message.username == uname) {
                renderMessage("my", message);
            } else {
                renderMessage("other", message);
            }
        } else if (message.type == "image") {
            if (message.username == uname) {
                renderImage("my", message);
            } else {
                renderImage("other", message);
            }
        }
    })

    function renderMessage(type, message){
        console.log(message);
        let messageContainer = app.querySelector(".chat-screen .messages");
        let typingDiv = app.querySelector(".typing");
        let el;
        let time = new Date().toLocaleString()
        if (type != "update" && "timestamp" in message) {
            time = message.timestamp
        }
        if(type=="my") {
            el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
            <div>
                <div class="name">You</div>
                <div class="text">${message.text}</div>
                <div class="time">${time}</div>
            </div>
            `;
        } else if (type == "other") {
            el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
            <div>
                <div class="name">${message.username}</div>
                <div class="text">${message.text}</div>
                <div class="time">${time}</div>
            </div>
            `;
        } else if (type == "update" ) {
            el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
        }
        messageContainer.insertBefore(el, typingDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    function renderImage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        let typingDiv = app.querySelector(".typing");
        let div;
        let name;
        let time = new Date().toLocaleString()
        if ("timestamp" in message) {
            time = message.timestamp
        }
        if(type=="my") {
            div = document.createElement("div");
            div.setAttribute("class", "message my-message");
            name = "You";
        } else if (type == "other") {
            div = document.createElement("div");
            div.setAttribute("class", "message other-message");
            name = message.username;
        }
        div.innerHTML = `
            <div>
                <div class="name">${name}</div>
                <img src="${message.image}"/>
                <div class="time">${time}</div>
            </div>
            `;
        messageContainer.insertBefore(div, typingDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

})();