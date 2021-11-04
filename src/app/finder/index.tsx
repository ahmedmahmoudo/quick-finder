import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { commands } from '../common/commands';

const Input = styled.input`
  width: 99%;
  height: 55px;
  background-color: transparent;
  color: white;
  border: 0;
  &:focus,
  &:active {
    border: 0;
    outline: none;
  }
  font-size: 18px;
  padding-left: 4px;
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
    padding-left: 4px;
  }
`;

interface FinderComponentState {
  onSearch: (value: string) => void;
  api: any;
  focused?: boolean;
  onChangeFocus?: () => void;
}

export const FinderComponent: FunctionComponent<FinderComponentState> = ({
  onSearch,
  api,
  focused,
  onChangeFocus,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const handleValueChanged: (e: any) => void = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const onKeyDown: (e: any) => void = (e) => {
    if (e.key === 'Enter') {
      for (const command of commands) {
        if (command.name === inputValue) {
          api.send(command.action);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (onChangeFocus) {
        onChangeFocus();
      }
    }
  };

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [focused]);

  return (
    <Input
      placeholder="start searching"
      value={inputValue}
      onChange={handleValueChanged}
      onKeyDown={onKeyDown}
      ref={inputRef}
    />
  );
};
