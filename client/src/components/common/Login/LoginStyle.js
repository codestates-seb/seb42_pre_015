import styled from 'styled-components';

const BoxStyle = styled.div`
  grid-column-start: 2;
  .all-box {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 20px;
    width: 307.09px;
    @media (max-width: 640px) {
      width: 290px;
    }

    .oauth-box {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      margin-top: 20px;
    }
    .logo {
      margin-top: 70px;
      cursor: pointer;
      display: grid;
      place-items: center;
    }
  }
  .login-box {
    background-color: white;
    padding: 24px;
    grid-row-start: 2;
    height: 283.56px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
  .login-box > .login-form {
    display: grid;
    grid-template-rows: repeat(2, 1fr) 0.5fr;
    row-gap: 2px;
    height: 100%;
  }
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .login-form__text {
    border: 1px solid black;
    border-radius: 5px;
    height: 35px;
    width: 100%;
    margin: 5px 0;
    @media (max-width: 640px) {
      width: 100%;
    }
  }
  /* .login-form__text:focus {
    border: 3px solid blue;
  } */
  .error-svg {
    position: absolute;
    top: 12px;
    left: 230px;
    @media (max-width: 640px) {
      left: 210px;
    }
  }
  .support-messages {
    div {
      font-size: 13px;
      margin: 10px;
      text-align: center;
      a {
        font-size: 14px;
        color: hsl(206deg 100% 40%);
        margin-left: 5px;
        :hover {
          color: hsl(206deg 100% 52%);
        }
      }
    }
  }
`;
export default BoxStyle;
