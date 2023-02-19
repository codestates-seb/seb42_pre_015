import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';

const ButtonWrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 100%;
  height: 42px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 12px;
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
      <FontAwesomeIcon icon={faGoogle} className='icon' />
      Log in with Google
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
      <FontAwesomeIcon icon={faGithub} className='icon' />
      Log in with GitHub
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
      <FontAwesomeIcon icon={faFacebook} className='icon' />
      Log in with Facebook
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
