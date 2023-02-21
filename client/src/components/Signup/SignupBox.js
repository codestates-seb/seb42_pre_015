import {
  GoogleBtn,
  GithubBtn,
  FacebookBtn,
  GeneralBtn
} from '../common/Buttons';
import BoxStyle from './SignupStyle';
import { useState } from 'react';
import { ErrorSVG, SignUpSVG } from '../../assets/LoginSVG';

const SignupBox = () => {
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
      <BoxStyle>
        <div className='all-box'>
          {/* 로고 & OAuth 버튼 */}
          <div className='all-oauth-box'>
            <div className='oauth-box'>
              <GoogleBtn />
              <GithubBtn />
              <FacebookBtn />
            </div>
          </div>
          {/* 회원가입 박스  */}
          <div className='signup-box'>
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
              </div>
              <div className='checkbox'>
                <input type={'checkbox'} />
                Opt-in to receive occasional product updates, user research
                invitations, company announcements, and digests.
              </div>
              <GeneralBtn BtnText='Sign up' onClick={handleClick} />
            </form>
          </div>
          {/* Support Message */}
          <div className='support-messages'>
            <div>
              Already have an accout? <a href='/'> Log in </a>
            </div>
            <div>
              Are you an employer?
              <a href='/'>
                Sign up on Talent <SignUpSVG className='signup-icon' />
              </a>
            </div>
          </div>
        </div>
      </BoxStyle>
    </>
  );
};

export default SignupBox;
