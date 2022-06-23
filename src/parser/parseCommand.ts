import { Command } from '../DTO/Command';

export const parseCommand = (data: string): Command => {
    let parts: string[] = data.split(' ');
    const commandName: string = parts.shift() ?? '';
    const args: number[] = parts.map((argument => +argument));

    return {
        name: commandName,
        args: args
    };
};
