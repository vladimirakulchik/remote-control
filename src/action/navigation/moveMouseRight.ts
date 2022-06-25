import { getMousePos, moveMouse } from 'robotjs';
import { Readable } from 'stream';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

export const moveMouseRight = async (argsStream: Readable): Promise<Readable> => {
    const args: number[] = argsStream.read();

    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const offset: number = args[0];

    const currentPoint: Point = getMousePos();
    const newPoint: Point = {
        x: currentPoint.x + offset,
        y: currentPoint.y,
    };

    moveMouse(newPoint.x, newPoint.y);

    return Readable.from([newPoint]);
};
