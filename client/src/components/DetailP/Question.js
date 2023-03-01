import styled from 'styled-components';
import Vote from './Vote';
import Tag from '../common/Tag';
import ProfileCard from './ProfileCard';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionContainer = styled.div`
  display: flex;
`;

const QuestionWrapper = styled.div`
  width: calc(100% - 45px);
  > p > p {
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
    > .controller-btn {
      color: grey;
      background-color: #fff;
    }
  }
`;

function Question({ questionId, questionData }) {
  const navigate = useNavigate();

  const [questionCommentData, setQuestionCommentData] = useState(null);

  useEffect(() => {
    axios.get(`/question/${questionId}/comments`).then(res => {
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

      setQuestionCommentData(res.data);
    });
  }, [questionId]);

  const handleQuestionDelete = () => {
    axios
      .delete(`/question/${questionId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`
        }
      })
      .then(() => {
        window.location.href = '/';
      })
      .catch(handleDeleteError);
  };

  const handleDeleteError = err => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .delete(`/question/${questionId}`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            Refresh: `${newRefreshToken}`
          }
        })
        .then(() => {
          window.location.href = '/';
        })
        .catch(handleDeleteError);
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const LogginUserId = Number(localStorage.getItem('userId'));

  return (
    <>
      {questionData && (
        <QuestionContainer>
          <Vote questionData={questionData} questionId={questionId} />
          <QuestionWrapper>
            <p dangerouslySetInnerHTML={{ __html: questionData.content }}></p>
            <Tag tags={questionData.tags} />
            <QuestionInfo>
              <ControlOptions>
                <div>
                  <button className='controller-btn' href='/'>
                    Share
                  </button>
                </div>
                {LogginUserId === questionData.userId ? (
                  <>
                    <div>
                      <button
                        className='controller-btn'
                        onClick={() =>
                          navigate(`/question/${questionId}/questionedit`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className='controller-btn'
                        onClick={handleQuestionDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : null}
              </ControlOptions>
              <ProfileCard questionData={questionData} />
            </QuestionInfo>
            <Comment
              questionId={questionId}
              questionCommentData={questionCommentData}
              setQuestionCommentData={setQuestionCommentData}
            />
          </QuestionWrapper>
        </QuestionContainer>
      )}
    </>
  );
}

export default Question;
