import styled from 'styled-components';
import { GeneralBtn } from '../common/Buttons';
import Editor from '../common/Editor';

const PostAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h2 {
    font-size: 19px;
    margin: 20px 0px;
  }
  > .quill {
    padding-bottom: 50px;
    > .ql-container {
      font-size: 15px;
      min-height: 200px;
      > .ql-editor {
        &:focus {
          border: 1px solid #409ad6;
          box-shadow: 0 0 0 4px #d9e9f6;
          outline: none;
        }
      }
    }
  }
`;

function PostAnswer() {
  return (
    <PostAnswerContainer>
      <h2>Your Answer</h2>
      {/* <textarea></textarea> */}
      <Editor />
      <GeneralBtn BtnText='Post Your Answer' width='128px' />
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
