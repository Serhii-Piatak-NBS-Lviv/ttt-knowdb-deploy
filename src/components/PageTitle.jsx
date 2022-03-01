import React from 'react';
import { css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import { screenSizes } from '../assets/screenSizes';

// #region constants

// #endregion

// #region styled-components
const styleRules = css`
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	color: #1a1a1a;
	font-weight: 400;
	font-size: 1.6vw;
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 1vw;
	padding-top: 2vw;

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 2.5vw;
		padding-bottom: 1.5vw;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 3.5vw;
    	padding-bottom: 2vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 4.5vw;
    	padding-bottom: 3vw;
	};
`;
// #endregion

// #region component
const propTypes = {
	text: PropTypes.string.isRequired,
};

const defaultProps = {
	text: "",
};

/**
 * 
 */
const PageTitle = ({ text }) => {
	return <h1 className={styleRules}>{text}</h1>;
}

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;
// #endregion

export default PageTitle;