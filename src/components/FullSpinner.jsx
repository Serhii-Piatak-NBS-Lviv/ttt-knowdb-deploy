import React from 'react';
import { keyframes} from '@emotion/react';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/css/macro';
import {ImSpinner9} from 'react-icons/im';
import PropTypes from 'prop-types';
import { screenSizes } from '../assets/screenSizes';

// #region constants
const SPINNER_COLOR = "rgb(115, 128, 134)";
const CAPTION_FONTCOLOR = '#595959';
// #endregion

// #region styled-components
const spin = keyframes({
	"0%": {transform: "rotate(0deg)"},
	"100%": {transform: "rotate(360deg)"},
});

const spinContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 4vw 0;
`;

const spinnerResponsive = css`
	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 7vw !important;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 10vw !important;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 15vw !important;
	};
`

const Spinner = styled(ImSpinner9) ({
	animation: `${spin} 1s linear infinite`,
	fontSize: `4vw`,
    width: `100%`,
	color: SPINNER_COLOR,
});

const Caption = styled.h2`
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	font-size: 2vw;
	color: ${CAPTION_FONTCOLOR};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 3vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 4vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 5vw;
	}
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {
	text: PropTypes.string,
};

const defaultProps = {
	text: "",
};

/**
 * 
 */
const FullSpinner = ({ text }) => {
	return (
		<div className={spinContainer}>
			<Spinner className={spinnerResponsive} />
			<Caption>{text}</Caption>
		</div>
	)
};

FullSpinner.propTypes = propTypes;
FullSpinner.defaultProps = defaultProps;
// #endregion

export default FullSpinner;