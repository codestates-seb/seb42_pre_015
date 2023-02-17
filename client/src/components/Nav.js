import styled from 'styled-components';

const Nav = () => {
  // 164px , 382.77 Px
  const NavContainer = styled.div`
    width: 164px;
    height: 382.77px;
    position: sticky;
    padding-top: 10px;
    border: 1px solid black;
    > nav {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  `;

  const NavItemContainer = styled.ol`
    width: 100%;
    height: 300px;
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: center;
  `;

  const NavMenu = styled.li`
    width: 100%;
    height: 34px;
    border: 1px solid red;
  `;

  return (
    <NavContainer id='left-sidebar--sticky-container js-sticky-leftnav'>
      <nav role='navigation'>
        <NavItemContainer className='nav-links'>
          <NavMenu>Public</NavMenu>
          <NavMenu className='nav-questions'>
            <span>icon</span>
            <span>Questions</span>
          </NavMenu>
          <NavMenu className='nav-tags'>Tags</NavMenu>
          <NavMenu className='nav-users'>Users</NavMenu>
          <NavMenu className='nav-companies'>Companies</NavMenu>
        </NavItemContainer>
      </nav>
    </NavContainer>
  );
};

export default Nav;
