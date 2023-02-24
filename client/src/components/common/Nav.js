import styled from 'styled-components';
import { useState } from 'react';
import { GlobeSVG } from '../../assets/NavSvg';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
  width: 164px;
  min-width: 164px;
  position: sticky;
  top: 53px;
  padding-top: 10px;
  z-index: 9;
  > div {
    width: 100%;
    color: #525960;
    padding-left: 13px;
    margin-bottom: 5px;
  }
  > nav {
    width: 100%;
  }
`;

const MenuContainer = styled.li`
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
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
  const [currentLocation, setCurrentLocation] = useState('/');
  const navigate = useNavigate();

  const handleTabClick = location => {
    setCurrentLocation(location);
    navigate(location);
  };

  return (
    <NavContainer>
      <div>PUBLIC</div>
      <nav>
        <ul>
          <MenuContainer
            onClick={() => handleTabClick('/')}
            className={currentLocation === '/' ? 'current' : null}
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
        </ul>
      </nav>
    </NavContainer>
  );
};

export default Nav;
