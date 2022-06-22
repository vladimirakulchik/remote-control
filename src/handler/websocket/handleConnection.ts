import { WebSocket } from 'ws';
import { handleCommand } from '../handleCommand';

export const handleConnection = async (socket: WebSocket): Promise<void> => {
    // createWebSocketStream
    // decodeStrings: false

    socket.on('message', async (data: string) => {
        // parse command

        // handle command
        const result = await handleCommand(data);


        // log result

        // send result
        // ws.send('mouse_position 10,10' + '\0');
        socket.send(data + '\0');
    });

    socket.on('close', () => {
        console.log('connection is closed');
    });
};
