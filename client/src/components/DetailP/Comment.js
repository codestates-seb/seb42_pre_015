import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';
import { GeneralBtn } from '../common/Buttons';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dee2e5;
  padding: 6px;
  margin-bottom: 15px;
  > div {
    > .add-comment-btn {
      background-color: #fff;
      color: #abb1b7;
      font-size: 13px;
      &:hover {
        color: #5cb8fc;
      }
    }
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  font-size: 13px;
  margin-bottom: 15px;
  > .comment {
    margin-right: 3px;
    font-size: 13px;
    white-space: normal;
  }
  > .name {
    color: #0069c1;
  }
  > .date {
    color: #858e97;
  }
  > .delete-btn {
    margin-left: 3px;
    color: #858e97;
  }
`;

const AddCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  > textarea {
    height: 50px;
    width: 85%;
    border-radius: 3px;
    margin-right: 8px;
    padding: 6px;
    font-size: 13px;
    line-height: 19.5px;
    white-space: normal;
    border: 1px solid #b1b7bc;
    &:focus {
      border: 1px solid #409ad6;
      box-shadow: 0 0 0 4px #d9e9f6;
      outline: none;
    }
  }
`;

function Comment() {
  return (
    <CommentContainer>
      <CommentWrapper>
        <span className='comment content'>
          Can you share source for that? Even if that sounds legit, it would be
          good to back these claims by actual code -
        </span>
        <span className='comment name'>Matthew</span>
        <span className='comment date'>Mar 11, 2020 at 17:22 </span>
        {/* Show this only when the user has the authorization. */}
        <SmallPenSVG className='comment edit-btn' />
        <span className='comment delete-btn'>X</span>
      </CommentWrapper>
      <div>
        <button className='add-comment-btn'>Add a comment</button>
      </div>
      <AddCommentContainer>
        <textarea />
        <GeneralBtn BtnText='Add Comment' width='110px' height='40px' />
      </AddCommentContainer>
    </CommentContainer>
  );
}

export default Comment;
