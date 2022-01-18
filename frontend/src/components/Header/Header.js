import React from "react";
import LogoImage from "../../assets/images/logo.png";
import {
  HeaderWrapper,
  Inner,
  Logo,
  LogoContainer,
  Nav,
  NavItem,
  Hamburger,
  HamburgerLine,
} from "./HeaderStyle";

const Header = (props) => {
  return (
    <>
      <HeaderWrapper>
        <Inner>
          <LogoContainer to="/">
            <Logo src={LogoImage} alt="BullTar logo" />
          </LogoContainer>
          {props.isLoggedIn && (
            <>
              <Hamburger onClick={() => props.setHamburgerMenu()}>
                <HamburgerLine />
                <HamburgerLine />
                <HamburgerLine />
              </Hamburger>

              <Nav>
                <NavItem exact to="/">
                  Početna
                </NavItem>
                <NavItem to="/dog">Moji psi</NavItem>
                <NavItem to="/mating">Parenja</NavItem>
                <NavItem to="/litter">Legla</NavItem>
                <NavItem to="/buyer">Kupci</NavItem>
                {props.isAdmin && <NavItem to="/users">Korisnici</NavItem>}
                <NavItem to="/logout" onClick={() => props.onLogout()}>
                  Odjava
                </NavItem>
              </Nav>
            </>
          )}
        </Inner>
      </HeaderWrapper>
    </>
  );
};

export default Header;
