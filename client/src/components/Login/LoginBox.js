import styled from 'styled-components';
import LoginButton from '../Buttons';

const BoxStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);

  .formContainer {
    background-color: white;
    display: grid;
    grid-column-start: 2;
    grid-row-start: 3;
    padding: 24px;
    width: 240px;
    height: 188px;
  }
  .loginForm {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    padding-bottom: 10px;
  }
`;

const LoginBox = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <>
      <div className='LoginBox'>
        <BoxStyle>
          <div className='formContainer'>
            <div className='loginForm'>
              <div>Email</div>
              <input type='Email' />
              <div>Password</div>
              <input type='Password' />
            </div>
            <LoginButton className='login-button' onClick={handleClick} />
          </div>
        </BoxStyle>
      </div>
    </>
  );
};

export default LoginBox;
