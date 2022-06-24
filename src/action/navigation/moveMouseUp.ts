import { getMousePos, moveMouse, setMouseDelay } from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

export const moveMouseUp = async (args: number[]): Promise<Point> => {
    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    // setMouseDelay(200);

    const offset: number = args[0];

    const currentPoint: Point = getMousePos();
    const newPoint: Point = {
        x: currentPoint.x, 
        y: currentPoint.y - offset
    };

    moveMouse(newPoint.x, newPoint.y);

    return newPoint;
};
