import { getMousePos } from 'robotjs';
import { Readable } from 'stream';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';
import { drawByPoints } from './drawByPoints';

export const drawSquare = async (argsStream: Readable): Promise<void> => {
    const args: number[] = argsStream.read();

    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getPoints(args[0]);
    await drawByPoints(Readable.from([points]));
};

const getPoints = (width: number): Point[] => {
    const pointA: Point = getMousePos();
    const pointB: Point = {
        x: pointA.x + width,
        y: pointA.y,
    };
    const pointC: Point = {
        x: pointB.x,
        y: pointB.y + width,
    };
    const pointD: Point = {
        x: pointC.x - width,
        y: pointC.y,
    };

    return [
        pointB,
        pointC,
        pointD,
        pointA,
    ];
};
