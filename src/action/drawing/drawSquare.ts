import { 
    dragMouse,
    getMousePos,
    mouseToggle,
    setMouseDelay
} from 'robotjs';
import { Point } from '../../DTO/Point';
import { BadRequestError } from '../../error/BadRequestError';

const MOUSE_DELAY: number = 200;

export const drawSquare = async (args: number[]): Promise<void> => {
    if (1 !== args.length) {
        throw new BadRequestError('Invalid arguments.');
    }

    const points: Point[] = getVertexes(args[0]);

    setMouseDelay(MOUSE_DELAY);
    mouseToggle('down');
    points.forEach((point: Point) => {
        dragMouse(point.x, point.y);
    });
    mouseToggle('up');
};

const getVertexes = (width: number): Point[] => {
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
