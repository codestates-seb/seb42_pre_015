import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';

const CommentWrapper = styled.div`
  height: max-content;
  border-top: 1px solid #dee2e5;
  white-space: normal;
  padding: 6px;
  width: 100%;
  font-size: 13px;
  > span {
    color: #858e97;
    margin-right: 3px;
    font-size: 13px;
  }
`;
function Comment() {
  return (
    <CommentWrapper>
      Can you share source for that? Even if that sounds legit, it would be good
      to back these claims by actual code
      <span> - Username</span>
      <span>Date</span>
      {/* Show this only when the user has the authorization. */}
      <SmallPenSVG />
      <span>X</span>
    </CommentWrapper>
  );
}

export default Comment;
