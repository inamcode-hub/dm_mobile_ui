import styled from '@emotion/styled';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <div className='navbar'>navbar</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  .navbar {
    height: 2.5rem;
    /* box-shadow: ${({ theme }) => theme.shadows[3]}; */
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;
export default NavbarDesktop;
