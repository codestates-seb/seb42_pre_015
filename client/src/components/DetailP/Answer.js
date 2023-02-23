import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';

const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

function Answer() {
  return (
    <>
      <AnswerSection>
        <AnswerHeading />
        <AnswerBody />
        <PostAnswer />
      </AnswerSection>
    </>
  );
}

export default Answer;
