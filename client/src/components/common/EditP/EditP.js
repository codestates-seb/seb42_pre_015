import styled from 'styled-components';
import { GeneralBtn } from '../Buttons';
import TagInput from '../TagInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QEditContainer = styled.div`
  width: 100%;
  padding: 24px;
`;
const QEHelpBox = styled.div`
  text-align: left;
  padding: 16px;
  border: 1px solid rgb(230, 207, 121);
  background-color: rgb(253, 247, 226);
  margin-bottom: ${props => props.margin || '12px'};
  > p {
    white-space: normal;
  }
`;
const QELable = styled.label`
  display: block;
  margin-bottom: ${props => props.margin || '4px'};
  font-weight: 600;
  font-size: ${props => props.fontsize || '12px'};
`;
const QEInput = styled.input`
  padding: 7.8px 9.1px;
  display: block;
  width: 100%;
  border: 1px solid rgb(186, 191, 196);
  color: rgb(12, 13, 14);
  border-radius: 3px;
  margin-bottom: 15px;
`;
// const QETextarea = styled.textarea`
//   height: 284px;
//   width: 100%;
//   border: 1px solid rgb(186, 191, 196);
//   border-radius: 3px;
//   margin-bottom: 15px;
// `;
const QEP = styled.p`
  width: 100%;
  white-space: normal;
  margin-bottom: 15px;
`;
const QECode = styled.pre`
  width: 100%;
  background-color: rgb(246, 246, 246);
  padding: 12px;
  margin-bottom: 19.5px;
  max-height: 600px;
  code {
    white-space: normal;
  }
`;
const QECancelBtn = styled.button`
  margin-left: 17px;
  height: 38px;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  color: #4c92d3;
  cursor: pointer;
  &:hover {
    background-color: #f0f8ff;
  }
`;
const QEAtag = styled.a`
  color: rgb(131, 141, 149);
`;
const StyledReactQuill = styled(ReactQuill)`
  height: 284px;
  margin-bottom: 50px;
  .ql-editor {
    height: 100%;
  }
`;
export function QuestionEditMain() {
  return (
    <QEditContainer>
      <QEHelpBox>
        <p style={{ marginBottom: '13px' }}>
          Your edit will be placed in a queue until it is peer reviewed.
        </p>
        <p>
          We welcome edits that make the post easier to understand and more
          valuable for readers. Because community members review edits, please
          try to make the post substantially better than how you found it, for
          example, by fixing grammar or adding additional resources and
          hyperlinks.
        </p>
      </QEHelpBox>
      <QELable htmlFor='Title'>Title</QELable>
      <QEInput
        placeholder='How to avoid sending a brunch of requests to update data in DB'
        id='title'
      ></QEInput>
      <QELable htmlFor='body'>Body</QELable>
      <StyledReactQuill id='body' className='AnswerText' />
      <QEP>
        I have an unregistered user that works with my application, getting some
        progress. I keep this progress in local storage. Then, when the user
        decides to register, I send a PUT request to sync his progress with DB.
      </QEP>
      <QEP>
        For that I track its status and when it&lsquo;s become authenticated and
        the progress parameter empty, I send a PUT request, but the problem is
        it sends dozens of PUT requests to update the progress instead of one.
      </QEP>
      <QECode>
        <code>
          For that I track its status and when it&lsquo;s become authenticated
          and the progress parameter empty, I send a PUT request, but the
          problem is it sends dozens of PUT requests to update the progress
          instead of one.
        </code>
      </QECode>
      <QEP>
        P.S. If it should be done in another way, share your ideas with me
        please.
      </QEP>
      <QELable htmlFor='tags'>Tags</QELable>
      <TagInput id='tags' placeholder='e.g. (vba css json)' />
      <div style={{ marginBottom: '12px', marginTop: '12px' }}>
        <GeneralBtn width={'80px'} BtnText='Save edits'></GeneralBtn>
        <QECancelBtn>Cancel</QECancelBtn>
      </div>
      <QEAtag href='/#'>Add a comment</QEAtag>
    </QEditContainer>
  );
}

export function AnswerEditMain() {
  return (
    <QEditContainer>
      <QEHelpBox margin='20px'>
        <p style={{ marginBottom: '13px' }}>
          Your edit will be placed in a queue until it is peer reviewed.
        </p>
        <p>
          We welcome edits that make the post easier to understand and more
          valuable for readers. Because community members review edits, please
          try to make the post substantially better than how you found it, for
          example, by fixing grammar or adding additional resources and
          hyperlinks.
        </p>
      </QEHelpBox>
      <QELable htmlFor='Answer' fontsize='17px' margin='14px'>
        Answer
      </QELable>
      <StyledReactQuill id='Answer' className='AnswerText' />
      <QEP>
        I have an unregistered user that works with my application, getting some
        progress. I keep this progress in local storage. Then, when the user
        decides to register, I send a PUT request to sync his progress with DB.
      </QEP>
      <QEP>
        For that I track its status and when it&lsquo;s become authenticated and
        the progress parameter empty, I send a PUT request, but the problem is
        it sends dozens of PUT requests to update the progress instead of one.
      </QEP>
      <QECode>
        <code>
          For that I track its status and when it&lsquo;s become authenticated
          and the progress parameter empty, I send a PUT request, but the
          problem is it sends dozens of PUT requests to update the progress
          instead of one.
        </code>
      </QECode>
      <QEP>
        P.S. If it should be done in another way, share your ideas with me
        please.
      </QEP>
      <div style={{ marginBottom: '12px' }}>
        <GeneralBtn
          width={'80px'}
          BtnText='Save edits'
          padding='0px'
        ></GeneralBtn>
        <QECancelBtn>Cancel</QECancelBtn>
      </div>
      <QEAtag href='/#'>Add a comment</QEAtag>
    </QEditContainer>
  );
}
