import React from 'react';
import PropTypes from 'prop-types';
import {useRecoilValue} from 'recoil';
import { cx, css } from '@emotion/css/macro';
import {FaFolder, FaRegFileAlt, FaFilm} from 'react-icons/fa';
import {publicationSelector} from '../../atoms';
import {screenSizes} from '../../assets/screenSizes';


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
	}
`;

const homeContentSubLogo = css`
	font-size: 1vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.9vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.5vw;
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
const defineCSS = (styleOption) => {
	switch (styleOption) {
		case "Homepage->Article":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
			});
			break;
		case "Homepage->Subcategory":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
			});
			break;
		case "Sidebar->Article":
			return ({
				container: cssSidePublication,
				title: cssSidePubTitle,
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
 * <title> prop - is exactly the publication title
 * <cssLookup> - is object contains classnames for css rules being applied
 * <children> - assumes pictogram
 */
const Publication = ({id, cssOption, type}) => {
	const publcItem = useRecoilValue(publicationSelector({type, id}));
	const cssLookup = defineCSS(cssOption);	

	return (
		<div className={cssLookup.container}>
			{/****** before-Pictograms rendering */}
			{
				type === 'article' && cssOption === "Homepage->Article" ? 
					publcItem.isVideo ? <FaFilm className={homeContentPubLogo} />
					: <FaRegFileAlt className={homeContentPubLogo} />
				: null
			}
			{
				type === 'subcategory' ?
					<FaFolder className={homeContentSubLogo} />
				: null
			}
			{
				type === 'article' && cssOption === "Sidebar->Article" ? 
					publcItem.isVideo ? <FaFilm className={cssSidePubLogo} />
					: <FaRegFileAlt className={cssSidePubLogo} />
				: null
			}
			<div className={cssLookup.title}>
				{publcItem.title}
			</div>
		</div>
	);
}

Publication.propTypes = propTypes;
Publication.defaultProps = defaultProps;
// #endregion

export default Publication;