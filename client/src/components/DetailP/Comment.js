import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';
import { GeneralBtn } from '../common/Buttons';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border-top: 1px solid #dee2e5; */
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
  margin-bottom: 8px;
  border-top: 1px solid #dee2e5;
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

function Comment({ questionCommentData, answerCommentData1 }) {
  // const { questoinId } = useParams();
  // const [answerCommentData, answerCommentIsPending, answerCommentError] = useFetch(`http://localhost:3001/question/${questoinId}/answer/${answerId}`/comment)
  return (
    <>
      {questionCommentData && (
        <CommentContainer>
          {questionCommentData.map(comment => (
            <CommentWrapper key={comment.questionCommentId}>
              <span className='comment content'>{comment.content}</span>
              <span className='comment name'>{comment.userName}</span>
              <span className='comment date'>{comment.createdAt}</span>
              {/* Show this only when the user has the authorization. */}
              <SmallPenSVG className='comment edit-btn' />
              <span className='comment delete-btn'>X</span>
            </CommentWrapper>
          ))}
          <div>
            <button className='add-comment-btn'>Add a comment</button>
          </div>
          <AddCommentContainer>
            <textarea />
            <GeneralBtn BtnText='Add Comment' width='110px' height='40px' />
          </AddCommentContainer>
        </CommentContainer>
      )}
      {answerCommentData1 && (
        <CommentContainer>
          {answerCommentData1.map(comment => (
            <CommentWrapper key={comment.answerCommentId}>
              <span className='comment content'>{comment.content}</span>
              <span className='comment name'>{comment.userName}</span>
              <span className='comment date'>{comment.createdAt}</span>
              {/* Show this only when the user has the authorization. */}
              <SmallPenSVG className='comment edit-btn' />
              <span className='comment delete-btn'>X</span>
            </CommentWrapper>
          ))}
          <div>
            <button className='add-comment-btn'>Add a comment</button>
          </div>
          <AddCommentContainer>
            <textarea />
            <GeneralBtn BtnText='Add Comment' width='110px' height='40px' />
          </AddCommentContainer>
        </CommentContainer>
      )}
    </>
  );
}

export default Comment;
