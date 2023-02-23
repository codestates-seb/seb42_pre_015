import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';

const AnswerSection = styled.div`
  width: 100%;
  background-color: lightblue;
  border: 2px solid red;
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
      {/* <div>hi</div> */}
    </>
  );
}

export default Answer;
