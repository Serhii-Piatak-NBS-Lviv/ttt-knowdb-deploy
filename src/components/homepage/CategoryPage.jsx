import React from 'react';
import { cx, css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import MainContainer from '../MainContainer';
import Sidebar from '../sidebar/Sidebar';
import PageTitle from '../PageTitle';
import { screenSizes } from '../../assets/screenSizes';
import {categoryAtom, publicationSelector} from '../../atoms';
import {FaFolder, FaRegFileAlt, FaFilm, FaRegStar, FaBell, FaGithub, FaGoogleDrive, FaYoutube, FaLink, FaShareSquare, FaConfluence, FaBitbucket} from 'react-icons/fa';

// #region constants

// #endregion

// #region styled-components
const cssBody = css`
	display: flex;
	justify-content: space-between;
    width: 100%;

	@media(max-width: ${screenSizes.mediumTablet}) {
		flex-direction: column;
	};
`;

const cssHomeContent = css`
	width: 65%;

	@media(max-width: ${screenSizes.largeTablet}) {
		width: 70%;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
	};
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

const PreLogotype = ({oPublication, cssClass}) => {
	if ( oPublication.type === "reference_link") {
		switch (oPublication.content) {
			case "Nestle corporate SharePoint":
				return <FaShareSquare className={cssClass} />
				break;
			case "Nestle Confluence board":
				return <FaConfluence className={cssClass} />
				break;
			case "Google drive":
				return <FaGoogleDrive className={cssClass} />
				break;
			case "YouTube movie":
				return <FaYoutube className={cssClass} />
				break;
			case "GitHub repository":
				return <FaGithub className={cssClass} />
			case "BitBucket repository":
				return <FaBitbucket className={cssClass} />
			default:
				return <FaLink className={cssClass} />
		}
	} else if (oPublication.type === "subcategory") {
		return <FaFolder className={cssClass} />
	} else if (oPublication.isVideo) {
		return <FaFilm className={cssClass} />
	} else {
		return <FaRegFileAlt className={cssClass} />;
	};
};

/**
 * 
 */
const Knowledge = ({id}) => {
	const knowlItem = useRecoilValue(publicationSelector({id, type: 'article'}));
	
	return (
		<div>
			{
				knowlItem.type === "reference_link" ? 
				<a href={knowlItem.url} target="_blank">
					{knowlItem.title}
					
				</a>
				: null
			}
			<p>{knowlItem.description}</p>
			<PreLogotype oPublication = {knowlItem} />
		</div>
	)
};

/**
 * 
 */
const CategoryKnowledges = ({category}) => {
	return (
		<>
			{ category.articles.map((knowlId) => <Knowledge id={knowlId} />) }
		</>
	)
};

/**
 * 
 */
const CategoryPage = () => {
	let { category_id } = useParams();
	const categoryItem = useRecoilValue(categoryAtom(category_id));

	return <MainContainer>
		<div className={cssBody}>
			<div className={cssHomeContent}>
				<PageTitle title={`Category: ${categoryItem.title}`} description={categoryItem.description} />
				<CategoryKnowledges category={categoryItem}/>
			</div>
			<Sidebar />
		</div>
	</MainContainer>;
}

CategoryPage.propTypes = propTypes;
CategoryPage.defaultProps = defaultProps;
// #endregion

export default CategoryPage;