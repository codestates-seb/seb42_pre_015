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
import { ReactComponent as ErrorComponet } from '../../assets/logo/LoginError.svg';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });
  // login-form 작성 에러
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

  // login-button 제출 에러
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
      <div className='all-box'>
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
        <div className='login-box'>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-form__email'>
              <h1>Email</h1>
              <div style={{ position: 'relative' }}>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleInput}
                  className='login-form__text'
                />
                {errorMessages.email && (
                  <div className='error-svg'>
                    <ErrorComponet />
                  </div>
                )}
              </div>
              {errorMessages.email && (
                <div style={{ color: 'red' }}>{errorMessages.email}</div>
              )}
            </div>
            <div className='login-form__password'>
              <h1>Password</h1>
              <div style={{ position: 'relative' }}>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleInput}
                  className='login-form__text'
                />
                {errorMessages.email && (
                  <div className='error-svg'>
                    <ErrorComponet />
                  </div>
                )}
              </div>
              {errorMessages.password && (
                <div style={{ color: 'red' }}>{errorMessages.password}</div>
              )}
            </div>
            <LoginButton onClick={handleClick} />
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
