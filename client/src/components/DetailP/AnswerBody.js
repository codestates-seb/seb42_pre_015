import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
import Comment from './Comment';

const AnswerContainer = styled.div`
  display: flex;
`;

const AnswerWrapper = styled.div`
  width: calc(100% - 45px);
  > p {
    white-space: normal;
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 24px;
  }
`;

const AnswerInfo = styled.div`
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
function AnswerBody() {
  return (
    <AnswerContainer>
      <Vote />
      <AnswerWrapper>
        <p>
          This being the case, I would have expected the following line to take
          an inordinate amount of time because, in order to determine whether 1
          quadrillion is in the range, a quadrillion values would have to be
          generated:d
        </p>
        <AnswerInfo>
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
        </AnswerInfo>
        <Comment />
      </AnswerWrapper>
    </AnswerContainer>
  );
}
export default AnswerBody;
