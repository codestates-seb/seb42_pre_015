import styled from 'styled-components';
// import { SmallPenSVG } from '../../assets/CommonSVG';
// import { GeneralBtn } from '../common/Buttons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 15px;
  > div {
    > .add-comment-btn {
      margin-top: 8px;
      background-color: #fff;
      color: #abb1b7;
      font-size: 13px;
      &:hover {
        color: #0069c1;
      }
    }
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 4px 0px;
  border-top: 1px solid #dee2e5;
  > .content {
    color: #474f55;
    font-size: 12px;
    white-space: normal;
    overflow-wrap: break-word;
    width: 80%;
  }
  > div {
    width: 19%;
    > .name {
      color: #0069c1;
    }
    > .date {
      color: #858e97;
      margin-left: 3px;
    }
    > .edit-btn,
    .delete-btn {
      margin-left: 3px;
      color: #858e97;
      background-color: #fff;
      cursor: pointer;
    }
  }
`;

const AddCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  border: 1px solid #b1b7bc;
  white-space: normal;
  overflow-wrap: break-word;
  > input {
    height: 30px;
    width: 91%;
    border-radius: 10px;
    margin-right: 8px;
    padding: 6px;
    font-size: 13px;
    line-height: 19.5px;
    white-space: normal;
    &:focus {
      outline: none;
    }
  }
  > .post-btn {
    width: 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 12px;
    color: #0069c1;
    background-color: #fff;
    cursor: pointer;
  }
  &:focus-within {
    border: 0.5px solid #409ad6;
    box-shadow: 0 0 0 2px #d9e9f6;
    outline: none;
  }
`;

function Comment({
  questionId,
  questionCommentData,
  setQuestionCommentData,
  answerId,
  answerCommentData,
  setAnswerCommentData
}) {
  const navigate = useNavigate();

  let init = questionCommentData || answerCommentData;

  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [onEdit, setOnEdit] = useState('');

  const handleAddComment = () => {
    const newCommentInput = { userId: 1, content: newComment };

    if (init === questionCommentData) {
      axios
        .post(`/question/${questionId}/comment`, newCommentInput, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`
          }
        })
        .then(res => {
          setQuestionCommentData(res.data);
          setNewComment('');
        });
    } else if (init === answerCommentData) {
      axios
        .post(
          `/question/${questionId}/answer/${answerId}/comment`,
          newCommentInput,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          }
        )
        .then(res => {
          console.log('commentdata:', res);
          setAnswerCommentData(res.data);
          setNewComment('');
        });
    }
  };

  const handleEditComment = e => {
    setOnEdit(!onEdit);
    console.log('e:', e.target);
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const LogginUserId = localStorage.getItem('userId');
  const userId = Number(LogginUserId.split(':')[1].trim());

  return (
    <>
      {init && (
        <CommentContainer>
          {init.map((comment, idx) => (
            <CommentWrapper
              key={
                init === questionCommentData
                  ? comment.questionCommentId
                  : comment.answerCommentId
              }
            >
              <p className='content'>{comment.content}</p>
              <div>
                <span className='name'>{comment.name}</span>
                <span className='date'>
                  {comment.createdAt.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1')}
                </span>
                {userId === comment.userId ? (
                  <>
                    <button
                      id={idx}
                      className='edit-btn'
                      onClick={handleEditComment}
                    >
                      Edit
                    </button>
                    <button className='delete-btn'>X</button>
                  </>
                ) : null}
              </div>
            </CommentWrapper>
          ))}
          <div>
            {!isAddClicked ? (
              <button
                className='add-comment-btn'
                onClick={
                  accessToken && refreshToken
                    ? () => setIsAddClicked(true)
                    : () => navigate('/login')
                }
              >
                Add a comment
              </button>
            ) : null}
          </div>
          {isAddClicked ? (
            <AddCommentContainer>
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              ></input>
              <button className='post-btn' onClick={handleAddComment}>
                Post
              </button>
            </AddCommentContainer>
          ) : null}
        </CommentContainer>
      )}
    </>
  );
}

export default Comment;
