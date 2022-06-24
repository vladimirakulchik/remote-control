import { 
    getMousePosition, 
    moveMouseDown, 
    moveMouseUp 
} from '../action/navigation/index';
import { Command } from '../DTO/Command';
import { Point } from '../DTO/Point';
import { BadRequestError } from '../error/BadRequestError';
import { logCommand, logCommandResult } from '../logger/index';

export const handleCommand = async (command: Command): Promise<string> => {
    logCommand(command);
    let result = '';
    let point: Point;

    switch (command.name) {
        case 'mouse_position':
            point = await getMousePosition();
            result = `${point.x},${point.y}`;
            logCommandResult(result);
            break;
        case 'mouse_up':
            point = await moveMouseUp(command.args);
            logCommandResult(`${point.x} ${point.y}`);
            break;
        case 'mouse_down':
            point = await moveMouseDown(command.args);
            logCommandResult(`${point.x} ${point.y}`);
            break;
        // case 'mouse_left':
        //     break;
        // case 'mouse_right':
        //     break;
        default:
            throw new BadRequestError('Unsupported command.');
    }

    return result;
};
