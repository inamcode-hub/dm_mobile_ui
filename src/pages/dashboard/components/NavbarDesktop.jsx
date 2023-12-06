import styled from '@emotion/styled';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <div className='navbar'>navbar</div>
      <div className='toggle'>=</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  .navbar {
  }
`;
export default NavbarDesktop;
