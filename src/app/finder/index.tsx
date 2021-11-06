import { FunctionComponent, useRef, useState } from 'react';
import styled from 'styled-components';

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
}

export const FinderComponent: FunctionComponent<FinderComponentState> = ({
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const handleValueChanged: (e: any) => void = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const onKeyDown: (e: any) => void = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
  };

  return (
    <Input
      placeholder="start searching"
      value={inputValue}
      onChange={handleValueChanged}
      onKeyDown={onKeyDown}
      ref={inputRef}
      autoFocus
    />
  );
};
