import styled from 'styled-components';
import { ReactComponent as Googlelogo } from '../../assets/logo/Google.svg';
import { ReactComponent as GitHublogo } from '../../assets/logo/GitHub.svg';
import { ReactComponent as Facebooklogo } from '../../assets/logo/Facebook.svg';

const ButtonWrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 100%;
  height: 42px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
  }
  .icon {
    margin-right: 10px;
  }
  ${({ isLoginButton }) =>
    isLoginButton &&
    `
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  `}
`;

const GoogleButton = () => {
  return (
    <ButtonWrapper
      bgColor='#fff'
      color='#000'
      hoverBgColor='#eee'
      activeBgColor='#ddd'
    >
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Googlelogo className='icon' />
        Log in with Google
      </span>
    </ButtonWrapper>
  );
};

const GithubButton = () => {
  return (
    <ButtonWrapper
      bgColor='#222'
      color='#fff'
      hoverBgColor='#000'
      activeBgColor='#333'
    >
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <GitHublogo className='icon' /> Log in with GitHub
      </span>
    </ButtonWrapper>
  );
};

const FacebookButton = () => {
  return (
    <ButtonWrapper
      bgColor='#3b5998'
      color='#fff'
      hoverBgColor='#2f477a'
      activeBgColor='#293e69'
    >
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Facebooklogo className='icon' />
        Log in with Facebook
      </span>
    </ButtonWrapper>
  );
};

const LoginButton = () => {
  return (
    <ButtonWrapper
      bgColor='#0895ff'
      color='#fff'
      hoverBgColor='#2f477a'
      activeBgColor='#293e69'
      isLoginButton // 추가된 속성
    >
      Log in
    </ButtonWrapper>
  );
};

export { GoogleButton, GithubButton, FacebookButton, LoginButton };
