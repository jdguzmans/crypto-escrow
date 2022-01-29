import React from 'react';
import styled from 'styled-components';
import ConnectWallet from '../../components/connectWallet';

interface IProps {
    children: React.ReactNode
}
const Layout = ({ children }: IProps) => {
  return (
    <StyledMain>
      <StyledNavbar>
        <ConnectWallet />
      </StyledNavbar>
      <StyledBody>
        {children}
      </StyledBody>
      <Footer />
    </StyledMain>
  );
};

export default Layout;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledAnchor href="//github.com/jdguzmans/crypto-escrow">
        <i className="fa fa-github fa-2x" />
      </StyledAnchor>
      <StyledAnchor href="//linkedin.com/in/jdguzmans">
        <i className="fa fa-linkedin fa-2x" />
      </StyledAnchor>
    </StyledFooter>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledAnchor = styled.a`
  padding: 8px;
  background-color: transparent;
  color: white;
  transition-duration: 0.4s;
  &:hover {
      cursor: pointer;
  }
  border: none;
  border-radius: 6px;
`;

const _StyledSecondaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.02);
  padding: 5px 10px 5px 10px;
`;

const StyledNavbar = styled(_StyledSecondaryContainer)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
`;

const StyledBody = styled.div`
  flex: 1;
  margin: 8px;
`;

const StyledFooter = styled(_StyledSecondaryContainer)`
  gap: 20px;
  background-color: transparent;
`;
