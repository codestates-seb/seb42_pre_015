import styled from 'styled-components';
import {
  ArrowUpSvg,
  ArrowUpLikedSvg,
  ArrowDownSvg,
  SaveUnSelectedSvg
} from '../../assets/DetailSvg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;
  width: 60px;

  > button {
    background-color: #fff;
  }
  > div {
    font-size: 1.8rem;
    color: #5f6871;
  }
`;

function Vote({
  questionId,
  answerId,
  questionData,
  answer,
  setQuestionData,
  setAnswerData
}) {
  const navigate = useNavigate();

  const data = questionData || answer;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data === questionData) {
      // 유저가 질문에 좋아요를 했는지 확인
      axios
        .get(process.env.REACT_APP_DB_HOST + `/question/${questionId}/vote`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`
          }
        })
        .then(res => {
          setIsLiked(res.data.userVote);
        });
    } else if (data === answer) {
      // 유저가 답변에 좋아요를 했는지 확인
      axios
        .get(
          process.env.REACT_APP_DB_HOST +
            `/question/${questionId}/answer/${answerId}/vote`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          }
        )
        .then(res => {
          setIsLiked(res.data.userVote);
        });
    }
  }, [questionId]);

  const handleVoteCount = () => {
    if (accessToken && refreshToken) {
      // question 좋아요 기능
      if (data === questionData) {
        if (!isLiked) {
          axios
            .post(
              process.env.REACT_APP_DB_HOST + `/question/${questionId}/vote`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              }
            )
            .then(res => {
              setQuestionData(res.data);
              setIsLiked(true);
            })
            .catch(handleVoteCountPError);
        } else {
          axios
            .delete(
              process.env.REACT_APP_DB_HOST + `/question/${questionId}/vote`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              }
            )
            .then(res => {
              setQuestionData(res.data);
              setIsLiked(false);
            })
            .catch(handleVoteCountDError);
        }
      }
      // answer 좋아요 기능
      if (data === answer) {
        if (!isLiked) {
          axios
            .post(
              process.env.REACT_APP_DB_HOST +
                `/question/${questionId}/answer/${answerId}/vote`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              }
            )
            .then(res => {
              setAnswerData(res.data);
              setIsLiked(true);
            })
            .catch(handleVoteACountPError);
        } else {
          axios
            .delete(
              process.env.REACT_APP_DB_HOST +
                `/question/${questionId}/answer/${answerId}/vote`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              }
            )
            .then(res => {
              setAnswerData(res.data);
              setIsLiked(false);
            })
            .catch(handleVoteACountDError);
        }
      }
    } else {
      navigate('/login');
    }
  };
  const handleVoteCountPError = err => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .post(
          process.env.REACT_APP_DB_HOST + `/question/${questionId}/vote`,
          null,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              Refresh: `${newRefreshToken}`
            }
          }
        )
        .then(() => {
          window.location.href = `/question/${questionId}`;
        });
    }
  };
  const handleVoteCountDError = err => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .delete(
          process.env.REACT_APP_DB_HOST + `/question/${questionId}/vote`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          }
        )
        .then(() => {
          window.location.href = `/question/${questionId}`;
        });
    }
  };

  const handleVoteACountPError = err => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .post(
          process.env.REACT_APP_DB_HOST +
            `/question/${questionId}/answer/${answerId}/vote`,
          null,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              Refresh: `${newRefreshToken}`
            }
          }
        )
        .then(() => {
          window.location.href = `/question/${questionId}`;
        });
    }
  };
  const handleVoteACountDError = err => {
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .delete(
          process.env.REACT_APP_DB_HOST +
            `/question/${questionId}/answer/${answerId}/vote`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              Refresh: `${newRefreshToken}`
            }
          }
        )
        .then(() => {
          window.location.href = `/question/${questionId}`;
        });
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      {data && (
        <VoteContainer>
          <button onClick={handleVoteCount}>
            {isLiked ? <ArrowUpLikedSvg /> : <ArrowUpSvg />}
          </button>
          <div>{data.voteCount}</div>
          <ArrowDownSvg />
          <SaveUnSelectedSvg />
        </VoteContainer>
      )}
    </>
  );
}

export default Vote;
