import styled from 'styled-components';

const UsersNavigation = styled.nav`
  height: 100%;
  display: block;
  ol {
    display: flex;
    height: 100%;
    justify-content: center;
    list-style: none;
    li {
      padding: 0 12px;
      display: inline-flex;
      justify-content: center;
      padding: 0 '12px';
      cursor: pointer;
      &:hover {
        background-color: #e3e6e8;
      }
      span {
        display: inline-flex;
        align-items: center;
        font-weight: 700;
        font-size: 12px;
        @media (max-width: 640px) {
          display: none;
        }
      }
      a {
        display: inline-flex;
        align-items: center;
        margin-right: 5px;
        position: relative;
        text-align: center;
        color: rgb(82, 89, 96);
        img {
          width: 24px;
          height: 24px;
          border-radius: 4px;
        }
      }
    }
  }
`;
const UserBox = styled.div`
  .user-box {
    background-color: ${() =>
      `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

export default function UserNav() {
  const showName = () => {
    const userName = localStorage.getItem('name');
    if (userName.length <= 3) {
      return userName.slice(-2);
    } else {
      return userName.slice(0, 1);
    }
  };

  return (
    <UsersNavigation>
      <ol>
        <li>
          <a href='/#'>
            {/* <img
              src='https://lh3.googleusercontent.com/a/AEdFTp6G9ZfXKo7FPo_1fE9FtMz6i7hPnBBBdbF-WjOv=k-s48'
              alt='user'
            ></img> */}
            <UserBox>
              <div className='user-box'>
                <div className='user-box__name'>{showName()}</div>
              </div>
            </UserBox>
          </a>
          <span>1</span>
        </li>
      </ol>
    </UsersNavigation>
  );
}
