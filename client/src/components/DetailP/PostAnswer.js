import styled from 'styled-components';
import { GeneralBtn } from '../common/Buttons';
import Editor from '../common/Editor';
import axios from 'axios';
import { useState } from 'react';

const PostAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h2 {
    font-size: 19px;
    margin: 20px 0px;
  }
  > .post-btn-container {
    margin-top: 10px;
  }
`;

function PostAnswer({ questionId }) {
  //   const BASE_URL = 'http://localhost:3001';
  const [newAnswer, setNewAnswer] = useState('');
  const [answerErrorMsg, setAnswerErrorMsg] = useState(null);

  const handlePostAnswer = () => {
    // ! html 그대로 서버와 주고받고 화면에 렌더링 시킬 수 있는 법 찾아보기

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const newAnswerInput = { content: newAnswer };

    if (!newAnswer) {
      setAnswerErrorMsg('Body is missing.');
    } else if (newAnswer && !answerErrorMsg) {
      setAnswerErrorMsg(null);
      axios
        .post(`/question/${questionId}/answer`, newAnswerInput, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`
          }
        })
        .then(() => {
          window.location.href = `/question/${questionId}`;
        })
        .catch(handlePostAnswerError);
    }
  };

  const handlePostAnswerError = err => {
    const newAnswerInput = { content: newAnswer };
    if (err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      axios
        .post(`/question/${questionId}/answer`, newAnswerInput, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            Refresh: `${newRefreshToken}`
          }
        })
        .then(() => {
          window.location.href = `/question/${questionId}`;
        })
        .catch(handlePostAnswerError);
    }
  };
  const handleValidation = () => {
    if (!newAnswer) {
      setAnswerErrorMsg('Body is missing.');
    } else {
      setAnswerErrorMsg(null);
    }
  };

  return (
    <PostAnswerContainer>
      <h2>Your Answer</h2>
      <Editor
        editorInput={newAnswer}
        setNewAnswer={setNewAnswer}
        handleValidation={handleValidation}
        errorMsg={answerErrorMsg}
      />
      <p style={{ color: '#DE4F54' }}>{answerErrorMsg}</p>
      <div className='post-btn-container'>
        <GeneralBtn
          BtnText='Post Your Answer'
          width='128px'
          onClick={handlePostAnswer}
        />
      </div>
    </PostAnswerContainer>
  );
}

export default PostAnswer;

/* border: 1px solid ${props =>
      props.validated ? '#409ad6' : '#DE4F54'}; */
/* box-shadow: ${props =>
      props.validated ? '0 0 0 4px #d9e9f6' : '0 0 0 4px #F6E0E0'}; */
/* width: 100%;
    height: 200px;
    padding: 10px;
    border-radius: 3px;
    font-size: 15px;
    line-height: 19.5px;
    white-space: normal;
    margin-bottom: 15px;
    border: 1px solid #b1b7bc; */
/* &:focus {
      border: 1px solid #409ad6;
      box-shadow: 0 0 0 4px #d9e9f6;
      outline: none;
    } */
