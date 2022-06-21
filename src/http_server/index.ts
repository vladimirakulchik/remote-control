import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { createServer, IncomingMessage, ServerResponse } from 'http';

const BASE_FILE: string = '/front/index.html';
const NOT_FOUND: string = 'Page not found.';

const handleRequest = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    try {
        const filePath: string = getFilePath(request);
        const data: Buffer = await readFile(filePath);

        response.writeHead(200);
        response.end(data);
    } catch (error) {
        response.writeHead(404);
        response.end(JSON.stringify(NOT_FOUND));
    }
}

const getFilePath = (request: IncomingMessage): string => {
    const path: string | undefined = request.url;
    const filename: string = path === '/' ? BASE_FILE : '/front' + path;
    const __dirname: string = resolve(dirname(''));

    return __dirname + filename;
}

export const httpServer = createServer(handleRequest);
