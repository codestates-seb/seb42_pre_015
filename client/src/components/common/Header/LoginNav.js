import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import {
  MessageSvg,
  AchievementsSvg,
  HelpSvg,
  CommunitySvg,
  MailSvg,
  GlassesSvg,
  SOIconSvg
} from '../../../assets/Header/HeaderSVG';

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
      p {
        opacity: 0.8;
      }
    }
    p {
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
  span {
    margin-left: 8px;
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
  &:hover {
    background-color: #d6d9dc;
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

export default function LoginNav({ setIsLogin }) {
  const [isMessagesIconClick, setIsMessagesIconClick] = useState(false);
  const [isAchievementsClick, setIsAchievementsClick] = useState(false);
  const [isHelpIconClick, setIsHelpIconClick] = useState(false);
  const [isCommunityIconClick, setIsCommunityIconClick] = useState(false);

  const messagesRef = useRef(null);
  const achievementsRef = useRef(null);
  const helpIconRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    const handleWindowClick = e => {
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setIsMessagesIconClick(false);
      }
      if (
        achievementsRef.current &&
        !achievementsRef.current.contains(e.target)
      ) {
        setIsAchievementsClick(false);
      }
      if (helpIconRef.current && !helpIconRef.current.contains(e.target)) {
        setIsHelpIconClick(false);
      }
      if (communityRef.current && !communityRef.current.contains(e.target)) {
        setIsCommunityIconClick(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <SvgList>
      <button
        onClick={() => {
          setIsMessagesIconClick(true);
        }}
        ref={messagesRef}
      >
        <p>
          <MessageSvg></MessageSvg>
        </p>
        {isMessagesIconClick ? (
          <UsersNavigation height='423px'>
            <DropDownHeader>
              <a href='/#'>INBOX (ALL)</a>
              <DropDownFont>Mark all as read</DropDownFont>
            </DropDownHeader>
            <InBoxMessege>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <SOIconSvg />
                  <span>Welcome</span>
                </InBoxMessegeLeft>
                <InBoxMessegeRight>
                  <a href='/#'>Feb 15 at 6:59</a>
                  <MailSvg />
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
          setIsAchievementsClick(true);
        }}
        ref={achievementsRef}
      >
        <p>
          <AchievementsSvg></AchievementsSvg>
        </p>
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
          setIsHelpIconClick(true);
        }}
        ref={helpIconRef}
      >
        <p>
          <HelpSvg />
        </p>
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
          setIsCommunityIconClick(true);
        }}
        ref={communityRef}
      >
        <p>
          <CommunitySvg></CommunitySvg>
        </p>
        {isCommunityIconClick ? (
          <UsersNavigation left='-337px' height='398px'>
            <DropDownHeader>
              <a href='/#'>CURRENT COMMUNITY</a>
            </DropDownHeader>
            <CurrentBody>
              <div>
                <SOIconSvg />
                <a href='/#'>Stack Overflow</a>
              </div>
              <div>
                <a href='#/'>help</a>
                <a href='#/'>chat</a>
                <a
                  href='#/'
                  onClick={() => {
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('refreshToken');
                    window.localStorage.removeItem('userId');
                    window.localStorage.removeItem('name');
                    window.location.href = '/';
                  }}
                >
                  log out
                </a>
              </div>
            </CurrentBody>
            <CurrentBody>
              <div>
                <p>ㄴ</p>
                <SOIconSvg />
                <a href='/#'>Meta Stack Overflow</a>
              </div>
            </CurrentBody>
            <DropDownHeader>
              <a href='/#'>YOUR COMMUNITIES</a>
            </DropDownHeader>
            <CurrentBody>
              <div>
                <SOIconSvg />
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
                <GlassesSvg />
              </SearchIcon>
              <SearchInput placeholder='Find a Stack Exchange community'></SearchInput>
            </SearchForm>
            <InBoxMessege bt='none'>
              <InBoxMessegeTop>
                <InBoxMessegeLeft>
                  <SOIconSvg />
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
                  <SOIconSvg />
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
                  <SOIconSvg />
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
