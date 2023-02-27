import styled from 'styled-components';
import AnswerHeading from './AnswerHeading';
import AnswerBody from './AnswerBody';
import PostAnswer from './PostAnswer';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

function Answer({ questionId }) {
  const [answerData, setAnswerData] = useState(null);

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer`)
      .then(res => {
        setAnswerData(res.data);
        console.log('answerData:', answerData);
      })
      .catch(error => {
        console.error('error:', error);
      });
  }, [questionId]);

  return (
    <>
      {answerData && (
        <AnswerSection>
          <AnswerHeading answerData={answerData} />
          <AnswerBody questionId={questionId} answerData={answerData} />
          <PostAnswer
            questionId={questionId}
            setAnswerData={setAnswerData}
            answerData={answerData}
          />
        </AnswerSection>
      )}
    </>
  );
}

export default Answer;
