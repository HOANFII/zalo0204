import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8888');
function subscribeToTimer(cb) {
  socket.emit('subscribeToTimer', cb);
}
export { subscribeToTimer };