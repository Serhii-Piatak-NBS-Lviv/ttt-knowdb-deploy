import React from 'react';
import { css } from '@emotion/css/macro';
import { useParams } from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import MainContainer from '../MainContainer';
import Sidebar from '../sidebar/Sidebar';
import PageTitle from '../PageTitle';
import { screenSizes } from '../../assets/screenSizes';
import {categoryAtom, publicationSelector} from '../../atoms';
import {FaFolder, FaRegFileAlt, FaFilm} from 'react-icons/fa';
import Publication from '../generic/Publication';

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

const cssKnowledgeBlock = css `
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 2vw;
	padding-top: 1vw;
	align-items: center;
`;

const cssPctContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border: 1px solid gray;
	border-radius: 7%;
	padding: 1%;
	width: 15%;
	aspect-ratio: 1;
	box-shadow: -1px 0px 8px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: -1px 0px 8px 0px rgba(0,0,0,0.75);
	-moz-box-shadow: -1px 0px 8px 0px rgba(0,0,0,0.75);
`;

const cssKnowledge = css`
	width: 60%;
	width: 60%;
	padding: 1.2vw 0;
`;

const cssPicto = css`
	width: 5vw;
	margin: auto;
`;

const cssPictoCaption = css`
	text-align: center;
	font-size: 0.6vw;
	width: 50%;
	align-self: center;
	color: #45454C;
`;

const cssKnowledgeTitle = css`
	text-decoration: none;
	color: #45454C;
	font-weight: 500;
	font-size: 1.2vw;
`;

const cssKnowledgeDescr = css`
	color: #383820;
	font-weight: 300;
	font-size: 0.9vw;
	line-height: 1.35vw;
`;

const cssSeeMore = css`
	text-decoration: none;
	color: #a03717;
	color: #a03717;
	display: block;
	position: relative;
	top: 1.5vw;
	font-style: italic;

	&:hover {
		text-decoration: underline;
	}
`;

const cssSubctgList = css`
	display: flex;
	flex-direction: row;
`;
// #endregion

// #region functions

// #endregion

// #region component

const KnowledgeImage = ({oPublication, cssClass}) => {
	let imgSource, imgAlt, imgCaption;

	if ( oPublication.type === "reference_link") {
		imgAlt = oPublication.content;
		imgCaption = oPublication.content;
		switch (oPublication.content) {
			case "Nestle corporate SharePoint":
				imgSource = `sharepoint.png`;
				break;
			case "Nestle Confluence board":
				imgSource = `confluence.png`;
				break;
			case "Google drive":
				imgSource = `google-drive.png`;
				break;
			case "YouTube movie":
				imgSource = `youtube.jpeg`;
				break;
			case "GitHub repository":
				imgSource = `github.jpeg`;
				break;
			case "BitBucket repository":
				imgSource = `bitbucket.png`;
				break;
			default:
				imgSource = `weblink-general.png`;
		}
		return <figure className={cssPctContainer}>
			<img src={require(`../../assets/${imgSource}`)} alt={imgAlt} className={cssPicto}/>
			<figcaption className={cssPictoCaption}>{imgCaption}</figcaption>
		</figure>
	} else if (oPublication.type === "subcategory") {
		return <FaFolder className={cssClass} />
	} else {
		if (oPublication.isVideo) {
			return <FaFilm className={cssClass} />
		} else {
			return <FaRegFileAlt className={cssClass} />
		};
	};
};

/**
 * 
 */
const Knowledge = ({id}) => {
	const knowlItem = useRecoilValue(publicationSelector({id, type: 'article'}));
	
	return (
		<div className={cssKnowledgeBlock}>
			<div className={cssKnowledge}>
				{
					knowlItem.type === "reference_link" ? 
					<a href={knowlItem.url} target="_blank" rel="noopener noreferrer" className={cssKnowledgeTitle}>
						{knowlItem.title}
						
					</a>
					: null
				}
				<p className={cssKnowledgeDescr}>{knowlItem.description}</p>
				<a href={knowlItem.url} target="_blank" rel="noopener noreferrer" className={cssSeeMore}>See more &rarr;</a>
			</div>
			<KnowledgeImage oPublication = {knowlItem} />
		</div>
	)
};

/**
 * 
 */
const CategoryKnowledges = ({category}) => {
	return (
		<>
			{ category.articles.map((knowlId) => <Knowledge id={knowlId} key={knowlId}/>) }
		</>
	)
};

const SubcatgList = ({oCategory}) => {
	return (
		<div className={cssSubctgList}>
			{ oCategory.subcategories.map((subctgId) => <Publication
				id = {subctgId}
				cssOption = "Homepage->Subcategory"
				key = {subctgId}
				type = "subcategory"
				/>) 
			}
		</div>
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
				<PageTitle 
					title={`Category: ${categoryItem.title}`} 
					description={categoryItem.description}
					categoryId={category_id}
				/>
				{categoryItem.subcategories.length ? <SubcatgList oCategory={categoryItem} /> : null}
				<CategoryKnowledges category={categoryItem}/>
			</div>
			<Sidebar />
		</div>
	</MainContainer>;
}

// #endregion

export default CategoryPage;