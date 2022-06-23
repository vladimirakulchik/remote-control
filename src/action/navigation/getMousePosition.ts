import { getMousePos } from 'robotjs';
import { Point } from '../../DTO/Point';

export const getMousePosition = async (): Promise<Point> => {
    return getMousePos();
};
