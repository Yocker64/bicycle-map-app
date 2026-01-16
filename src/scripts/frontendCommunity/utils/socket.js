// socket.js
import io from 'socket.io-client';

const API_URL = "http://10.40.211.54:5000";

const socket = io(API_URL, {
    transports: ['websocket'],
});

export default socket;