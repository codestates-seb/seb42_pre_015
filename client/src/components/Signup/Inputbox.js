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
  }
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .Password-message {
    white-space: pre-line;
    margin-top: 20px;
    margin-bottom: 30px;
    color: grey;
    font-size: 13px;
  }
`;
const ErrorMessages = styled.div`
  margin-bottom: 13px;
  color: red;
`;
const ErrorPosition = styled.svg`
  position: absolute;
  top: 14px;
  left: 230px;
  @media (max-width: 640px) {
    position: absolute;
    left: 190px;
  }
`;

const Inputbox = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
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
      setname(value);
      setErrorMessages({ ...errorMessages, name: '' });
    }
  };

  // login-button 제출 에러
  const handleSubmit = e => {
    e.preventDefault();
    const nameError = !email.trim() ? 'displayname cannot be empty' : '';
    const emailError = !email.trim() ? 'Email cannot be empty' : '';
    const passwordError = !password.trim() ? 'Password cannot be empty' : '';

    setErrorMessages({
      email: emailError,
      password: passwordError,
      name: nameError
    });
  };

  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <>
      <InputboxStyle>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-form__displayname'>
            <h1>Display name</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='displayname'
                name='displayname'
                value={name}
                onChange={handleInput}
                className='signup-form__text'
              />
              <ErrorPosition>
                {errorMessages.name && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {errorMessages.name && <div>{errorMessages.name}</div>}
            </ErrorMessages>
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
              <ErrorPosition>
                {errorMessages.email && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {errorMessages.email && <div>{errorMessages.email}</div>}
            </ErrorMessages>
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
              <ErrorPosition>
                {errorMessages.password && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {errorMessages.password && <div>{errorMessages.password}</div>}
            </ErrorMessages>
            <div className='Password-message'>
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
