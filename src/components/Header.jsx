import React from 'react';
import { cx, css } from '@emotion/css/macro';
import styled from '@emotion/styled/macro';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import {useRecoilState} from 'recoil';

import { screenSizes } from '../assets/screenSizes';
import BurgerMenu from './BurgerMenu';
import {searchTypingSelector, searchQuerySelector} from '../atoms';

// #region constants
const STRONG_FONTCOLOR = '#444';
const TITLE_FONTCOLOR = '#1a1a1a';
const SLOGAN_FONTCOLOR = '#595959';
const NAV_BCKGND_MOBIL = '#242526';
// #endregion

// #region styled-components
const logoContainer = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 40vw;
	gap: 1vw;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 90vw;
		padding: 3vw 0;
	};

`
const nbsKnowDbHeader = css`
	width: 100vw;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	padding: 2vw 15vw 2vw 1vw;
	align-items: center;
	box-sizing: border-box;

	@media (max-width: ${screenSizes.mediumTablet}) {
		flex-direction: column;
		padding: 0;
	}
`;

const nbsKnowDbLogoContainer = css`
	display: flex;
	align-items: center;
	gap: 1vw;
`;

const nbsKnowDbLogo = css`
	width: 7vw;
	height: auto;
	aspect-ratio: 1.02;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 12vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		width: 15vw;
	}
`;

const streamLogo = css`
	width: 10vw;
	height: auto;
	opacity: 0;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 18vw;
		order: 2;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		width: 24vw;
	}
`;

const noAfter = css`
	cursor: pointer; 

	&::after {
		content: "" !important;
	}
`;

const brandTitle = css`
    width: 17vw;
    height: auto;

	@media (max-width: ${screenSizes.largeTablet}) {
		width: 25vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 38vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		width: 43vw;
	};
`;

const Strong = styled.strong`
	font-weight: 900;
	font-size: 2.5vw;
	color: ${STRONG_FONTCOLOR};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 3.5vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 5.5vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 6.7vw;
	};
`;

const Title = styled.h1`
	@font-face {
    font-family: 'Erato-Light';
    src:url('../assets/fonts/erato/EratoLig.otf'); 
        font-weight: normal;
        font-style: normal;
	}
	
	margin: 0;
	color: ${TITLE_FONTCOLOR};
	font-size: 4.8vw;
    font-weight: 300;
	font-family: 'Erato-Light';
	text-transform: uppercase;

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 3.5vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 5.5vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 6.7vw;
	};
`

const Slogan = styled.h3`
	margin: 0;
	color: ${SLOGAN_FONTCOLOR};
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	text-align: letter-spacing;
	font-size: 1.7vw;
    font-weight: 400;

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 2.4vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 3.8vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 4.3vw;
	};
`;

const mnuStyleDefault = css`
	position: relative;
	top: 2vw;
	list-style: none;
	display: flex;
	gap: 1vw;

	& > a {
		text-decoration: none;
	};

	& > a:focus {
		font-weight: 600;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		top: 2.7vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		display: none;
	};
`;

const mnuItemStyleDefault = css`
	text-decoration: none !important;
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	color: ${STRONG_FONTCOLOR};
	font-size: 1.5vw;

	&:hover {
		color: ${TITLE_FONTCOLOR};
	};

	&::after {
		content: "/";
		color: #ccc;
		margin-left: 1vw;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 2vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		border-bottom: 1px solid #313335;
		color: #ccc;

		&::after {
			content: "";
		}
	}
`;

const Navigation = styled.nav`
	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 100vw;
		background: ${NAV_BCKGND_MOBIL};
		padding: 2vw 8vw;
		box-sizing: border-box;
		order: -1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		padding: 3vw 8vw;
	}
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {
	menuContainerStyles: PropTypes.string,
	menuItemStyles: PropTypes.string,
};

const defaultProps = {};

/**
 * 
 */
const Menu = ({ menuContainerStyles, menuItemStyles }) => {
	const [, setIsTyping] = useRecoilState(searchTypingSelector);
	const [, setSearchQuery] = useRecoilState(searchQuerySelector);

	const handleClick = () => {
		setIsTyping(false);
		setSearchQuery("");
		document.getElementById('search-field').value="";
	};

	return <ul className={menuContainerStyles}>
		<Link onClick={handleClick} to="/home">
			<li className={menuItemStyles}>Home</li>
		</Link>
		<Link onClick={handleClick} to="/faqs">
			<li className={menuItemStyles}>FAQs</li>
		</Link>
		<Link onClick={handleClick} to="/blogs">
			<li className={menuItemStyles}>
				Blogs
			</li>
		</Link>
		<Link onClick={handleClick} to="/contact">
			<li className={cx(menuItemStyles, noAfter)}>
				Contact
			</li>
		</Link>
	</ul>
};

const Header = () => {
	return <header className={nbsKnowDbHeader}>
		<div className={logoContainer}>
			<img className={streamLogo} src={require('../assets/IBS Logo.png')} alt="ibs-logo" />
			<div className={nbsKnowDbLogoContainer}>
				<img className={nbsKnowDbLogo} src={require('../assets/purina_logo.png')} alt="knowledgebase-logo" />
				<div>
					{/* <Title>
						Purina
						<sup>&reg;</sup>						
					</Title> */}
					<img className={brandTitle} src={require('../assets/purina_title-sharpen.png')} alt="purina-title" />
					<Slogan>Team Knowledge Base</Slogan>
				</div>
			</div>
		</div>
		<Navigation>
			<Menu
				menuContainerStyles={mnuStyleDefault}
				menuItemStyles={mnuItemStyleDefault}
			/>
			<BurgerMenu>
				<Menu
					menuContainerStyles={mnuStyleDefault}
					menuItemStyles={mnuItemStyleDefault}
				/>
			</BurgerMenu>
		</Navigation>
	</header>;
};



Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
// #endregion

export { Header, Menu, mnuStyleDefault, mnuItemStyleDefault };