import styled from 'styled-components';
import { ReactComponent as SpotPencil } from '../../assets/AskQuestionP/spotPencil.svg';

const BoxContainer = styled.div`
  height: max-content;
  border: 1px solid #d0d4d7;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
  border-radius: 3px;
  margin: 0px 20px;

  > .box-heading {
    height: 44px;
    background-color: #f7f8f8;
    border-bottom: 1px solid #d0d4d7;
    display: flex;
    align-items: center;
    font-size: 14.3px;
    color: rgb(35, 38, 41);
    padding: 12px;
  }
  @media screen and (max-width: 1050px) {
    margin: 0;
  }
`;

const BoxContentContainer = styled.div`
  display: flex;
  padding: 16px;
  background-color: #fff;
  height: auto;

  > .box-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 8px;
    > p {
      font-size: 12px;
      white-space: normal;
      margin-bottom: 10px;
      color: rgb(35, 38, 41);
    }
  }
`;

function WritingTipBox() {
  return (
    <BoxContainer>
      <div className='box-heading'>Expand on the problem</div>
      <BoxContentContainer>
        <div>
          <SpotPencil />
        </div>
        <div className='box-content'>
          <p>Your title should summarize the problem.</p>
          <p>Your title should summarize the problem.</p>
        </div>
      </BoxContentContainer>
    </BoxContainer>
  );
}

export default WritingTipBox;
