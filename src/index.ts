import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { handleConnection } from './handler/websocket/handleConnection';
import { httpServer } from './http_server/index';

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT 
    ? +process.env.WEBSOCKET_PORT 
    : 8080;

console.log(`Start static HTTP server on the ${HTTP_PORT} port.`);
httpServer.listen(HTTP_PORT);

console.log(`Start websocket server on the ${WEBSOCKET_PORT} port.`);
const wss: WebSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
wss.on('connection', handleConnection);

process.on('SIGINT', () => {
    httpServer.close();
    wss.clients.forEach((socket) => {
        socket.close();

        process.nextTick(() => {
            if (
                socket.readyState === socket.OPEN 
                || socket.readyState === socket.CLOSING
            ) {
                socket.terminate();
            }
        });
    });
    wss.close();
});
