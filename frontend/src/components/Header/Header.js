import React from 'react';
import LogoImage from '../../assets/images/logo.png'
import{
    HeaderWrapper,
    Inner,
    Logo,
    LogoContainer,
    Nav,
    NavItem,
    Hamburger,
    HamburgerLine
} from './HeaderStyle';

const Header = () => {
    

    return (    
        <>
            <HeaderWrapper>
                <Inner>
                    <LogoContainer to="/" >
                        <Logo src={LogoImage} alt="BullTar logo" />
                    </LogoContainer>
                    <Nav>
                        <NavItem exact to="/">Početna</NavItem>
                        <NavItem to="/dog">Moji psi</NavItem>
                        <NavItem to="/mating">Parenja</NavItem>
                        <NavItem to="/litter">Legla</NavItem>
                    </Nav>
                </Inner>
            </HeaderWrapper>
        </>
    );
}

export default Header;