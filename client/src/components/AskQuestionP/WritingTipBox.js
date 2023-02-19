import styled from 'styled-components';
import { ReactComponent as SpotPencil } from '../../assets/AskQuestionP/spotPencil.svg';

const BoxContainer = styled.div`
  max-width: 348px;
  border: 1px solid #d0d4d7;
  border-radius: 3px;
  > .box-heading {
    background-color: #f7f8f8;
    height: 44px;
    border-bottom: 1px solid #d0d4d7;
    display: flex;
    align-items: center;
    > p {
      font-size: 15px;
      padding: 12px;
    }
  }
`;

const BoxContentContainer = styled.div`
  display: flex;
  margin: 16px;
  > .box-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 8px;
    > p {
      font-size: 12px;
      white-space: normal;
      margin-bottom: 10px;
    }
  }
`;

function WritingTipBox() {
  return (
    <BoxContainer>
      <div className='box-heading'>
        <p>Expand on the problem</p>
      </div>
      <BoxContentContainer>
        <div>
          <SpotPencil />
        </div>
        <div className='box-content'>
          <p>
            Your title should summarize the problem. You might find that you
            have a better idea of your title after writing out the rest of the
            question.
          </p>
          <p>
            Your title should summarize the problem. You might find that you
            have a better idea of your title after writing out the rest of the
            question.
          </p>
          <p>
            Your title should summarize the problem. You might find that you
            have a better idea of your title after writing out the rest of the
            question. Your title should summarize the problem. You might find
            that you have a better idea of your title after writing out the rest
            of the question. Your title should summarize the problem. You might
            find that you have a better idea of your title after writing out the
            rest of the question. Your title should summarize the problem. You
            might find that you have a better idea of your title after writing
            out the rest of the question.
          </p>
        </div>
      </BoxContentContainer>
    </BoxContainer>
  );
}

export default WritingTipBox;
