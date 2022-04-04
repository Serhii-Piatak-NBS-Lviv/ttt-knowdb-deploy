import React from 'react';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import { Header, Menu, mnuStyleDefault, mnuItemStyleDefault } from './components/Header.jsx';
import SearchForm from './components/SearchForm';
import HomePage from './HomePage';
import FAQsPage from './FAQsPage';
import BlogsPage from './BlogsPage';
import ContactPage from './ContactPage';
import { screenSizes } from './assets/screenSizes';

// #region constants
const FOOTER_FONTSIZE = "0.8vw";
const FOOTER_FONTSIZE_TABLET = "1.7vw";
const FOOTER_FONTSIZE_PHONE = "2.5vw";
const FOOTER_FONTCOLOR = '#444';
// #endregion

// #region styled-components
const footerContainerStyles = css`
  position: unset;

  @media (max-width: ${screenSizes.mediumTablet}) {
    display: flex;
    flex-direction: column;
    gap: 1vw;
	};

  @media (max-width: ${screenSizes.smartPhones}) {
    gap: 1.5vw;
  }
`;

const mnuFooterStyles = css`
  font-size: ${FOOTER_FONTSIZE};

  @media (max-width: ${screenSizes.largeTablet}) {
		font-size: ${FOOTER_FONTSIZE_TABLET};
    color: ${FOOTER_FONTCOLOR};
    border: none;
	};

  @media (max-width: ${screenSizes.mediumTablet}) {
    font-size: ${FOOTER_FONTSIZE_TABLET};
  };

  @media (max-width: ${screenSizes.smartPhones}) {
    font-size: ${FOOTER_FONTSIZE_PHONE};
  }
`;

const corpLogo = css`
  width: 10vw;
  height: auto;

  @media (max-width: ${screenSizes.largeTablet}) {
    width: 12vw;
  };

  @media (max-width: ${screenSizes.mediumTablet}) {
    width: 20vw;
  };

  @media (max-width: ${screenSizes.smartPhones}) {
    width: 28vw;
  };
`

const Footer = styled.footer`
  padding: 0.8vw 15vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid #e6e6e6;
  margin-top: 1vw;
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <noindex>
        <SearchForm />
      </noindex>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer>
        <Menu
          menuContainerStyles={cx(mnuStyleDefault, footerContainerStyles)}
          menuItemStyles={cx(mnuItemStyleDefault, mnuFooterStyles)}
        />
        <img
          className={corpLogo}
          src={require('./assets/nestle_logo.png')}
          alt="nestle-logo"></img>
      </Footer>
    </RecoilRoot>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
// #endregion

export default App;

