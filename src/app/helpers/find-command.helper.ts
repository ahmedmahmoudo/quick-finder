import { ResultInterface } from './../common/interfaces/result.interface';
import { commands } from '../common/commands';

export class FindCommandHelper {
  public static findCommands(value: string): ResultInterface[] {
    if (!value) return [];
    const listOfCommands = [];
    for (const command of commands) {
      if (command.name.includes(value.toLocaleLowerCase())) {
        listOfCommands.push({
          title: command.name,
          description: command.description,
          exec: command.action,
        });
      }
    }
    return listOfCommands;
  }
}
