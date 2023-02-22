import styled from 'styled-components';
import SignupBox from '../components/Signup/SignupBox';
import SignupText from '../components/Signup/SignupText';
import Header from '../components/common/Header/Header';

const AllBoxStyle = styled.div`
  background-color: #f9f9f9;
  body {
    height: 100%;
    width: 100%;
  }
`;

const ContainerStyle = styled.div`
  @media (min-width: 851px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 60px;
    .container-text {
      display: none;
    }
    .container-left {
      display: grid;
      grid-column-start: 1;
      place-items: center;
    }
    .container-right {
      display: flex;
      justify-content: center;
      grid-column-start: 2;
      margin: 20px;
    }
  }
  @media (max-width: 850px) {
    display: grid;
    padding: 60px;
    .container-left {
      display: none;
    }
    .container-text {
      display: grid;
      place-items: center;
      font-size: 22px;
      text-align: center;
      margin-top: 15px;
    }
    .container-right {
      display: grid;
      place-items: center;
      margin: 20px;
    }
  }
  @media (max-width: 640px) {
    display: grid;
    padding: 60px;
    .container-left {
      display: none;
    }
    .container-text {
      display: grid;
      place-items: center;
      font-size: 18px;
      text-align: center;
      margin-top: 15px;
    }
    .container-right {
      display: grid;
      place-items: center;
      margin: 20px;
    }
  }
`;

const SignupP = () => {
  return (
    <>
      <AllBoxStyle>
        <body>
          <div className='header'>
            <Header />
          </div>
          <ContainerStyle>
            <div className='container-text'>
              Create your Stack Overflow account.
              <br /> It’s free and only takes a minute.
            </div>
            <div className='container-left'>
              <div>
                <SignupText />
              </div>
            </div>
            <div className='container-right'>
              <div>
                <SignupBox />
              </div>
            </div>
          </ContainerStyle>
        </body>
      </AllBoxStyle>
    </>
  );
};

export default SignupP;
