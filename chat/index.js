const express = require('express');
const socket = require('socket.io');

// Configuração do servidor
const app = express();
const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Configuração do Socket.io
const io = socket(server);

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Evento para receber mensagens do cliente
  socket.on('chat message', (message) => {
    console.log('Mensagem recebida:', message);

    // Envia a mensagem para todos os clientes conectados
    io.emit('chat message', message);
  });

  // Evento para tratar a desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});
