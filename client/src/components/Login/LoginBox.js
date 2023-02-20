import {
  GoogleButton,
  GithubButton,
  FacebookButton,
  LoginButton1,
  LoginButton2,
  SignUpButton,
  AskQuestionButton
} from './OAuthBottons';
import BoxStyle from '../Login/LoginStyle';
import { useState } from 'react';
import { ReactComponent as MainLogo } from '../../assets/logo/logo.svg';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageE, setErrorMessageE] = useState('');
  const [errorMessageP, setErrorMessageP] = useState('');

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };
  // 로그인 error 메세지
  const handleSubmit = e => {
    e.preventDefault();
    const emailError = !email.trim() ? 'Email cannot be empty' : '';
    const passwordError = !password.trim() ? 'Password cannot be empty' : '';

    setErrorMessageE(emailError);
    setErrorMessageP(passwordError);
  };

  const handleClick = () => {
    console.log('Button clicked!');
  };
  // 로그인 컴포넌트
  return (
    <BoxStyle>
      <div className='login-box'>
        <div className='all-oauth-box'>
          <div className='logo-box'>
            <div className='logo'>
              <MainLogo />
            </div>
          </div>
          <div className='oauth-box'>
            <GoogleButton />
            <GithubButton />
            <FacebookButton />
          </div>
        </div>
        <div className='Container'>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='email-container'>
              <h1>Email</h1>
              <input
                type='email'
                value={email}
                onChange={handleEmail}
                className='login__text'
              />
              {errorMessageE && (
                <div style={{ color: 'red' }}>{errorMessageE}</div>
              )}
            </div>
            <div className='password-container'>
              <h1>Password</h1>
              <input
                type='password'
                value={password}
                onChange={handlePassword}
                className='login__text'
              />
              {errorMessageP && (
                <div style={{ color: 'red' }}>{errorMessageP}</div>
              )}
            </div>
            <LoginButton1 className='login__button' onClick={handleClick} />
          </form>
        </div>
        <div>
          <div> Don't have an account?</div>
          <div> Are you an employer?</div>
        </div>
        <SignUpButton />
        <LoginButton2 />
        <AskQuestionButton />
      </div>
    </BoxStyle>
  );
};

export default LoginBox;
