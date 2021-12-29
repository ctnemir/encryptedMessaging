
import spn from "./spn.js";
import sha256 from "js-sha256";
import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import siofu from 'socketio-file-upload';

const app = express(); 
app.use(siofu.router);
const server = createServer(app); 
const io = new Server(server, {
    cors:{
        origin: "*:*"
    }
});
server.listen(3000);



function hash(string,type) {
    // console.log(string);
    if(type == "sha")
    return sha256(string)
    // return createHash('sha256').update(string).digest('hex');
    else if(type == "spn")
    return spn.encrypt(string)
  }
 
  
const users = {}
let datas = ""

io.on('connection', socket=> {
    console.log("new user")

    var uploader = new siofu();
    uploader.dir = "\aupload";
    uploader.listen(socket);

    //socket.emit('chat-message', 'Hello World')
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', data =>{
        socket.broadcast.emit('chat-message',{data :data, name: users[socket.id]})
    })
    socket.on('disconnect-user', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})