import React from 'react';
import PropTypes from 'prop-types';
import Publication from '../generic/Publication';
import { cx, css } from '@emotion/css/macro';
import {FaRegFileAlt, FaFilm} from 'react-icons/fa';
import {screenSizes} from '../../assets/screenSizes';

// #region constants

// #endregion

// #region styled-components
const cssSideBar = css`
	width: 30%;
	border-left: 1px solid #e6e6e6;
	padding-left: 1.5vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		width: 23%;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
		border-top: 1px solid #e6e6e6;
		border-left: none;
	}
`;

const cssSideCategory = css`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 3%;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	margin-bottom: 0.6vw;
	color: #45454C;
    font-size: 0.85vw;
    font-weight: 400;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.3vw;
		line-height: 1.75vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.3vw;
		line-height: 4.75vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 2.8vw;
		line-height: 5.75vw;
	};
`;

const cssSideCategoryAmount = css`
	background: #a03717;
    width: 7%;
    text-align: center;
    border-radius: 50%;
    color: #fff;
	font-size: 0.8vw;
	font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
	aspect-ratio: 1;

	@media(max-width: ${screenSizes.largeTablet}) {
		width: 11%;
		font-size: 1.1vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		width: 6%;
		font-size: 2.5vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		width: 7%;
		font-size: 2.9vw;
	};
`;

const cssSideBlockTitle = css`
	color: #444;
	margin-top: 2vw;
	margin-bottom: 1.5vw;
	font-weight: 600;
    font-size: 0.9vw;
	display: flex;
	gap: 2%;

	&::after {
		content: "___";
		color: #fff;
		border-bottom: 4px double #E5E5E5;
		flex-grow: 1;
	}

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.4vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.4vw;
		margin-top: 7vw;
		margin-bottom: 2vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.4vw;
	}
`;

const cssSidePublication = css`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 2%;
	color: #45454C;
	margin-bottom: 0.8vw;
`;

const cssSidePubTitle = css`
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 0.8vw;
    font-weight: 400;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.3vw;
		line-height: 1.75vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.3vw;
		line-height: 4.75vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 2.8vw;
		line-height: 5.75vw;
	}
`;

const cssSidePubLogo = css`
	font-size: 1.8vw;

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.9vw;
	}
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
const Sidebar = ({categoryView, popularView, latestView}) => {

	return (
		<div className={cssSideBar}>
			<SideCategoryList title = "Categories" apiView = { categoryView } />
			<SidePublicationsList title="Popular Articles" apiView = { popularView } />
			<SidePublicationsList title="Latest Articles" apiView = { latestView } />
		</div>
	);
}

function SideCategoryList({apiView, title}) {
	return (
			<>
				<div className={cssSideBlockTitle}>{title}</div>
				{
					apiView.map(category => <SideCategory
						title = { category.title } amount = {category.amount} 
						/>)
				}
				
			</>
		
	)
};

function SidePublicationsList({apiView, title}) {
	return (
		<>
			<div className={cssSideBlockTitle}>{title}</div>
			{
				apiView.map(
					publication => 
					<Publication
						title = {publication.title}
						cssLookup = {{
							container: cssSidePublication,
							title: cssSidePubTitle,
						}}
					>
						{
							publication.video ?
							<FaFilm className={cssSidePubLogo} />
							: <FaRegFileAlt className={cssSidePubLogo} />
						}
					</Publication>
				)
			}
		</>
	)
};

function SideCategory({ title, amount}) {
	return (
		<div className = {cssSideCategory}>
			<div className={cssSideCategoryAmount}>{amount}</div>
			<div>{title}</div>
		</div>
	)
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;