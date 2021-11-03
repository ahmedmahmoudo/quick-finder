import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { commands } from '../common/commands';

const Input = styled.input`
  width: 100%;
  height: 80px;
  padding: 0;
  margin: 0;
`;

export const FinderComponent: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const { api } = window as any;
  const handleValueChanged: (e: any) => void = (e) =>
    setInputValue(e.target.value);

  const onKeyDown: (e: any) => void = (e) => {
    if (e.key === 'Enter') {
      for (const command of commands) {
        if (command.name === inputValue) {
          api.send(command.action);
        }
      }
    }
  };

  return (
    <Input
      placeholder="start searching"
      value={inputValue}
      onChange={handleValueChanged}
      onKeyDown={onKeyDown}
    />
  );
};
