import { getMousePos } from 'robotjs';
import { Readable } from 'stream';

export const getMousePosition = async (): Promise<Readable> => {
    return Readable.from([getMousePos()]);
};
