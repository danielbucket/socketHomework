const socket = io()

$('form').submit( () => {
  socket.emit('chat message', $('#m').val())
  $('#m').val('')
  return false
})

$('#m').on('keyup', e => {
  socket.emit('typing', e.target.name)
})

socket.on('typing', msg => {
  $('#m').prop('placeholder', msg)
})

socket.on('chat message', msg => {
  $('#m').prop('placeholder', '')
  $('#messages').append($('<li>').text(msg))
})

socket.on('disconnect', msg => {
  $('#messages').append($('<li>').text(msg))
})

socket.on('join', member => {
  $('#messages').append($('<li>').text(`${member.name} has joined the conversation`))
})

socket.on('leave', member => {
  $('#messages').append($('<li>').text(`${member.name} has left the conversation`))
})
