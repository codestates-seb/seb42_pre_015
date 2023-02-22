import styled from 'styled-components';
import {
  ArrowUpSvg,
  ArrowDownSvg,
  SaveUnSelectedSvg
} from '../../assets/DetailSvg';

const VoteContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  width: 45px;
  > div {
    font-size: 1.8rem;
    color: #5f6871;
  }
`;

function Vote() {
  return (
    <VoteContainer>
      <ArrowUpSvg />
      <div>12</div>
      <ArrowDownSvg />
      <SaveUnSelectedSvg />
    </VoteContainer>
  );
}

export default Vote;
