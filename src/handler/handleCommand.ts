import { Command } from '../DTO/Command';
import { logCommand } from '../logger/index';

export const handleCommand = async (command: Command): Promise<string> => {
    logCommand(command);

    // validate command, create array

    // switch action
    // perform action

    // log result
    console.log('result: ');

    return '';
};
