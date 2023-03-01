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
        if (res.headers.authorization && res.headers.refresh) {
          const accessToken = res.headers.authorization;
          const refreshToken = res.headers.refresh;

          // 기존 토큰 삭제
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          // 새로운 토큰 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
        setAnswerData(res.data);
      });
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const LogginUserId = localStorage.getItem('userId');
  const userId = Number(LogginUserId.split(':')[1].trim());

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
                  {userId === answer.userId ? (
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
