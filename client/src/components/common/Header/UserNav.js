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

export default function UserNav() {
  return (
    <UsersNavigation>
      <ol>
        <li>
          <a href='/#'>
            <img
              src='https://lh3.googleusercontent.com/a/AEdFTp6G9ZfXKo7FPo_1fE9FtMz6i7hPnBBBdbF-WjOv=k-s48'
              alt='user'
            ></img>
          </a>
          <span>1</span>
        </li>
      </ol>
    </UsersNavigation>
  );
}
