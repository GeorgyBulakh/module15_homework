const chatMessages = document.querySelector('.chat-messages')
const messageInput = document.getElementById('message-input')
const btnSubmit = document.querySelector('.btn-submit')
const btnLocation = document.querySelector('.btn-location')

const ws = new WebSocket('wss://echo-ws-service.herokuapp.com')

ws.onmessage = function(event) {
  appendMessage(event.data)
}

btnSubmit.addEventListener('click', sendMessage)
btnLocation.addEventListener('click', sendLocation)

function sendMessage() {
  const message = messageInput.value

  ws.send(message)
  appendMessage(message)
  messageInput.value = ''
}

function sendLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      appendMessage(`<a href="https://www.openstreetmap.org/#map=15/${latitude}/${longitude}" target="_blank">My location</a>`)
    })
  } else {
    alert('Location is unavailable')
  }
}

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerHTML = message
  chatMessages.appendChild(messageElement)
}