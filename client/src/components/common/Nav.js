import styled from 'styled-components';
import { useState } from 'react';
import { GlobeSVG } from '../../assets/NavSvg';

const NavContainer = styled.div`
  width: 164px;
  min-width: 164px;
  position: sticky;
  top: 53px;
  padding-top: 10px;
  z-index: 9;
  > div {
    height: 8%;
    width: 100%;
    color: #525960;
    padding-left: 13px;
    margin-bottom: 5px;
  }
  > nav {
    height: 92%;
    width: 100%;
  }
`;

const MenuContainer = styled.li`
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &.current {
    background-color: #f2f2f3;
    border-right: 3px solid #fc7730;
    > div {
      color: black;
      font-weight: 500;
    }
  }

  > div {
    color: #525960;
    font-size: 13px;
    width: 130px;
    height: 16px;
    padding-left: 3px;
    &:hover {
      color: black;
    }
  }
`;

const Nav = () => {
  const [isClicked, setIsClicked] = useState('questions');

  return (
    <NavContainer>
      <div>PUBLIC</div>
      <nav>
        <ol>
          <MenuContainer
            onClick={() => setIsClicked('questions')}
            className={isClicked === 'questions' ? 'current' : null}
          >
            <GlobeSVG />
            <div>Questions</div>
          </MenuContainer>

          <MenuContainer>
            <div>Tags</div>
          </MenuContainer>
          <MenuContainer>
            <div>Users</div>
          </MenuContainer>
          <MenuContainer>
            <div>Companies</div>
          </MenuContainer>
        </ol>
      </nav>
    </NavContainer>
  );
};

export default Nav;
