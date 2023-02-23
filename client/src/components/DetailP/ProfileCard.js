import styled from 'styled-components';

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 6px 7px 7px;
  border-radius: 3px;
  background-color: #d2e7f6;
  width: 200px;
  height: 65px;
  > .created-time {
    color: #5f6871;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  > .user-image {
    width: 32px;
    height: 32px;
    margin-right: 5px;
    background-color: beige;
    border-radius: 3px;
  }
  > .username {
    font-size: 13px;
    color: #0069c1;
  }
`;
function ProfileCard({ questionData, answer }) {
  return (
    <>
      {questionData && (
        <ProfileCardContainer>
          <div className='created-time'>asked {questionData.createdAt}</div>
          <UserInfoContainer>
            <div className='user-image'></div>
            <div className='username'>{questionData.userName}</div>
          </UserInfoContainer>
        </ProfileCardContainer>
      )}
      {answer && (
        <ProfileCardContainer>
          <div className='created-time'>Answered {answer.createdAt}</div>
          <UserInfoContainer>
            <div className='user-image'></div>
            <div className='username'>{answer.userName}</div>
          </UserInfoContainer>
        </ProfileCardContainer>
      )}
    </>
  );
}

export default ProfileCard;
