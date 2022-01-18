import React from "react";

import { NavItem, HambWrapper } from "./HamburgerMenuStyle";

const HamburgerMenu = (props) => {
  return (
    <HambWrapper>
      <NavItem exact to="/" onClick={() => props.setHamburgerMenu()}>
        Početna
      </NavItem>
      <NavItem to="/dog" onClick={() => props.setHamburgerMenu()}>
        Moji psi
      </NavItem>
      <NavItem to="/mating" onClick={() => props.setHamburgerMenu()}>
        Parenja
      </NavItem>
      <NavItem to="/litter" onClick={() => props.setHamburgerMenu()}>
        Legla
      </NavItem>
      <NavItem to="/buyer" onClick={() => props.setHamburgerMenu()}>
        Kupci
      </NavItem>
      {props.isAdmin && (
        <NavItem to="/users" onClick={() => props.setHamburgerMenu()}>
          Korisnici
        </NavItem>
      )}
      <NavItem
        to="/logout"
        onClick={() => {
          props.setHamburgerMenu();
          props.onLogout();
        }}
      >
        Odjava
      </NavItem>
    </HambWrapper>
  );
};

export default HamburgerMenu;
