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
        .get(`/question/${questionId}/vote`, {
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
        .get(`/question/${questionId}/answer/${answerId}/vote`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`
          }
        })
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
            .post(`/question/${questionId}/vote`, null, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Refresh: `${refreshToken}`
              }
            })
            .then(res => {
              setQuestionData(res.data);
              setIsLiked(true);
            });
        } else {
          axios
            .delete(`/question/${questionId}/vote`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Refresh: `${refreshToken}`
              }
            })
            .then(res => {
              setQuestionData(res.data);
              setIsLiked(false);
            });
        }
      }

      // answer 좋아요 기능
      if (data === answer) {
        if (!isLiked) {
          axios
            .post(`/question/${questionId}/answer/${answerId}/vote`, null, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Refresh: `${refreshToken}`
              }
            })
            .then(res => {
              setAnswerData(res.data);
              setIsLiked(true);
            });
        } else {
          axios
            .delete(`/question/${questionId}/answer/${answerId}/vote`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Refresh: `${refreshToken}`
              }
            })
            .then(res => {
              setAnswerData(res.data);
              setIsLiked(false);
            });
        }
      }
    } else {
      navigate('/login');
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
