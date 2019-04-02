const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (data) => {
    console.log('username:', data.username);
    console.log('password:', data.password);
  });
});

const port = 8888;
io.listen(port);
console.log('listening on port ', port);