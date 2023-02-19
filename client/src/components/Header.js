import { useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '../assets/Header/HeaderLogo.JPG';
import { ReactComponent as MessagesIcon } from '../assets/Header/MessagesIcon.svg';
import { ReactComponent as Achievements } from '../assets/Header/Achievements .svg';
import { ReactComponent as HelpIcon } from '../assets/Header/HelpIcon.svg';
import { ReactComponent as CommunityIcon } from '../assets/Header/CommunityIcon.svg';
import { ReactComponent as GlassesIcon } from '../assets/Header/GlassesIcon.svg';

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f8f9f9;
  display: fixed;
  z-index: 10;
  margin: 0 auto;
`;

const HeaderLine = styled.div`
  width: 100%;

  height: 3px;
  background-color: #f48225;
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
    background-color: #e3e6e8;
    color: #232629;
  }
`;
const SearchForm = styled.form`
  padding: 0 8px;
  position: relative;
  border: none;
`;
const SearchIcon = styled.div`
  position: absolute;
  top: 6px;
  left: 15px;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  width: ${props => props.width || '717.828px'};
  padding: 7.8px 9.1px 7.8px 32px;
  background-color: rgb(255, 255, 255);
  border: 1px solid hsl(210, 8%, 75%);
  &:focus {
    outline: none;
    -webkit-box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
    box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
  }
`;

const ProductsNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 150%;
  left: -80%;
  width: 210.656px;
  z-index: 2001;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;
const ProductsLi = styled.li`
  margin: 6px;
  padding: 6px;
  text-align: left;
  border-radius: 3px;
  display: block;
`;
const ProductsDes = styled.span`
  max-width: 100%;
  display: inline-block;
  font-size: 12px;
  color: rgb(106, 115, 124);
  white-space: normal;
`;

const ProductsTitle = styled.span`
  max-width: 100%;
  display: block;
  font-size: 13px;
  color: black;
`;

const SearchInputNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 43px;
  left: 8px;
  width: ${props => props.width || '717.828px'};
  z-index: 2000;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;
const SearchDiv = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 50%;
    div {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 12px;
    }
  }
`;

const SearchNavFont = styled.span`
  font-size: 13px;
  color: black;
`;
const SearchNavFont2 = styled.span`
  font-size: 13px;
  color: rgb(106, 115, 124);
`;

const SvgList = styled.ol`
  display: flex;
  height: 100%;
  list-style: none;
  button {
    align-items: center;
    background-color: #f8f9f9;
    position: relative;
    display: inline-flex;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: #e3e6e8;
      a {
        opacity: 0.8;
      }
    }
    a {
      display: flex;
      align-items: center;
      position: relative;
      text-align: left;
      opacity: 0.6;
    }
  }
`;
const UsersNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 100%;
  left: ${props => props.left || '-835%'};
  width: ${props => props.width || '374px'};
  height: 500px;
  z-index: 999;
  border: 1px solid hsl(210, 8%, 85%);
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;
const UserNav = styled.nav`
  height: 100%;
  display: block;
  ol {
    display: flex;
    height: 100%;
    justify-content: center;
    list-style: none;
    li {
      padding: 0 12px;
      display: inline-flex;
      justify-content: center;
      padding: 0 '12px';
      cursor: pointer;
      &:hover {
        background-color: #e3e6e8;
      }
      span {
        display: inline-flex;
        align-items: center;
        font-weight: 700;
        font-size: 12px;
      }
      a {
        display: inline-flex;
        align-items: center;
        margin-right: 5px;
        position: relative;
        text-align: center;
        color: rgb(82, 89, 96);
        img {
          width: 24px;
          height: 24px;
          border-radius: 4px;
        }
      }
    }
  }
`;

function Header() {
  const [isLogin] = useState(true);
  const [isProductsClick, setIsProductsClick] = useState(false);
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [isMessagesIconClick, setIsMessagesIconClick] = useState(false);
  const [isAchievementsClick, setIsAchievementsClick] = useState(false);
  const [isHelpIconClick, setIsHelpIconClick] = useState(false);
  const [isCommunityIconClick, setIsCommunityIconClick] = useState(false);

  return (
    <div>
      <HeaderLine />
      <StyledHeader>
        <HeaderContainer>
          <HeaderLogoImg src={HeaderLogo} alt='HeaderLogo' />
          {isLogin ? (
            <NavigationBtn onClick={() => setIsProductsClick(pre => !pre)}>
              Products
              {isProductsClick ? (
                <ProductsNavigation>
                  <ol>
                    <ProductsLi>
                      <ProductsTitle>Stack Overflow</ProductsTitle>
                      <ProductsDes>Public questions & answers</ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Stack Overflow for Teams</ProductsTitle>
                      <ProductsDes>
                        where developers & technologists share private Knowledge
                        with coworkers
                      </ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Talent</ProductsTitle>
                      <ProductsDes>Build your employer brand</ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Advertising</ProductsTitle>
                      <ProductsDes>
                        Reach developers & technologists worldwide
                      </ProductsDes>
                    </ProductsLi>
                  </ol>
                </ProductsNavigation>
              ) : null}
            </NavigationBtn>
          ) : (
            <>
              <NavigationBtn>About</NavigationBtn>
              <NavigationBtn onClick={() => setIsProductsClick(pre => !pre)}>
                Products
                {isProductsClick ? <ProductsNavigation /> : null}
              </NavigationBtn>
              <NavigationBtn>For Teams</NavigationBtn>
            </>
          )}
          <SearchForm>
            <SearchIcon>
              <GlassesIcon />
            </SearchIcon>
            {isLogin ? (
              <>
                <SearchInput
                  width='776.734px'
                  placeholder='Search...'
                  onFocus={() => {
                    setIsSearchClick(true);
                  }}
                />
                {isSearchClick ? (
                  <SearchInputNavigation width='776.734px'>
                    <SearchDiv>
                      <div>
                        <div>
                          <SearchNavFont>[tag]</SearchNavFont>
                          <SearchNavFont2>
                            &nbsp;serch within a tag
                          </SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>user:1234</SearchNavFont>
                          <SearchNavFont2>&nbsp;serch by author</SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>"words here"</SearchNavFont>
                          <SearchNavFont2>&nbsp;exact phrase</SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>collective:"Name"</SearchNavFont>
                          <SearchNavFont2>
                            &nbsp;collective content
                          </SearchNavFont2>
                        </div>
                      </div>
                      <div>
                        <div>
                          <SearchNavFont>answers:0</SearchNavFont>
                          <SearchNavFont2>
                            &nbsp;unanswered questions
                          </SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>score:3</SearchNavFont>
                          <SearchNavFont2>
                            &nbsp;post with a 3+ score
                          </SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>is:question</SearchNavFont>
                          <SearchNavFont2>&nbsp;type of post</SearchNavFont2>
                        </div>
                        <div>
                          <SearchNavFont>isaccepted:yes</SearchNavFont>
                          <SearchNavFont2>
                            &nbsp;search within status
                          </SearchNavFont2>
                        </div>
                      </div>
                    </SearchDiv>
                  </SearchInputNavigation>
                ) : null}
              </>
            ) : (
              <>
                <SearchInput
                  width='717.828px'
                  placeholder='Search...'
                  onFocus={() => {
                    setIsSearchClick(true);
                  }}
                />
                {isSearchClick ? (
                  <SearchInputNavigation width='717.828px'></SearchInputNavigation>
                ) : null}
              </>
            )}
          </SearchForm>
          <UserNav>
            <ol>
              <li>
                <a href='/#'>
                  <img
                    src='https://lh3.googleusercontent.com/a/AEdFTp6G9ZfXKo7FPo_1fE9FtMz6i7hPnBBBdbF-WjOv=k-s48'
                    alt='user'
                  ></img>
                </a>
                <span>1</span>
              </li>
            </ol>
          </UserNav>
          <SvgList>
            <button
              onClick={() => {
                setIsMessagesIconClick(pre => !pre);
              }}
            >
              <a href='/#'>
                <MessagesIcon></MessagesIcon>
              </a>
              {isMessagesIconClick ? <UsersNavigation /> : null}
            </button>
            <button
              onClick={() => {
                setIsAchievementsClick(pre => !pre);
              }}
            >
              <a href='/#'>
                <Achievements></Achievements>
              </a>
              {isAchievementsClick ? <UsersNavigation left='-337px' /> : null}
            </button>
            <button
              onClick={() => {
                setIsHelpIconClick(pre => !pre);
              }}
            >
              <a href='/#'>
                <HelpIcon />
              </a>
              {isHelpIconClick ? (
                <UsersNavigation left='-176px' width='214px' />
              ) : null}
            </button>
            <button
              onClick={() => {
                setIsCommunityIconClick(pre => !pre);
              }}
            >
              <a href='/#'>
                <CommunityIcon></CommunityIcon>
              </a>
              {isCommunityIconClick ? <UsersNavigation left='-337px' /> : null}
            </button>
          </SvgList>
        </HeaderContainer>
      </StyledHeader>
    </div>
  );
}
export default Header;
