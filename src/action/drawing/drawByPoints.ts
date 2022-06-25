import { dragMouse, mouseToggle, setMouseDelay } from 'robotjs';
import { Point } from '../../DTO/Point';

const MOUSE_DELAY_DEFAULT: number = 10;
const MOUSE_DELAY: number = 200;

export const drawByPoints = async (
    points: Point[],
    useDelay: boolean = true
): Promise<void> => {
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
