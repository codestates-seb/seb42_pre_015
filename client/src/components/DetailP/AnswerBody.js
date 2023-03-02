import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnswerCommentList from './AnswerCommentList';

const AnswerContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #dee2e5;
`;

const AnswerWrapper = styled.div`
  width: calc(100% - 45px);
  overflow-wrap: break-word;
  > p {
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 24px;
    white-space: normal;
  }
`;

const Answercontent = styled.p`
  > p {
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 24px;
    white-space: normal;
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
function AnswerBody({ questionId, answerData, setAnswerData }) {
  const navigate = useNavigate();

  const handleAnswerDelete = answerId => {
    axios
      .delete(`/question/${questionId}/answer/${answerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`
        }
      })
      .then(res => {
        console.log('res.headers', res.headers);
        setAnswerData(res.data);
      })
      .catch(err => {
        handleAnswerDeleteError(err, answerId);
        console.log(answerId);
      });
  };

  const handleAnswerDeleteError = (err, answerId) => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      console.log(answerId);

      axios
        .delete(`/question/${questionId}/answer/${answerId}`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            Refresh: `${newRefreshToken}`
          }
        })
        .then(() => {
          window.location.href = `/question/${questionId}`;
        });
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const LogginUserId = Number(localStorage.getItem('userId'));

  return (
    <>
      {answerData &&
        answerData.map(answer => (
          <AnswerContainer key={answer.answerId}>
            <Vote
              questionId={questionId}
              answerId={answer.answerId}
              answer={answer}
              setAnswerData={setAnswerData}
            />
            <AnswerWrapper>
              <Answercontent
                dangerouslySetInnerHTML={{ __html: answer.content }}
              ></Answercontent>
              <AnswerInfo>
                <ControlOptions>
                  <button>Share</button>
                  {LogginUserId === answer.userId ? (
                    <>
                      <button
                        onClick={() =>
                          navigate(
                            `/question/${questionId}/answeredit/${answer.answerId}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleAnswerDelete(answer.answerId)}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </ControlOptions>
                <ProfileCard answer={answer} />
              </AnswerInfo>
              <AnswerCommentList
                questionId={questionId}
                answerId={answer.answerId}
              />
            </AnswerWrapper>
          </AnswerContainer>
        ))}
    </>
  );
}
export default AnswerBody;
