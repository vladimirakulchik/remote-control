import Jimp from 'jimp';
import { Bitmap, getMousePos, screen as robot } from 'robotjs';
import { Readable } from 'stream';
import { Point } from '../../DTO/Point';

const WIDTH: number = 200;

export const getPrintScreen = async (): Promise<Readable> => {
    const centre: Point = getMousePos();
    const startPoint: Point = {
        x: centre.x - WIDTH / 2,
        y: centre.y - WIDTH / 2,
    };

    const picture: Bitmap = robot.capture(startPoint.x, startPoint.y, WIDTH, WIDTH);
    const image: Jimp = createImageFromBitmap(picture);
    const base64: string = await image.getBase64Async(Jimp.MIME_PNG);
    const result: string = removeMimeType(base64);

    return Readable.from([result]);
}

const createImageFromBitmap = (picture: Bitmap): Jimp => {
    const image: Jimp = new Jimp(picture.width, picture.height);
    image.bitmap.data = picture.image;

    // Change BGRA to RGBA in the image.
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const blue: number = this.bitmap.data[idx + 2];
        const red: number = this.bitmap.data[idx + 0];

        // Swap "blue" and "red" values.
        this.bitmap.data[idx + 0] = blue;
        this.bitmap.data[idx + 2] = red;
    });

    return image;
};

const removeMimeType = (base64: string): string => {
    const parts: string[] = base64.split('data:image/png;base64,');

    return parts[1] ?? '';
};
