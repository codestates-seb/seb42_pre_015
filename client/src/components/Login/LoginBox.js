import styled from 'styled-components';
import LoginButton from '../Buttons';

const BoxStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  padding: 24px;
  .login-box {
    display: grid;
    grid-column-start: 2;
    grid-template-rows: repeat(3, 1fr);
  }
  .Container {
    background-color: white;
    padding: 24px;
    grid-row-start: 2;
    width: 307.09px;
    height: 283.56px;
  }
  .login-form {
    display: grid;
    grid-template-rows: 0.5fr 1fr 0.5fr 1fr 0.6fr;
    row-gap: 2px;
    height: 100%;
  }
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .login__text {
    border: 1px solid black;
    border-radius: 5px;
    height: 33px;
  }
`;

const LoginBox = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <>
      <BoxStyle>
        <div className='login-box'>
          <div className='Container'>
            <div className='login-form'>
              <h1>Email</h1>
              <input type='Email' className='login__text' />
              <h1>Password</h1>
              <input type='Password' className='login__text' />
              <LoginButton className='login__button' onClick={handleClick} />
            </div>
          </div>
        </div>
      </BoxStyle>
    </>
  );
};

export default LoginBox;
