import styled from 'styled-components';
import Vote from './Vote';
import Tag from '../common/Tag';
import ProfileCard from './ProfileCard';
import Comment from './Comment';

const QuestionContainer = styled.div`
  display: flex;
`;

const QuestionWrapper = styled.div`
  width: calc(100% - 45px);
  > p {
    white-space: normal;
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 24px;
  }
`;

const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;
`;

const ControlOptions = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  > div {
    > a,
    span {
      color: grey;
    }
  }
`;

function Question() {
  return (
    <QuestionContainer>
      <Vote />
      <QuestionWrapper>
        <p>
          This being the case, I would have expected the following line to take
          an inordinate amount of time because, in order to determine whether 1
          quadrillion is in the range, a quadrillion values would have to be
          generated:
        </p>
        <Tag />
        <QuestionInfo>
          <ControlOptions>
            <div>
              <a href='/'>Share</a>
            </div>
            <div>
              <a href='/'>Edit</a>
            </div>
            <div>
              <span>Delete</span>
            </div>
          </ControlOptions>
          <ProfileCard />
        </QuestionInfo>
        <Comment />
      </QuestionWrapper>
    </QuestionContainer>
  );
}

export default Question;
