import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '../../../assets/Header/HeaderLogo.JPG';
import UserNav from './UserNav';
import ProductsNav from './ProductsNav';
import Search from './Search';
import LoginNav from './LoginNav';
import { GeneralBtn } from '../Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SOLogoSvg } from '../../../assets/Header/HeaderSVG';
import { useNavigate } from 'react-router-dom';

import { GlobeSVG } from '../../../assets/NavSvg';

const StyledHeader = styled.div`
  top: 3px;
  width: 100%;
  height: 50px;
  background-color: #f8f9f9;
  position: fixed;
  z-index: 10;
  margin: 0 auto;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const HeaderLine = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 3px;
  z-index: 10;
  background-color: #f48225;
  z-index: 10;
`;

const HeaderContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
`;
const HeaderLogoImg = styled.img`
  width: 150px;
  height: 30px;
  margin-top: -4px;
  padding: 0 8px;
  cursor: pointer;
  @media (max-width: 640px) {
    display: none;
  }
`;
const HeaderLogoImgMini = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
    margin-top: -4px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
const NavigationBtn = styled.button`
  position: relative;
  cursor: pointer;
  font-size: 13px;
  color: rgb(82, 89, 96);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-radius: 1000px;
  background-color: rgb(0, 0, 0, 0);
  &:hover {
    background-color: #f48225;
    color: #232629;
  }
  @media (max-width: 640px) {
    display: ${props => props.display || 'block'};
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  @media (max-width: 640px) {
    display: block;
    background: none;
    cursor: pointer;
    margin-left: 15px;
    margin-right: 5px;
  }
`;

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isProductsClick, setIsProductsClick] = useState(false);
  const [isNavBtnClick, setIsNavBtnClick] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const HamRef = useRef(null);
  useEffect(() => {
    const handleWindowClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProductsClick(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  useEffect(() => {
    if (localStorage.accessToken !== undefined) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <HeaderLine />
      <StyledHeader>
        <HeaderContainer>
          <HamburgerBtn
            ref={HamRef}
            onClick={() => {
              setIsNavBtnClick(!isNavBtnClick);
            }}
          >
            <NavMini
              isNavBtnClick={isNavBtnClick}
              setIsNavBtnClick={setIsNavBtnClick}
              HamRef={HamRef}
            />
            <FontAwesomeIcon icon={faBars} size='xl' />
          </HamburgerBtn>
          <HeaderLogoImgMini>
            <SOLogoSvg />
          </HeaderLogoImgMini>
          <HeaderLogoImg
            src={HeaderLogo}
            alt='HeaderLogo'
            onClick={() => {
              navigate('/');
            }}
          />
          {isLogin ? (
            <NavigationBtn
              onClick={() => setIsProductsClick(true)}
              ref={dropdownRef}
            >
              Products
              {isProductsClick ? <ProductsNav /> : null}
            </NavigationBtn>
          ) : (
            <>
              <NavigationBtn display='none'>About</NavigationBtn>
              <NavigationBtn
                onClick={() => setIsProductsClick(true)}
                ref={dropdownRef}
              >
                Products
                {isProductsClick ? <ProductsNav /> : null}
              </NavigationBtn>
              <NavigationBtn display='none'>For Teams</NavigationBtn>
            </>
          )}
          <Search isLogin={isLogin} />
          {isLogin ? (
            <UserNav />
          ) : (
            <div style={{ marginRight: '7px' }}>
              <GeneralBtn
                BtnText='Log in'
                type='off'
                width='57px'
                height='32px'
                padding='0 10.4px'
                onClick={() => {
                  navigate('/login');
                }}
              />
            </div>
          )}
          {isLogin ? (
            <LoginNav setIsLogin={setIsLogin} />
          ) : (
            <div style={{ marginRight: '7px' }}>
              <GeneralBtn
                BtnText='Sign up'
                width='66px'
                height='32px'
                padding='0 10.4px'
                onClick={() => {
                  navigate('/signup');
                }}
              />
            </div>
          )}
        </HeaderContainer>
      </StyledHeader>
    </>
  );
}
export default Header;

const NavContainer = styled.div`
  width: 164px;
  min-width: 164px;
  position: fixed;
  top: 52px;
  left: -5px;
  padding-top: 10px;
  z-index: 9;
  background-color: white;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
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

export const NavMini = ({ setIsNavBtnClick, isNavBtnClick, HamRef }) => {
  const [currentLocation, setCurrentLocation] = useState('/');
  const navigate = useNavigate();

  const handleTabClick = location => {
    setCurrentLocation(location);
    navigate(location);
  };

  const NavRef = useRef(null);
  useEffect(() => {
    const handleWindowClick = e => {
      if (
        NavRef.current &&
        !NavRef.current.contains(e.target) &&
        HamRef.current &&
        !HamRef.current.contains(e.target)
      ) {
        setIsNavBtnClick(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <>
      {isNavBtnClick ? (
        <NavContainer ref={NavRef}>
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
      ) : (
        <></>
      )}
    </>
  );
};
