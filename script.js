const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt("What's your name?")
const encryptType = document.querySelector('input[name="customRadioInline"]:checked').value

appendMessage('You Joined.',2)
console.log(encryptType)
socket.emit('new-user', name)

socket.on('chat-message', data=> {
    appendMessage(data.name +": "+ data.message , 1)
})

socket.on('user-connected', name=> {
    appendMessage(name+ 'connected',2)
})

socket.on('user-disconnected', name=> {
    appendMessage(name+ 'disconnected',2)
})

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage('You: '+ message,3)
    data = {
        content: message,
        encrypt: document.querySelector('input[name="customRadioInline"]:checked').value
    }
    socket.emit('send-chat-message', JSON.stringify(data))
    messageInput.value = ''
})

function appendMessage(message,align){
    const messageElement = document.createElement('div')
    messageElement.classList.add("card")
    messageElement.classList.add("my-3")
    messageElement.classList.add("w-50")
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    cardBody.classList.add("p-2")
    cardBody.innerText = message
    messageElement.append(cardBody)
    const cardContainer = document.createElement("div")
    cardContainer.classList.add("d-flex")
    cardContainer.classList.add("flex-row")
    cardContainer.classList.add("w-100")
    var bg = "white";
    if(align == 1){
        align = "justify-content-start"
        bg = "bg-secondary"
    }
    else if(align == 2){
        align = "justify-content-center"
        bg = "bg-success"
    }
    else if(align == 3) {
        align = "justify-content-end"
        bg = "bg-primary"
    }
    else {
        align = "justify-content-start"
        bg = "bg-secondary"
    }
    cardContainer.classList.add(align)
    messageElement.classList.add(bg)
    messageElement.classList.add("text-white")
    cardContainer.append(messageElement)
    messageContainer.append(cardContainer)
    messageContainer.scrollTop = messageContainer.scrollHeight
}