import { CommandInterface } from './../interfaces';
export const commands: CommandInterface[] = [
  {
    name: 'quit',
    action: 'quit-app',
    description: 'quits the app',
  },
  {
    name: 'reload apps',
    action: 'reload-apps',
    description: 'reload list of applications',
  },
];
