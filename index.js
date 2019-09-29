const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);

//files static
app.use(express.static(path.join(__dirname,'public')));

//start server
const server = app.listen(app.get('port'),()=>{
  console.log('Server in port', app.get('port'));
});
//websockets
const io = socketIO(server)

io.on('connection', (socket)=>{
  console.log('New conecction',socket.id);
  socket.on('chat:message',(datos)=>{
    io.sockets.emit('chat:message',datos);
  });

  socket.on('chat:typing',(username)=>{
    socket.broadcast.emit('chat:typing',username);
  });
});
