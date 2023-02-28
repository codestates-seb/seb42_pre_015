import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 유효성 검사

  useEffect(() => {
    setDisplayNameError(validateDisplayName(displayName));
  }, [displayName]);

  useEffect(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  const validateDisplayName = name => {
    const Constraint = /^[a-zA-Z가-힣\s]+$/;
    if (!name) {
      return 'Display name cannot be empty';
    } else if (!Constraint.test(name)) {
      return 'Display name must match the regular expression';
    }
    return '';
  };

  const validateEmail = email => {
    const Constraint = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email cannot be empty';
    } else if (!Constraint.test(email)) {
      return 'Email must be a well-formed email address';
    }
    return '';
  };

  const validatePassword = password => {
    const Constraint = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) {
      return 'Password cannot be empty';
    } else if (!Constraint.test(password)) {
      return 'Password must match the regular expression ';
    }
    return '';
  };

  // 제출 버튼 event

  const handleSubmit = async e => {
    e.preventDefault();
    const displayNameError = validateDisplayName(displayName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (displayNameError || emailError || passwordError) {
      setDisplayNameError(displayNameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      window.alert('please fill in the whole forms');
      return;
    }

    // HTTP Request
    try {
      const response = await axios.post('/user', {
        name: displayName,
        email: email,
        password: password
      });
      setDisplayName('');
      setEmail('');
      setPassword('');
      setDisplayNameError('');
      setEmailError('');
      setPasswordError('');

      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <InputboxStyle>
        <div className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-form__displayname'>
            <h1>Display name</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='text'
                name='displayName'
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                onBlur={() =>
                  setDisplayNameError(validateDisplayName(displayName))
                }
                className='signup-form__text'
              />
              <ErrorPosition>
                {displayNameError && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {displayNameError && (
                <div className='error-message'>{displayNameError}</div>
              )}
            </ErrorMessages>
          </div>
          <div className='signup-form__email'>
            <h1>Email</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailError(validateEmail(email))}
                className='signup-form__text'
              />
              <ErrorPosition>
                {emailError && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {emailError && <div className='error-message'>{emailError}</div>}
            </ErrorMessages>
          </div>
          <div className='signup-form__password'>
            <h1>Password</h1>
            <div style={{ position: 'relative' }}>
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setPasswordError(validatePassword(password))}
                className='signup-form__text'
              />
              <ErrorPosition>
                {passwordError && <ErrorSVG className='error-svg' />}
              </ErrorPosition>
            </div>
            <ErrorMessages>
              {passwordError && (
                <div className='error-message'>{passwordError}</div>
              )}
            </ErrorMessages>
            <div className='Password-message'>
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </div>
          </div>
          <Captcha />
          <GeneralBtn BtnText='Sign up' onClick={handleSubmit} />
        </div>
      </InputboxStyle>
    </>
  );
};

export default Inputbox;
