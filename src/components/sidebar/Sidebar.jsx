import React from 'react';
import PropTypes from 'prop-types';
import Publication from '../generic/Publication';
import { cx, css } from '@emotion/css/macro';
import {FaRegFileAlt, FaFilm} from 'react-icons/fa';

// #region constants

// #endregion

// #region styled-components
const cssSideBar = css`
	width: 30%;
	border-left: 1px solid #e6e6e6;
	padding-left: 1.5vw;
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
`;

const cssSideBlockTitle = css`
	color: #444;
	margin-top: 2.5vw;
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
    font-size: 0.85vw;
    font-weight: 400;
`;

const cssSidePubLogo = css`
	font-size: 1.5vw;
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

function SideCategoryList({apiView, title, cssCategoryStyling}) {
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

function SidePublicationsList({apiView, title, cssPublicationStyling}) {
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