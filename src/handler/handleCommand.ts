import { Readable } from 'stream';
import { 
    drawCircle,
    drawRectangle,
    drawSquare
} from '../action/drawing';
import { 
    getMousePosition, 
    moveMouseDown, 
    moveMouseLeft, 
    moveMouseRight, 
    moveMouseUp 
} from '../action/navigation/index';
import { getPrintScreen } from '../action/printscreen/getPrintScreen';
import { Command } from '../DTO/Command';
import { Point } from '../DTO/Point';
import { BadRequestError } from '../error/BadRequestError';
import { logCommand, logCommandResult } from '../logger/index';

export const handleCommand = async (commandStream: Readable): Promise<Readable> => {
    const command: Command = commandStream.read();
    logCommand(command);

    let point: Point;
    let result: string = '';
    const argsStream: Readable = Readable.from([command.args]);

    switch (command.name) {
        case 'mouse_position':
            point = (await getMousePosition()).read();
            result = `${point.x},${point.y}`;
            logCommandResult(result);
            break;
        case 'mouse_up':
            point = (await moveMouseUp(argsStream)).read();
            logCommandResult(`${point.x} ${point.y}`);
            break;
        case 'mouse_down':
            point = (await moveMouseDown(argsStream)).read();
            logCommandResult(`${point.x} ${point.y}`);
            break;
        case 'mouse_left':
            point = (await moveMouseLeft(argsStream)).read();
            logCommandResult(`${point.x} ${point.y}`);
            break;
        case 'mouse_right':
            point = (await moveMouseRight(argsStream)).read();
            logCommandResult(`${point.x} ${point.y}`);
            break;
        case 'draw_square':
            await drawSquare(argsStream);
            logCommandResult('success');
            break;
        case 'draw_rectangle':
            await drawRectangle(argsStream);
            logCommandResult('success');
            break;
        case 'draw_circle':
            await drawCircle(argsStream);
            logCommandResult('success');
            break;
        case 'prnt_scrn':
            result = (await getPrintScreen()).read();
            logCommandResult('success');
            break;
        default:
            throw new BadRequestError('Unsupported command.');
    }

    return Readable.from([result]);
};
