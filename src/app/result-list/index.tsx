import { FunctionComponent } from 'react';
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

export const ResultListComponent: FunctionComponent<ResultListComponentState> =
  ({ resultsList, onEnterPressed }) => {
    return (
      <ResultListWrapper>
        {resultsList.length > 0 && (
          <ResultList>
            {resultsList.map((result, index) => {
              return (
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
