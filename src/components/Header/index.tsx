import React from 'react';

import { HeaderWrapper, HeaderContent } from './styles';

import logoImg from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <a href="/">
          <img src={logoImg} alt="CodeHub" />
        </a>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
