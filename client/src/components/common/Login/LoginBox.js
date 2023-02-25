import { GeneralBtn } from '../Buttons';
import { Link } from 'react-router-dom';
import BoxStyle from '../Login/LoginStyle';
import OAuthBox from '../../Signup/OAuthbox';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SOiconSVG } from '../../../assets/CommonSVG';
import { ErrorSVG, SignUpSVG } from '../../../assets/LoginSVG';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 유효성 검사
  useEffect(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

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

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      window.alert('please fill in the whole forms');
      return;
    }

    // HTTP Request
    try {
      const response = await axios.post(
        'http://localhost:8080/user',
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');

      // Response header 저장
      const userURI = response.headers['location'];
      console.log(userURI);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <BoxStyle>
        <div className='all-box'>
          {/* 로고 & OAuth 버튼 */}
          <div className='all-oauth-box'>
            <div className='oauth-box'>
              <div className='logo'>
                <SOiconSVG />
              </div>
              <OAuthBox />
            </div>
          </div>
          {/* 로그인 박스  */}
          <div className='login-box'>
            <form className='login-form' onSubmit={handleSubmit}>
              <div className='login-form__email'>
                <h1>Email</h1>
                <div style={{ position: 'relative' }}>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setEmailError(validateEmail(email))}
                    className='login-form__text '
                  />
                  {emailError && (
                    <div className='error-svg'>
                      <ErrorSVG />
                    </div>
                  )}
                </div>
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
              </div>
              <div className='login-form__password'>
                <h1>Password</h1>
                <div style={{ position: 'relative' }}>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    className='login-form__text '
                  />
                  {passwordError && (
                    <div className='error-svg'>
                      <ErrorSVG />
                    </div>
                  )}
                </div>
                {passwordError && (
                  <div style={{ color: 'red' }}>{passwordError}</div>
                )}
              </div>
              <GeneralBtn onClick={handleSubmit} BtnText='Log in' />
            </form>
          </div>
          {/* Support Message */}
          <div className='support-messages'>
            <div>
              Don&apos;t have an account?<Link to='/signup'> Sign up </Link>
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

export default LoginBox;
