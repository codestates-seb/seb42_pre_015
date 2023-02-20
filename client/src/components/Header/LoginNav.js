import styled from 'styled-components';
import { ReactComponent as MessagesIcon } from '../../assets/Header/MessagesIcon.svg';
import { ReactComponent as Achievements } from '../../assets/Header/Achievements .svg';
import { ReactComponent as HelpIcon } from '../../assets/Header/HelpIcon.svg';
import { ReactComponent as CommunityIcon } from '../../assets/Header/CommunityIcon.svg';
import { ReactComponent as InboxMailIcon } from '../../assets/Header/InboxMailIcon.svg';
import { ReactComponent as GlassesIcon } from '../../assets/Header/GlassesIcon.svg';
import SOLogo from '../../assets/Header/SOLogo.png';

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
  cursor: default;
  background-color: white;
  position: absolute;
  top: 100%;
  left: ${props => props.left || '-835%'};
  width: ${props => props.width || '374px'};
  height: ${props => props.height || '500px'};
  z-index: 999;
  border: 1px solid hsl(210, 8%, 85%);
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;

const DropDownHeader = styled.div`
  background-color: ${props => props.bg || '#f1f2f3'};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  a {
    color: ${props => props.bg || 'hsl(210, 8%, 35%)'};
    font-size: 11px;
  }
`;
const DropDownFont = styled.a`
  color: rgb(0, 116, 204);
  font-size: 12px;
`;
const InBoxMessege = styled.div`
  width: 100%;
  border-top: ${props => props.bt || '1px solid rgb(186, 191, 196)'};
  border-bottom: 1px solid rgb(186, 191, 196);
  padding: 8px;
`;
const InBoxMessegeTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InBoxMessegeLeft = styled.div`
  display: flex;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  span {
    color: rgb(82, 89, 96);
    font-size: 12px;
  }
`;
const InBoxMessegeRight = styled.div`
  display: flex;
  a {
    color: rgb(82, 89, 96);
    font-size: 12px;
    margin-right: 6px;
  }
`;
const InBoxMessageBottom = styled.div`
  margin: 0 auto;
  color: rgb(0, 99, 191);
  font-size: 12px;
  font-weight: 700;
  padding: 3px 25px 8px 25px;
  text-align: left;
  span {
    max-width: 100%;
    display: inline-block;
    white-space: normal;
  }
`;
const AchievementsDec = styled.div`
  display: block;
  text-align: left;
  p {
    padding: 5px 10px;
    font-size: 12px;
  }
`;
const HelpContainer = styled.div`
  width: 100%;
  text-align: left;
  border-bottom: 1px solid rgb(186, 191, 196);
  padding: 10px;
  a {
    color: rgb(0, 116, 204);
    font-size: 12px;
  }
  p {
    font-size: 12px;
    text-align: left;
    max-width: 100%;
    display: inline-block;
    white-space: normal;
  }
`;
const CurrentBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 7px;
  div {
    display: flex;
    img {
      margin-left: 5px;
      width: 16px;
      height: 16px;
    }
    p {
      margin-left: 8px;
    }
    a {
      margin-left: 8px;
      font-size: 12px;
    }
  }
`;
const SearchForm = styled.form`
  margin-top: 10px;
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
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  padding: 7.8px 9.1px 7.8px 32px;
  background-color: rgb(255, 255, 255);
  border: 1px solid hsl(210, 8%, 75%);
  &:focus {
    outline: none;
    -webkit-box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
    box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
  }
`;

export default function LoginNav({
  isMessagesIconClick,
  isAchievementsClick,
  isHelpIconClick,
  isCommunityIconClick,
  MessagesIconClickHandler,
  AchievementsClickHandler,
  HelpIconClickHandler,
  CommunityIconClickHandler
}) {
  return (
    <SvgList>
      <button
        onClick={() => {
          MessagesIconClickHandler();
        }}
      >
        <a href='/#'>
          <MessagesIcon></MessagesIcon>
        </a>
        {isMessagesIconClick ? (
          <UsersNavigation height='423px'>
            <DropDownHeader>
              <a href='/#'>INBOX (ALL)</a>
              <DropDownFont>Mark all as read</DropDownFont>
            </DropDownHeader>
            <InBoxMessege>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <img src={SOLogo} alt='SOLogo'></img>
                  <span>Welcome</span>
                </InBoxMessegeLeft>
                <InBoxMessegeRight>
                  <a href='/#'>Feb 15 at 6:59</a>
                  <InboxMailIcon />
                </InBoxMessegeRight>
              </InBoxMessegeTop>
              <InBoxMessageBottom>
                <span>
                  Welcome to Stack Overflow! Take the 2-minute site tour to earn
                  yout first badge.
                </span>
              </InBoxMessageBottom>
            </InBoxMessege>
          </UsersNavigation>
        ) : null}
      </button>
      <button
        onClick={() => {
          AchievementsClickHandler();
        }}
      >
        <a href='/#'>
          <Achievements></Achievements>
        </a>
        {isAchievementsClick ? (
          <UsersNavigation left='-337px' height='422px'>
            <DropDownHeader>
              <a href='/#'>ACHIEVEMENTS UTC TIME 02:04</a>
              <DropDownFont>privileges · badges</DropDownFont>
            </DropDownHeader>
            <AchievementsDec>
              <p>You have not yet earned any achievements.</p>
              <p>Why not take the tour or fill out your profile?</p>
            </AchievementsDec>
          </UsersNavigation>
        ) : null}
      </button>
      <button
        onClick={() => {
          HelpIconClickHandler();
        }}
      >
        <a href='/#'>
          <HelpIcon />
        </a>
        {isHelpIconClick ? (
          <UsersNavigation left='-176px' width='214px' height='328px'>
            <HelpContainer>
              <a href='/#'>Toue</a>
              <p>Start here for a quick overview of the site</p>
            </HelpContainer>
            <HelpContainer>
              <a href='/#'>Help Center</a>
              <p>Detailed answers to any questions you might have</p>
            </HelpContainer>
            <HelpContainer>
              <a href='/#'>Meta</a>
              <p>Discuss the workings and policies of this site</p>
            </HelpContainer>
            <HelpContainer>
              <a href='/#'>About Us</a>
              <p>Learn more about Stack Overflow the company</p>
            </HelpContainer>
            <HelpContainer>
              <a href='/#'>Business</a>
              <p>Learn more about our products</p>
            </HelpContainer>
          </UsersNavigation>
        ) : null}
      </button>
      <button
        onClick={() => {
          CommunityIconClickHandler();
        }}
      >
        <a href='/#'>
          <CommunityIcon></CommunityIcon>
        </a>
        {isCommunityIconClick ? (
          <UsersNavigation left='-337px' height='398px'>
            <DropDownHeader>
              <a href='/#'>CURRENT COMMUNITY</a>
            </DropDownHeader>
            <CurrentBody>
              <div>
                <img src={SOLogo} alt='SOLogo'></img>
                <a href='/#'>Stack Overflow</a>
              </div>
              <div>
                <a href='#/'>help</a>
                <a href='#/'>chat</a>
                <a
                  href='#/'
                  onClick={() => {
                    console.log('d');
                  }}
                >
                  log out
                </a>
              </div>
            </CurrentBody>
            <CurrentBody>
              <div>
                <p>ㄴ</p>
                <img src={SOLogo} alt='SOLogo'></img>
                <a href='/#'>Meta Stack Overflow</a>
              </div>
            </CurrentBody>
            <DropDownHeader>
              <a href='/#'>YOUR COMMUNITIES</a>
            </DropDownHeader>
            <CurrentBody>
              <div>
                <img src={SOLogo} alt='SOLogo'></img>
                <a href='/#'>Stack Overflow</a>
              </div>
              <div>
                <p>1</p>
              </div>
            </CurrentBody>
            <DropDownHeader>
              <a href='/#'>MORE STACK EXCHANGE COMMUNITIES</a>
              <a href='/#'>company blog</a>
            </DropDownHeader>
            <SearchForm>
              <SearchIcon>
                <GlassesIcon />
              </SearchIcon>
              <SearchInput placeholder='Find a Stack Exchange community'></SearchInput>
            </SearchForm>
            <InBoxMessege bt='none'>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <img src={SOLogo} alt='SOLogo'></img>
                  <span>3D Printing</span>
                </InBoxMessegeLeft>
              </InBoxMessegeTop>
              <InBoxMessageBottom>
                <span>For 3D printing enthusiats</span>
              </InBoxMessageBottom>
            </InBoxMessege>
            <InBoxMessege bt='none'>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <img src={SOLogo} alt='SOLogo'></img>
                  <span>Academia</span>
                </InBoxMessegeLeft>
              </InBoxMessegeTop>
              <InBoxMessageBottom>
                <span>
                  For academics and those enrolled in higher education
                </span>
              </InBoxMessageBottom>
            </InBoxMessege>
            <InBoxMessege bt='none'>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <img src={SOLogo} alt='SOLogo'></img>
                  <span>Amateur Radio</span>
                </InBoxMessegeLeft>
              </InBoxMessegeTop>
              <InBoxMessageBottom>
                <span>For amateur radio enthusiasts</span>
              </InBoxMessageBottom>
            </InBoxMessege>
          </UsersNavigation>
        ) : null}
      </button>
    </SvgList>
  );
}
