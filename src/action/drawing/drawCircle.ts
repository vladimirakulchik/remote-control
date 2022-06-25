import { 
    dragMouse,
    getMousePos,
    mouseToggle
} from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

export const drawCircle = async (args: number[]): Promise<void> => {
    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getPoints(args[0]);

    mouseToggle('down');
    points.forEach((point: Point) => {
        dragMouse(point.x, point.y);
    });
    mouseToggle('up');
};

const getPoints = (radius: number): Point[] => {
    const points: Point[] = [];

    const pointA: Point = getMousePos();
    const centre: Point = {
        x: pointA.x + radius,
        y: pointA.y,
    };
    const pointB: Point = {
        x: centre.x + radius,
        y: centre.y,
    }

    for (let x = pointA.x; x <= pointB.x; x += 1) {
        const y = centre.y - Math.sqrt(radius ** 2 - (x - centre.x) ** 2);
        points.push({ x, y });
    }

    for (let x = pointB.x; x >= pointA.x; x -= 1) {
        const y = centre.y + Math.sqrt(radius ** 2 - (x - centre.x) ** 2);
        points.push({ x, y });
    }

    return points;
};
