import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';

const AnswerContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #dee2e5;
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
  > button,
  span {
    background-color: #fff;
    color: grey;
  }
`;
function AnswerBody({ answerData, questionId }) {
  // ! API test할때 동적으로 answerCommentData가 바뀌는지 확인해야함
  // const { questoinId } = useParams();
  // const [answerCommentData, answerCommentIsPending, answerCommentError] = useFetch(`http://localhost:3001/question/${questoinId}/answer/${answerId}`/comment)

  const navigate = useNavigate();

  return (
    <>
      {answerData &&
        answerData.map(answer => (
          <AnswerContainer key={answer.answerId}>
            <Vote answer={answer} />
            <AnswerWrapper>
              <p>{answer.content}</p>
              <AnswerInfo>
                <ControlOptions>
                  <button>Share</button>
                  <button
                    onClick={() =>
                      navigate(
                        `/question/${questionId}/answeredit/${answer.answerId}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button href='/'>Delete</button>
                </ControlOptions>
                <ProfileCard answer={answer} />
              </AnswerInfo>
              <Comment />
            </AnswerWrapper>
          </AnswerContainer>
        ))}
    </>
  );
}
export default AnswerBody;
