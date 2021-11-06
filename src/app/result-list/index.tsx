import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ResultInterface } from '../common/interfaces';
import styled from 'styled-components';

interface ResultListComponentState {
  resultsList: ResultInterface[];
  onEnterPressed: (result: ResultInterface) => void;
}

const ResultListWrapper = styled.div`
  margin: 0;
  border-top: 1px solid black;
  height: 400;
  overflow-x: hidden;
  background-color: transparent;
  width: 100%;
  padding: 0;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
`;
const ResultListItem = styled.li`
  color: white;
  margin: 0;
`;

const SelectedResultListItem = styled(ResultListItem)`
  background-color: #95a5a6;
  color: black;
`;

export const ResultListComponent: FunctionComponent<ResultListComponentState> =
  ({ resultsList, onEnterPressed }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onKeyPressed = (e) => {
      if (e.key === 'ArrowDown') {
        if (selectedIndex === resultsList.length - 1) return;
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        if (selectedIndex === 0) return;
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === 'Enter') {
        onEnterPressed(resultsList[selectedIndex]);
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', onKeyPressed);
      if (resultsList.length === 0) {
        setSelectedIndex(0);
      } else if (selectedIndex > resultsList.length - 1) {
        setSelectedIndex(resultsList.length - 1);
      }
      return () => {
        window.removeEventListener('keydown', onKeyPressed);
      };
    }, [resultsList, selectedIndex, onEnterPressed]);

    return (
      <ResultListWrapper onKeyPress={onKeyPressed}>
        {resultsList.length > 0 && (
          <ResultList>
            {resultsList.map((result, index) => {
              return selectedIndex === index ? (
                <SelectedResultListItem key={index}>
                  {result.title} || {result.description}
                </SelectedResultListItem>
              ) : (
                <ResultListItem key={index}>
                  {result.title} || {result.description}
                </ResultListItem>
              );
            })}
          </ResultList>
        )}
      </ResultListWrapper>
    );
  };
