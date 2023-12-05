import styled from '@emotion/styled';
import React from 'react';

const NavbarDesktop = () => {
  return <Wrapper>NavbarDesktop</Wrapper>;
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  background-color: red;
`;
export default NavbarDesktop;
