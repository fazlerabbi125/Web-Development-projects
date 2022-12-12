import React from 'react'
import styled from 'styled-components'
import NavLink from './NavLink';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <div>Navbar</div>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.nav`
  background-color: white;
  padding: 1.25rem 1rem 1.25rem 3rem;
  border-bottom: 1px solid #f3f2f2;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 2rem;
  color: rgba(0,0,0,0.87);
  font-family: 'Nunito';
  //#ed1c24;
`;
