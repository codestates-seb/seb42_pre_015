import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';

const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

function Answer({ answerData }) {
  return (
    <>
      {answerData && (
        <AnswerSection>
          <AnswerHeading answerData={answerData} />
          <AnswerBody answerData={answerData} />
          <PostAnswer />
        </AnswerSection>
      )}
    </>
  );
}

export default Answer;