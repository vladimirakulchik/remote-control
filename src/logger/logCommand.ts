import { Command } from '../DTO/Command';

export const logCommand = (command: Command): void => {
    console.log(`Received: ${command.name} ${command.args.join(' ')}`)
};
