import styled from 'styled-components';
import { ReactComponent as MessagesIcon } from '../../assets/Header/MessagesIcon.svg';
import { ReactComponent as Achievements } from '../../assets/Header/Achievements .svg';
import { ReactComponent as HelpIcon } from '../../assets/Header/HelpIcon.svg';
import { ReactComponent as CommunityIcon } from '../../assets/Header/CommunityIcon.svg';

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
        {isMessagesIconClick ? <UsersNavigation /> : null}
      </button>
      <button
        onClick={() => {
          AchievementsClickHandler();
        }}
      >
        <a href='/#'>
          <Achievements></Achievements>
        </a>
        {isAchievementsClick ? <UsersNavigation left='-337px' /> : null}
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
          <UsersNavigation left='-176px' width='214px' />
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
        {isCommunityIconClick ? <UsersNavigation left='-337px' /> : null}
      </button>
    </SvgList>
  );
}
