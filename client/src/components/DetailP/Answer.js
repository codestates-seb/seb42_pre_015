import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';

const AnswerSection = styled.div`
  width: 100%;
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
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
