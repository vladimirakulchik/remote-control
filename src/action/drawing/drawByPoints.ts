import { dragMouse, mouseToggle, setMouseDelay } from 'robotjs';
import { Readable } from 'stream';
import { Point } from '../../DTO/Point';

const MOUSE_DELAY_DEFAULT: number = 10;
const MOUSE_DELAY: number = 200;

export const drawByPoints = async (
    pointsStream: Readable,
    useDelay: boolean = true
): Promise<void> => {
    const points: Point[] = pointsStream.read();

    if (useDelay) {
        setMouseDelay(MOUSE_DELAY);
    } else {
        setMouseDelay(MOUSE_DELAY_DEFAULT);
    }

    mouseToggle('down');
    points.forEach((point: Point) => {
        dragMouse(point.x, point.y);
    });
    mouseToggle('up');
    setMouseDelay(MOUSE_DELAY_DEFAULT);
};
