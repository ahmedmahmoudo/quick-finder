import { commands } from './../common/commands/index';
import { ResultInterface } from '../common/interfaces';

export const getTypeOfChoice: (choice: ResultInterface) => 'command' | 'app' = (
  choice
) => {
  for (const command of commands) {
    if (command.name === choice.title) {
      return 'command';
    }
  }

  return 'app';
};
