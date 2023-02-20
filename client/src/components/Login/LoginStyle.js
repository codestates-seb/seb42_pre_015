import styled from 'styled-components';

const BoxStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  padding: 24px;
  margin-top: 70px;

  .all-box {
    display: grid;
    grid-column-start: 2;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 20px;
    .all-oauth-box {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
    }
    .oauth-box {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-row-start: 2;
      row-gap: 5px;
    }
    .logo-box {
      display: grid;
      place-items: center;
      grid-template-rows: repeat(2, 1fr);
      .logo {
        grid-row-start: 2;
        cursor: pointer;
      }
    }
  }
  .login-box {
    background-color: white;
    padding: 24px;
    grid-row-start: 2;
    width: 307.09px;
    height: 283.56px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    @media (max-width: 640px) {
      width: 267px;
    }
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
  }
  .error-svg {
    position: absolute;
    top: 12px;
    left: 230px;
    @media (max-width: 640px) {
      left: 190px;
    }
  }
`;
export default BoxStyle;
