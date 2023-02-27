import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

function AnswerCommentList({ questionId, answerId }) {
  const [answerCommentData, setAnswerCommentData] = useState(null);

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer/${answerId}/comments`)
      .then(res => {
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
