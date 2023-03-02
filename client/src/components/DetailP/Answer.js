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
      .get(process.env.REACT_APP_DB_HOST + `/question/${questionId}/answer`)
      .then(res => {
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
