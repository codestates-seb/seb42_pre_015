import LoginButton from '../Buttons';
import BoxStyle from '../Login/LoginStyle';
import { useState } from 'react';

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

  return (
    <BoxStyle>
      <div className='login-box'>
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
            <LoginButton className='login__button' onClick={handleClick} />
          </form>
        </div>
      </div>
    </BoxStyle>
  );
};

export default LoginBox;
