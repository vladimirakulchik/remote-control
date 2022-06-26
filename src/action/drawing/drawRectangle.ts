import { getMousePos } from 'robotjs';
import { Readable } from 'stream';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';
import { drawByPoints } from './drawByPoints';

export const drawRectangle = async (argsStream: Readable): Promise<void> => {
    const args: number[] = argsStream.read();

    if (2 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getPoints(args[1], args[0]);
    await drawByPoints(Readable.from([points]));
};

const getPoints = (length: number, width: number): Point[] => {
    const pointA: Point = getMousePos();
    const pointB: Point = {
        x: pointA.x + length,
        y: pointA.y,
    };
    const pointC: Point = {
        x: pointB.x,
        y: pointB.y + width,
    };
    const pointD: Point = {
        x: pointC.x - length,
        y: pointC.y,
    };

    return [
        pointB,
        pointC,
        pointD,
        pointA,
    ];
};
