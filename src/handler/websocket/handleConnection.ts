import { createWebSocketStream, WebSocket } from 'ws';
import { BadRequestError } from '../../error/BadRequestError';
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
        try {
            const command = parseCommand(data);
            const result = await handleCommand(command);

            const message: string = result 
                ? `${command.name} ${result}\0`
                : `${command.name}\0`;
            wsStream.write(message);
        } catch (error) {
            if (error instanceof BadRequestError) {
                console.error(error.message);
            }

            console.error('Unexpected error.');
        }
    });

    socket.on('close', () => {
        console.log('connection is closed');
    });
};
