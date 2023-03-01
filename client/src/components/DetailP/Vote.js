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
    // !로그인 유저만 할 수 있음????

    if (accessToken && refreshToken) {
      if (data === questionData) {
        if (!isLiked) {
          console.log('questionId:', questionId);
          const numQuestionId = Number(questionId);
          axios
            .post(`/question/${numQuestionId}/vote`, null, {
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
              console.log('question-POST-response:', res.data);
            });
        } else {
          console.log('questionId:', questionId);
          // const numQuestionId = questionId;
          axios
            .delete(`/question/${questionId}/vote`, {
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
              console.log('question-DELETED-response:', res.data);
            });
        }
      }

      if (data === answer) {
        if (!isLiked) {
          console.log('questionId:', questionId);
          console.log('answerId:', answerId);
          axios
            .post(`/question/${questionId}/answer/${answerId}/vote`, null, {
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
              console.log('answer-POST-response:', res.data);
            });
        } else {
          console.log('questionId:', questionId);
          console.log('answerId:', answerId);
          axios
            .delete(`/question/${questionId}/answer/${answerId}/vote`, {
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
              console.log('answer-DELETED-response:', res.data);
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
