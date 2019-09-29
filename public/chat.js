const socket = io();
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',()=>{
  socket.emit('chat:message',{
    username:username.value,
    message:message.value
  });
  console.log();
});
message.addEventListener('keypress',()=>{
  socket.emit('chat:typing',username.value);
});
socket.on('chat:message',(datos)=>{
  actions.innerHTML = '';
  output.innerHTML += `<p><strong>${datos.username}</strong>:${datos.message}</p>`;
});
socket.on('chat:typing',(datos)=>{
  actions.innerHTML = `<p><em>${datos} is typing a message</em></p>`;
});
