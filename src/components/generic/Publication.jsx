import React from 'react';
import PropTypes from 'prop-types';
import {useRecoilState, useRecoilValue} from 'recoil';
import { css } from '@emotion/css/macro';
import {FaFolder, FaRegFileAlt, FaFilm, FaRegStar, FaBell, FaGithub, FaGoogleDrive, FaYoutube, FaLink, FaShareSquare, FaConfluence, FaBitbucket, FaQuestionCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import {publicationSelector, faqSelector, lvsrchFaqSelectedAtomSelector} from '../../atoms';
import {screenSizes} from '../../assets/screenSizes';
import { BsKeyFill } from 'react-icons/bs';


// #region constants

// #endregion

// #region styled-components
const homeContentPublication = css`
	width: 100%;
	display: flex;
	padding-left: 10%;
	color: #45454C;
	margin-bottom: 0.8vw;
	align-items: center;
	gap: 2%;

	@media(max-width: ${screenSizes.largeTablet}) {
		padding-left: 5%;
		margin-bottom: 1.8vw;
	};
`;

const homeContentPubTitle = css`
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 0.85vw;
    font-weight: 400;
	text-decoration: none;
	color: #45454C;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.6vw;
		line-height: 2.2vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2vw;
		line-height: 3.1vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.2vw;
		line-height: 5.1vw;
	};

	&:hover {
		color: #A03717;
		font-weight: 600;
	}
`;

const homeContentPubLogo = css`
	font-size: 1.5vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 2.3vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 4.2vw;
	};
`;

const homeContentSubLogo = css`
	font-size: 1vw;
	margin-right: 5%;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.9vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.5vw;
	};
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
	text-decoration: none;
	color: #45454C;

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

	&:hover {
		color: #A03717;
		font-weight: 600;
	}
`;

const cssSidePubLogo = css`
	font-size: 1.8vw;

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.9vw;
	};
`;

const liveSearchPublication = css`
	display: flex;
	flex-direction: row;
	gap: 0.5vw;

	@media (max-width: ${screenSizes.largeTablet}) {gap: 1vw};
	@media (max-width: 538px) {
		gap: 2vw;
	};
`;

const liveSearchPubTitle = css`
	text-decoration: none;
	color: #45454C;

	@media (max-width: 1270px) {font-size: 1.2vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.3vw};
	@media (max-width: 538px) {font-size: 2.7vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw};
	@media (max-width: 350px) {font-size: 3.6vw};
`;

const liveSearchPubIcon = css`
	font-size: 1.3vw;
	margin-right: 7px;

	@media (max-width: 1270px) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.8vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.5vw};
	@media (max-width: 538px) {font-size: 3.6vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 4.2vw};
	@media (max-width: 350px) {font-size: 5.2vw};
`;

const homeCnttPubAfterLogo = css`
	font-size: 0.8vw;
	margin-left: 0.5em;

	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.4vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.1vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 2.9vw};
`;
// #endregion

// #region functions
const defineCSS = (styleOption) => {
	switch (styleOption) {
		case "Homepage->Article":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
				icon: homeContentPubLogo,
			});
			break;
		case "Homepage->Subcategory":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
				icon: homeContentSubLogo,
			});
			break;
		case "Sidebar->Article":
			return ({
				container: cssSidePublication,
				title: cssSidePubTitle,
				icon: cssSidePubLogo,
			});
			break;
		case "Livesearch->Article":
			return ({
				container: liveSearchPublication,
				title: liveSearchPubTitle,
				icon: liveSearchPubIcon,
			});
			break;
		case "Livesearch->FAQ":
			return ({
				container: liveSearchPublication,
				title: liveSearchPubTitle,
				icon: liveSearchPubIcon,
			});
			break;
	}
}
// #endregion

// #region component
const propTypes = {
	type: PropTypes.string,
	cssLookup: PropTypes.object,
};

const defaultProps = {
	type: "article",
	cssLookup: {},
};

/**
 * This component responsible for displaying correct logo before the title
 */
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
	} else if (oPublication.type === "category") {
		return <FaFolder className={cssClass} />
	} else if (oPublication.type === "faq") {
		return <FaQuestionCircle className={cssClass} />
	} else if (oPublication.isVideo) {
		return <FaFilm className={cssClass} />
	} else {
		return <FaRegFileAlt className={cssClass} />;
	};
};

/**
 * This component responsible for displaying correct logo after the title
 */
const PostLogotype = ({oPublication}) => {
	return (
		<>
			{
				oPublication.type === 'article' || "reference_link" ? 
					oPublication.isPopular ? <FaRegStar className={homeCnttPubAfterLogo} /> : 
						oPublication.isLatest ? <FaBell className={homeCnttPubAfterLogo} /> : null
				: null
			}
		</>
	)
}

/**
 * <id> prop - identificator by which item will be found inside recoil atom family
 * <cssOption> - assumes styling which being applied to specific item
 * <type> - specifies whether item will be a subcategory or article/share link
 */
const Publication = ({id, cssOption, type}) => {
	const [, setFaqSelected] = useRecoilState(lvsrchFaqSelectedAtomSelector);

	let publcItem;
	
	type === 'faq' ? 
		publcItem = useRecoilValue(faqSelector(id))
	:
		publcItem = useRecoilValue(publicationSelector({type, id}));

	const cssLookup = defineCSS(cssOption);

	const findFaq = (key) => {
		// console.log(`Selected FAQ id is: ${key}`);
		setFaqSelected(key);
	};

	return (
		<div className={cssLookup.container}>
			{
				publcItem.type === "reference_link" ? 
				<a href={publcItem.url} target="_blank" rel="noopener noreferrer" className={cssLookup.title}>
					<PreLogotype oPublication = {publcItem} cssClass = {cssLookup.icon} />
					{publcItem.title}
					<PostLogotype oPublication = {publcItem} />
				</a>
				:
				type === "subcategory" ? 
					<Link to={`/categories/${id}`} className={cssLookup.title}>
						<PreLogotype oPublication = {publcItem} cssClass = {cssLookup.icon} />
						{publcItem.title}
					</Link>
				:
				type === "faq" ?
					<Link to={'/faqs'} className={cssLookup.title} onClick={({target}) => findFaq(target.id)} >
						<PreLogotype oPublication = {publcItem} cssClass = {cssLookup.icon} />
						<span id={id}>{publcItem.question}</span>
					</Link>
				: null
			}

		</div>
	);
}

Publication.propTypes = propTypes;
Publication.defaultProps = defaultProps;
// #endregion

export default Publication;