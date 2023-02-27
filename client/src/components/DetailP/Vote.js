import styled from 'styled-components';
import {
  ArrowUpSvg,
  ArrowUpLikedSvg,
  ArrowDownSvg,
  SaveUnSelectedSvg
} from '../../assets/DetailSvg';
import { useState } from 'react';
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

function Vote({ questionData, answer, questionId, answerId }) {
  const navigate = useNavigate();

  const data = questionData || answer;

  const [isLiked, setIsLiked] = useState(false);

  const handleVoteCount = () => {
    setIsLiked(!isLiked);

    if (accessToken && refreshToken) {
      if (data === questionData) {
        if (!isLiked) {
          axios.post(`/question/${questionId}/vote`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          });
        } else {
          axios.delete(`/question/${questionId}/vote`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          });
        }
      }

      if (data === answer) {
        if (!isLiked) {
          axios.post(`/question/${questionId}/answer/${answerId}/vote`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          });
        } else {
          axios.delete(`/question/${questionId}/answer/${answerId}/vote`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
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
