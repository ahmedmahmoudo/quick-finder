import { ResultInterface } from './../app/common/interfaces/result.interface';
import child_process from 'child_process';
import path from 'path';
export const getApplicationsSrc: () => string = () => {
  if (process.platform === 'linux') {
    return `find /usr/share/applications `;
  } else if (process.platform === 'darwin') {
    return `mdfind -onlyin /Applications app`;
  }
  throw new Error('Unknown Platform (Or maybe windows?)');
};

export const getApplicationsInfo: (apps: string[]) => ResultInterface[] = (
  apps: string[]
) => {
  const listOfApps: ResultInterface[] = [];
  try {
    for (const app of apps) {
      if (process.platform === 'linux') {
        const result = child_process.execSync(`cat ${app}`);
        listOfApps.push(readLinuxAppInfoFromString(result.toString()));
      } else if (process.platform === 'darwin') {
        if (isAnApp(app)) {
          const macOsApp = readMacAppInfoFromString(app);
          if (!listOfApps.find((p) => p.title === macOsApp.title))
            listOfApps.push(macOsApp);
        }
      }
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

export const readMacAppInfoFromString: (info: string) => ResultInterface = (
  info
) => {
  const title = info.split('/')[2].replace('.app', '');
  return {
    title,
    description: 'To come soon for macOS',
    exec: `open -a ${info}`,
  };
};

export const isAnApp: (app: string) => boolean = (app) => {
  return path.extname(app) === '.app';
};
