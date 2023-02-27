import styled from 'styled-components';
import Vote from './Vote';
import ProfileCard from './ProfileCard';
// import Comment from './Comment';
// import { useState, useEffect } from 'react';
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
function AnswerBody({ answerData, questionId }) {
  // ! API test할때 동적으로 answerCommentData가 바뀌는지 확인해야함
  // const { answerId } = useParams();
  // const [answerCommentData, answerCommentIsPending, answerCommentError] = useFetch(`http://localhost:3001/question/${questoinId}/answer/${answerId}`/comment)

  const navigate = useNavigate();

  const handleAnswerDelete = () => {
    //! delete 마저 구현하기
    axios.delete('/');
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      {answerData &&
        answerData.map(answer => (
          <AnswerContainer key={answer.answerId}>
            <Vote answer={answer} answerId={answer.answerId} />
            <AnswerWrapper>
              <Answercontent
                dangerouslySetInnerHTML={{ __html: answer.content }}
              ></Answercontent>
              <AnswerInfo>
                <ControlOptions>
                  <button>Share</button>
                  <button
                    onClick={() =>
                      accessToken && refreshToken
                        ? navigate(
                            `/question/${questionId}/answeredit/${answer.answerId}`
                          )
                        : navigate('/login')
                    }
                  >
                    Edit
                  </button>

                  <button onClick={handleAnswerDelete}>Delete</button>
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
