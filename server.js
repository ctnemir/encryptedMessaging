const io = require('socket.io')(3000)
const spn = require("./spn")
// const { createHash } = require('crypto');
var sha256 = require('js-sha256');
function hash(string,type) {
    console.log(string);
    if(type == "sha")
    return sha256(string)
    // return createHash('sha256').update(string).digest('hex');
    else if(type == "spn")
    return spn.encrypt(string)
  }

//   console.log(hash("alo","sha"))

  console.log(spn.decrypt("00101110011011111110111001010001"))
  
  
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
        data=JSON.parse(data);
        socket.broadcast.emit('chat-message',{message: hash(data.content,data.encrypt), name: users[socket.id]})
    })
    socket.on('disconnect-user', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})