export class FindApplicationsHelper {
  public static findAppsWithName(name: string): void {
    const { api } = window as any;
    api.send('find-apps', name);
  }
}
