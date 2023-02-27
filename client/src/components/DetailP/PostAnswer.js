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
`;

function PostAnswer({ setAnswerData, questionId, answerData }) {
  //   const BASE_URL = 'http://localhost:3001';
  const [newAnswer, setNewAnswer] = useState('');

  const handlePostAnswer = () => {
    // ! html 그대로 서버와 주고받고 화면에 렌더링 시킬 수 있는 법 찾아보기
    const newAnswerInput = {
      userId: 1,
      content: newAnswer
    };

    console.log('newAnswerInput:', newAnswerInput);
    axios
      .post(`question/${questionId}/answer`, {
        userId: 1,
        content: '테스트 해봅시다!'
      })
      .then(res => {
        setAnswerData(res.data);
        setNewAnswer('');
        console.log('answer data received:', res.data);
      })
      .catch(error => console.log('error:', error));
  };

  return (
    <PostAnswerContainer>
      <h2>Your Answer</h2>
      <Editor editorInput={newAnswer} setEditorInput={setNewAnswer} />
      <GeneralBtn
        BtnText='Post Your Answer'
        width='128px'
        onClick={handlePostAnswer}
      />
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
