import { createWebSocketStream, WebSocket } from 'ws';
import { parseCommand } from '../../parser/parseCommand';
import { handleCommand } from '../handleCommand';

export const handleConnection = async (socket: WebSocket): Promise<void> => {
    const wsStream = createWebSocketStream(
        socket, 
        {
            encoding: 'utf8',
            decodeStrings: false
        }
    );

    wsStream.on('data', async (data: string): Promise<void> => {
        const command = parseCommand(data);
        const result = await handleCommand(command);

        const message: string = result 
            ? `${command.name} ${result}\0`
            : `${command.name}\0`;
        wsStream.write(message);
    });

    socket.on('close', () => {
        console.log('connection is closed');
    });
};
