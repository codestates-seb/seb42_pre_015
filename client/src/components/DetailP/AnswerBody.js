import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
import Comment from './Comment';

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: beige; */
  width: 100%;
  height: 100%;
  /* margin-bottom: 16px; */
  border-bottom: 1px solid #dee2e5;
  > div {
    display: flex;
  }
`;

const AnswerWrapper = styled.div`
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
function AnswerBody() {
  return (
    <AnswerContainer>
      <div>
        <Vote />
        <AnswerWrapper>
          <p>
            This being the case, I would have expected the following line to
            take an inordinate amount of time because, in order to determine
            whether 1 quadrillion is in the range, a quadrillion values would
            have to be generated:
          </p>
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
        </AnswerWrapper>
      </div>
    </AnswerContainer>
  );
}
export default AnswerBody;
