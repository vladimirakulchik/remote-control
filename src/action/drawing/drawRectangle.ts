import { getMousePos } from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';
import { drawByPoints } from './drawByPoints';

export const drawRectangle = async (args: number[]): Promise<void> => {
    if (2 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getPoints(args[1], args[0]);
    await drawByPoints(points);
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
