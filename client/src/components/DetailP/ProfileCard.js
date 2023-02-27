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
  const init = questionData || answer;
  return (
    <>
      {init && (
        <ProfileCardContainer>
          <div className='created-time'>
            {init === questionData
              ? `asked ${init.createdAt}`
              : `answered ${init.createdAt}`}
          </div>
          <UserInfoContainer>
            <div className='user-image'></div>
            <div className='username'>{init.userName}</div>
          </UserInfoContainer>
        </ProfileCardContainer>
      )}
    </>
  );
}

export default ProfileCard;
