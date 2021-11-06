import { ResultInterface } from '../app/common/interfaces';
import child_process from 'child_process';
import { getApplicationsInfo, getApplicationsSrc } from '.';

export class AppLoader {
  private static APP_LIST: ResultInterface[] = [];

  public static loadApps(): void {
    child_process.exec(getApplicationsSrc(), (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stdout.length > 0) {
        const listOfApps = stdout.trim().split('\n');
        this.APP_LIST.push(...getApplicationsInfo(listOfApps));
      }
    });
  }

  public static getApps(appName: string): ResultInterface[] {
    const appsFound: ResultInterface[] = [];
    for (const app of this.APP_LIST) {
      if (app.title.toLowerCase().includes(appName.toLowerCase()))
        appsFound.push(app);
    }
    return appsFound;
  }
}
