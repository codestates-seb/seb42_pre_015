import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
import Comment from './Comment';
import Tag from '../common/Tag';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: beige; */
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  > div {
    display: flex;
  }
`;

const QuestionWrapper = styled.div`
  /* background-color: aqua; */
  width: calc(100% - 45px);
  > p {
    white-space: normal;
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 15px;
  }
`;

const Box = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
  margin: 15px 0px;
`;

const ControlOptions = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100px;
  justify-content: space-between;
  > div {
    > a,
    span {
      color: grey;
    }
  }
`;
const AnswerHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: beige;
  height: 32px;
  margin-top: 15px;

  > h2 {
    font-size: 19px;
  }
`;

function Answer() {
  return (
    <>
      <AnswerHeading>
        <h2>5 Answers</h2>
        <div>
          <label htmlFor='answer-sort-method-select'>Sorted by</label>
          <select name='pets' id='answer-sort-method-select'>
            <option value='dog'>Highest score (default)</option>
            <option value='cat'>Date created</option>
          </select>
        </div>
      </AnswerHeading>
      {/* // AnswerContent */}
      <QuestionContainer>
        <div>
          <Vote />
          <QuestionWrapper>
            <p>
              This being the case, I would have expected the following line to
              take an inordinate amount of time because, in order to determine
              whether 1 quadrillion is in the range, a quadrillion values would
              have to be generated:
            </p>
            <Tag />
            <Box>
              <ControlOptions>
                <div>
                  <a href='/'>Share</a>
                </div>
                <div>
                  <a href='/'>Edit</a>
                </div>
                <div>
                  <span>Follow</span>
                </div>
              </ControlOptions>
              <ProfileCard />
            </Box>
            <Comment />
          </QuestionWrapper>
        </div>
        <Answer />
      </QuestionContainer>
      {/* // PostAnswer */}
    </>
  );
}

export default Answer;
