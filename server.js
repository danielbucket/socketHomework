const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const path    = require('path');

const user = { name:'bill' }

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(path(__dirname + '/public/index.html'))
})

io.on('connect', socket => {
  io.emit('join', user)

  socket.on('disconnect', () => {
    io.emit('leave', user)
  })
})

io.on('connection', socket => {
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', msg)
  })
})

io.on('connection', socket => {
  socket.on('typing', user => {
    socket.broadcast.emit('typing', `${user} is typing`)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
