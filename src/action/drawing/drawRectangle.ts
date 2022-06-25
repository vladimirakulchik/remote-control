import { 
    dragMouse,
    getMousePos,
    mouseToggle,
    setMouseDelay
} from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

const MOUSE_DELAY: number = 200;

export const drawRectangle = async (args: number[]): Promise<void> => {
    if (2 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getVertexes(args[1], args[0]);

    setMouseDelay(MOUSE_DELAY);
    mouseToggle('down');
    points.forEach((point: Point) => {
        dragMouse(point.x, point.y);
    });
    mouseToggle('up');
};

const getVertexes = (length: number, width: number): Point[] => {
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
