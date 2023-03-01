import styled from 'styled-components';

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 6px 7px 7px;
  border-radius: 3px;
  background-color: #d2e7f6;
  width: 165px;
  height: 50px;
  > .created-time {
    color: #5f6871;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
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
              ? `asked ${init.createdAt
                  .replace(/T/, ' ')
                  .replace(/:\d\d(\.\d{1,6})?$/, '')}`
              : `answered ${init.createdAt
                  .replace(/T/, ' ')
                  .replace(/:\d\d(\.\d{1,6})?$/, '')}`}
          </div>
          <UserInfoContainer>
            <div className='username'>{init.name}</div>
          </UserInfoContainer>
        </ProfileCardContainer>
      )}
    </>
  );
}

export default ProfileCard;
