import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

function AnswerCommentList({ questionId, answerId }) {
  const [answerCommentData, setAnswerCommentData] = useState(null);

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer/${answerId}/comments`)
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
        setAnswerCommentData(res.data);
      });
  }, [questionId]);

  return (
    <Comment
      questionId={questionId}
      answerId={answerId}
      answerCommentData={answerCommentData}
      setAnswerCommentData={setAnswerCommentData}
    />
  );
}

export default AnswerCommentList;
