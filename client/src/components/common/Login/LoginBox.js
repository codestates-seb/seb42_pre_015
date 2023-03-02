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
    if (email) setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (password) setPasswordError(validatePassword(password));
  }, [password]);

  const validateEmail = email => {
    const constraint = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email cannot be empty';
    } else if (!constraint.test(email)) {
      return 'Email must be a well-formed email address';
    }
    return '';
  };

  const validatePassword = password => {
    const constraint = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) {
      return 'Password cannot be empty';
    } else if (password.length < 8) {
      return 'Passwords must contain at least 8 characters';
    } else if (!constraint.test(password)) {
      return 'Please add at least 1 letter and 1 number.';
    }
    return '';
  };

  // 제출 버튼 event
  const handleSubmit = e => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    axios
      .post(process.env.REACT_APP_DB_HOST + '/login', {
        username: email,
        password: password
      })
      .then(response => {
        const { authorization: accessToken, refresh: refreshToken } =
          response.headers;

        // JWT를 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 로그인 한 유저의 아이디를 로컬 스토리지에 저장
        const [userId] = response.data;
        localStorage.setItem('userId', userId);

        const userInfo = response.data.reduce((acc, cur) => {
          const [key, value] = cur.split(': ');
          acc[key] = value;
          return acc;
        }, {});
        localStorage.setItem('userId', userInfo['userId']);
        localStorage.setItem('name', userInfo['name']);

        // 로그인 성공시 리다이렉션
        window.location.href = '/';
      })
      .catch(error => {
        console.log(error);
        alert('아이디와 비밀번호가 일치하지 않습니다.');
      });
  };

  return (
    <>
      <BoxStyle>
        <div className='all-box'>
          {/* 로고 & OAuth 버튼 */}
          <div className='all-oauth-box'>
            <div className='oauth-box'>
              <div className='logo'>
                <Link to='/'>
                  <SOiconSVG />
                </Link>
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
                    style={{
                      border: emailError
                        ? '2px solid red'
                        : '2px solid yellowgreen'
                    }}
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
                    style={{
                      border: passwordError
                        ? '2px solid red'
                        : '2px solid yellowgreen'
                    }}
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
              <GeneralBtn BtnText='Log in' />
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
