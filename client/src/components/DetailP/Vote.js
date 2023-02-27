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
  width: 60px;
  > div {
    font-size: 1.8rem;
    color: #5f6871;
  }
`;

function Vote({ questionData, answer }) {
  const data = questionData || answer;
  return (
    <>
      {data && (
        <VoteContainer>
          <ArrowUpSvg />
          <div>{data.voteCount}</div>
          <ArrowDownSvg />
          <SaveUnSelectedSvg />
        </VoteContainer>
      )}
    </>
  );
}

export default Vote;
