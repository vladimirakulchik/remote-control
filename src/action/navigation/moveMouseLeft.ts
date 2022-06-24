import { getMousePos, moveMouse } from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

export const moveMouseLeft = async (args: number[]): Promise<Point> => {
    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const offset: number = args[0];

    const currentPoint: Point = getMousePos();
    const newPoint: Point = {
        x: currentPoint.x - offset,
        y: currentPoint.y
    };

    moveMouse(newPoint.x, newPoint.y);

    return newPoint;
};
