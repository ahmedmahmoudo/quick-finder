import { FunctionComponent, useEffect, useState } from 'react';
import { FOCUS_ENUM } from '../common/enums';
import { ResultInterface } from '../common/interfaces';
import { FinderComponent } from '../finder';
import { FindCommandHelper, FindApplicationsHelper } from '../helpers';
import { ResultListComponent } from '../result-list';

export const MainComponent: FunctionComponent = () => {
  const [commandsList, setCommandsList] = useState<ResultInterface[]>([]);
  const [appsList, setAppsList] = useState<ResultInterface[]>([]);
  const [currentFocus, setCurrentFocus] = useState<FOCUS_ENUM>(
    FOCUS_ENUM.InputField
  );
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
  return (
    <div>
      <FinderComponent
        onSearch={onSearch}
        api={api}
        focused={currentFocus === FOCUS_ENUM.InputField}
        onChangeFocus={() => setCurrentFocus(FOCUS_ENUM.ResultList)}
      />
      <ResultListComponent
        resultsList={[...commandsList, ...appsList]}
        onEnterPressed={() => console.log('pressed')}
      />
    </div>
  );
};
