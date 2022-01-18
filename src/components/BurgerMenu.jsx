import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { cx, css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import { screenSizes } from '../assets/screenSizes';

// #region constants
const BURGERSIZE = '4vw';
const BURGERSIZE_MOB = '8vw';
const BURGERCOLOR = '#fff';

// #endregion

// #region styled-components
const Burger = styled.div`
	display: none;

	@media (max-width: ${screenSizes.mediumTablet}) {
		display:            flex;
        width:              ${BURGERSIZE};
        height:             ${BURGERSIZE};
        flex-direction:     column;
        justify-content:    center;
        align-items:        center;
        gap: 1.2vw;
		align-self: flex-end;
	};

	@media (max-width: 600px) {
		gap: 1.1vw;
	}

	@media (max-width: ${screenSizes.smartPhones}) {
		width:              ${BURGERSIZE_MOB};
        height:             ${BURGERSIZE_MOB};
		gap: 2.3vw;
	}
`;

const MenuContainer = styled.div`
	display: block;
	transform-origin: 0;
	transform: translateY(-15vw) scaleY(0);
	transition:         0.7s ease-in-out;

	& > * {
		position: unset;
	}

	&.opened, &.opened * {
		display: block;
		transform: translateY(0) scaleY(1);
		font-size: 2.2vw;
    	padding: 1vw 0;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		&.opened * {
			font-size: 3.5vw;
			padding: 1.5vw 0;
		};
	}
`

const burgerBar = css`
	border-top:         3px solid ${BURGERCOLOR};
	width:              100%;
	transition:         0.7s ease-in-out;
`;

const topBar = css`
	transform-origin:   -0.2vw;

	&.opened {
		transform: rotate(45deg);
	};
`;

const middleBar = css`
	&.opened {
		transform: scaleX(0);
	};
`;

const bottomBar = css`
	transform-origin:   -0.2vw;

	&.opened {
		transform: rotate(-45deg);
	};
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
const BurgerMenu = ({ children }) => {
	const [opened, setOpened] = useState(false);

	const toggleBurg = () => {
		setOpened(!opened);
	}

	return (
		<>
			<Burger onClick={toggleBurg}>
				<div className={cx(burgerBar, topBar, opened ? "opened" : "")} id="burg-top-edge" />
				<div className={cx(burgerBar, middleBar, opened ? "opened" : "")} id="burg-mid-edge" />
				<div className={cx(burgerBar, bottomBar, opened ? "opened" : "")} id="burg-bott-edge" />
			</Burger>
			<MenuContainer
				className={opened ? "opened" : ""}
				onClick={toggleBurg}
			>
				{children}
			</MenuContainer>
		</>
	);
};

BurgerMenu.propTypes = propTypes;
BurgerMenu.defaultProps = defaultProps;
// #endregion

export default BurgerMenu;