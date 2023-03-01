import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';
import { useState, useEffect } from 'react';
import axios from 'axios';
// 주석 추가
const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Loading = styled.div`
  width: calc(50vw + 300px);
  height: 100vh;
  background-color: #fff;
`;

function Answer({ questionId }) {
  const [answerData, setAnswerData] = useState(null);
  const [isAnswerLoading, setIsAnswerLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer`)
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
        setIsAnswerLoading(false);
      })
      .catch(error => {
        console.error('error:', error);
      });
  }, [questionId]);

  return (
    <>
      {isAnswerLoading && <Loading>Loading...</Loading>}
      {answerData && (
        <AnswerSection>
          <AnswerHeading answerData={answerData} />
          <AnswerBody
            questionId={questionId}
            answerData={answerData}
            setAnswerData={setAnswerData}
          />
          <PostAnswer questionId={questionId} setAnswerData={setAnswerData} />
        </AnswerSection>
      )}
    </>
  );
}

export default Answer;
