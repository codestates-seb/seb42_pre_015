import {
  GoogleButton,
  GithubButton,
  FacebookButton,
  LoginButton,
  HeaderLogin,
  SignUpButton,
  AskQuestionButton
} from './OAuthBottons';
import BoxStyle from '../Login/LoginStyle';
import { useState } from 'react';
import { ReactComponent as MainLogo } from '../../assets/logo/logo.svg';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });

  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrorMessages({ ...errorMessages, email: '' });
    } else if (name === 'password') {
      setPassword(value);
      setErrorMessages({ ...errorMessages, password: '' });
    }
  };

  // 유효성 검사 에러 메세지
  const handleSubmit = e => {
    e.preventDefault();
    const emailError = !email.trim() ? 'Email cannot be empty' : '';
    const passwordError = !password.trim() ? 'Password cannot be empty' : '';

    setErrorMessages({ email: emailError, password: passwordError });
  };

  const handleClick = () => {
    console.log('Button clicked!');
  };

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
                name='email'
                value={email}
                onChange={handleInput}
                className='login__text'
              />
              {errorMessages.email && (
                <div style={{ color: 'red' }}>{errorMessages.email}</div>
              )}
            </div>
            <div className='password-container'>
              <h1>Password</h1>
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleInput}
                className='login__text'
              />
              {errorMessages.password && (
                <div style={{ color: 'red' }}>{errorMessages.password}</div>
              )}
            </div>
            <LoginButton className='login__button' onClick={handleClick} />
          </form>
        </div>
        <div>
          <div>Don&apos;t have an account?</div>
          <div> Are you an employer?</div>
        </div>
        <SignUpButton />
        <HeaderLogin />
        <AskQuestionButton />
      </div>
    </BoxStyle>
  );
};

export default LoginBox;
