import { FunctionComponent, useEffect, useState } from 'react';
import { ResultInterface } from '../common/interfaces';
import { FinderComponent } from '../finder';
import {
  FindCommandHelper,
  FindApplicationsHelper,
  getTypeOfChoice,
} from '../helpers';
import { ResultListComponent } from '../result-list';

export const MainComponent: FunctionComponent = () => {
  const [commandsList, setCommandsList] = useState<ResultInterface[]>([]);
  const [appsList, setAppsList] = useState<ResultInterface[]>([]);
  const { api } = window as any;

  const onSearch = (value: string) => {
    if (!value) {
      setCommandsList([]);
      setAppsList([]);
      return;
    }
    const listOfCommands = FindCommandHelper.findCommands(value);
    FindApplicationsHelper.findAppsWithName(value);
    setCommandsList(listOfCommands);
  };

  const onAppsResult = (listOfApps: ResultInterface[]) => {
    console.log('apps event', listOfApps);
    setAppsList(listOfApps);
  };

  useEffect(() => {
    api.subscribe('apps-found', onAppsResult);
  }, []);

  useEffect(() => {
    if (commandsList.length > 0 || appsList.length > 0) {
      api.toggleWidth(true);
    } else {
      api.toggleWidth(false);
    }
  }, [commandsList, appsList]);

  const onEnterPressed: (choice: ResultInterface) => void = (choice) => {
    const type = getTypeOfChoice(choice);
    if (type === 'command') {
      api.send(choice.exec);
    } else {
      api.send('open-app', choice.exec);
    }
  };

  return (
    <div>
      <FinderComponent onSearch={onSearch} api={api} />
      <ResultListComponent
        resultsList={[...commandsList, ...appsList]}
        onEnterPressed={onEnterPressed}
      />
    </div>
  );
};
