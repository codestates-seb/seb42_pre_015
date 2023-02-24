import styled from 'styled-components';
import {
  ArrowUpSvg,
  ArrowDownSvg,
  SaveUnSelectedSvg
} from '../../assets/DetailSvg';

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;
  width: 48px;
  > div {
    font-size: 1.8rem;
    color: #5f6871;
  }
`;

function Vote({ questionData, answer }) {
  return (
    <>
      {questionData && (
        <VoteContainer>
          <ArrowUpSvg />
          <div>{questionData.voteCount}</div>
          <ArrowDownSvg />
          <SaveUnSelectedSvg />
        </VoteContainer>
      )}
      {answer && (
        <VoteContainer>
          <ArrowUpSvg />
          <div>{answer.voteCount}</div>
          <ArrowDownSvg />
          <SaveUnSelectedSvg />
        </VoteContainer>
      )}
    </>
  );
}

export default Vote;