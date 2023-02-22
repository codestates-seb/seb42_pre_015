import { useState } from 'react';
import { GeneralBtn } from '../common/Buttons';
import Captcha from './Captcha';
import { ErrorSVG } from '../../assets/LoginSVG';
import styled from 'styled-components';

const InputboxStyle = styled.div`
  .signup-form__text {
    border: 1px solid black;
    border-radius: 5px;
    height: 35px;
    width: 100%;
    margin: 5px 0;
    .error-svg {
      position: absolute;
      top: 12px;
      left: 230px;
      @media (max-width: 640px) {
        left: 190px;
      }
    }
  }
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const Inputbox = () => {
  const [DPname, setDPname] = useState('');
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
    } else if (name === 'displayname') {
      setDPname(value);
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
    <>
      <InputboxStyle>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-form__email'>
            <h1>Display name</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='displayname'
                name='displayname'
                value={DPname}
                onChange={handleInput}
                className='signup-form__text'
              />
              {errorMessages.email && (
                <div className='error-svg'>
                  <ErrorSVG />
                </div>
              )}
            </div>
            {errorMessages.email && (
              <div style={{ color: 'red' }}>{errorMessages.email}</div>
            )}
          </div>
          <div className='signup-form__email'>
            <h1>Email</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleInput}
                className='signup-form__text'
              />
              {errorMessages.email && (
                <div className='error-svg'>
                  <ErrorSVG />
                </div>
              )}
            </div>
            {errorMessages.email && (
              <div style={{ color: 'red' }}>{errorMessages.email}</div>
            )}
          </div>
          <div className='signup-form__password'>
            <h1>Password</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleInput}
                className='signup-form__text'
              />
              {errorMessages.password && (
                <div className='error-svg'>
                  <ErrorSVG />
                </div>
              )}
            </div>
            {errorMessages.password && (
              <div style={{ color: 'red' }}>{errorMessages.password}</div>
            )}
            <div className='checkbox'>
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </div>
          </div>
          <Captcha />
          <GeneralBtn BtnText='Sign up' onClick={handleClick} />
        </form>
      </InputboxStyle>
    </>
  );
};

export default Inputbox;
