import { ResultInterface } from './../app/common/interfaces/result.interface';
import child_process from 'child_process';

export const getApplicationsSrc: () => string = () => {
  if (process.platform === 'linux') {
    return '/usr/share/applications';
  } else if (process.platform === 'darwin') {
    throw new Error('Not implemented yet');
  }
  throw new Error('Unknown Platform (Or maybe windows?)');
};

export const getApplicationsInfo: (apps: string[]) => ResultInterface[] = (
  apps: string[]
) => {
  const listOfApps: ResultInterface[] = [];
  try {
    for (const app of apps) {
      const result = child_process.execSync(`cat ${app}`);
      listOfApps.push(readLinuxAppInfoFromString(result.toString()));
    }
  } catch (e) {
    console.log(e);
  }
  return listOfApps;
};

export const readLinuxAppInfoFromString: (info: string) => ResultInterface = (
  info
) => {
  const attributes = info.split('\n');
  let title: string;
  let description: string;
  let exec: string;
  for (const attribute of attributes) {
    const fields = attribute.split('=');
    if (fields.length > 0) {
      if (fields[0].toLocaleLowerCase() === 'name' && !title) {
        title = fields[1];
      } else if (fields[0].toLocaleLowerCase() === 'comment' && !description) {
        description = fields[1];
      } else if (fields[0].toLocaleLowerCase() === 'exec' && !exec) {
        exec = fields[1];
      }
    }
  }

  return { title, description, exec };
};
