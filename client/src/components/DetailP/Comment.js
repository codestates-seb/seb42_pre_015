import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dee2e5;
  padding: 6px;
  height: max-content;
  > div {
    > button {
      background-color: #fff;
      color: #abb1b7;
      &:hover {
        color: #5cb8fc;
      }
    }
  }
`;

const CommentWrapper = styled.div`
  white-space: normal;
  width: 100%;
  font-size: 13px;
  margin-bottom: 15px;
  > span {
    color: #858e97;
    margin-right: 3px;
    font-size: 13px;
  }
`;

function Comment() {
  return (
    <CommentContainer>
      <CommentWrapper>
        Can you share source for that? Even if that sounds legit, it would be
        good to back these claims by actual code
        <span> - Username</span>
        <span>Date</span>
        {/* Show this only when the user has the authorization. */}
        <SmallPenSVG />
        <span>X</span>
      </CommentWrapper>
      <div>
        <button>Add a comment</button>
      </div>
    </CommentContainer>
  );
}

export default Comment;
