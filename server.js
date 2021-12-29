
import spn from "./spn.js";
import sha256 from "js-sha256";
import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
    cors:{
        origin: "*:*"
    }
});
server.listen(3000);


// const { createHash } = require('crypto');
function hash(string,type) {
    // console.log(string);
    if(type == "sha")
    return sha256(string)
    // return createHash('sha256').update(string).digest('hex');
    else if(type == "spn")
    return spn.encrypt(string)
  }

//   console.log(hash("alo","sha"))
//   console.log(spn.encrypt("emir"));
//   console.log(spn.decrypt("00101110011011111110111001010001"))
  
  
const users = {}
let datas = ""

io.on('connection', socket=> {
    console.log("new user")
    //socket.emit('chat-message', 'Hello World')
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', data =>{
        // data=JSON.parse(data);
        // socket.broadcast.emit('chat-message',{message: hash(data.content,data.encrypt), name: users[socket.id]})
        socket.broadcast.emit('chat-message',{data :data, name: users[socket.id]})
    })
    socket.on('disconnect-user', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})