import Jimp from 'jimp';
import { Bitmap, getMousePos, screen as robot } from 'robotjs';
import { Point } from '../../DTO/Point';

const WIDTH: number = 200;

export const getPrintScreen = async (): Promise<string> => {
    const centre: Point = getMousePos();
    const startPoint: Point = {
        x: centre.x - WIDTH / 2,
        y: centre.y - WIDTH / 2,
    };

    const picture: Bitmap = robot.capture(startPoint.x, startPoint.y, WIDTH, WIDTH);
    const image: Jimp = createImageFomBitmap(picture);
    const base64: string = await image.getBase64Async(Jimp.MIME_PNG);

    return removeMimeType(base64);
}

const createImageFomBitmap = (picture: Bitmap): Jimp => {
    const image: Jimp = new Jimp(picture.width, picture.height);
    image.bitmap.data = picture.image;

    // Change BGRA to RGBA. Swap blue and red values.
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        let blue = this.bitmap.data[idx + 2];
        let red = this.bitmap.data[idx + 0];

        let tmp = red;
        red = blue;
        blue = tmp;

        this.bitmap.data[idx + 0] = red;
        this.bitmap.data[idx + 2] = blue;
    });

    return image;
};


const removeMimeType = (base64: string): string => {
    const parts: string[] = base64.split('data:image/png;base64,');

    return parts[1] ?? '';
};
