import React from 'react';
import {FaFolder, FaRegFileAlt, FaFilm} from 'react-icons/fa';
import { cx, css } from '@emotion/css/macro';
import Publication from '../generic/Publication';
import {screenSizes} from '../../assets/screenSizes';
import {nanoid} from 'nanoid';

// #region styled-components
const container = css`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`;

const category = css`
	width: 50%;
	flex-shrink: 0;
	margin-bottom: 3vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		margin-bottom: 5vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		width: 100%;
	}
`;

const categoryTitle = css`
	width: 100%;
	display: flex;
	gap: 5%;
	color: #383838;
	font: 15px/24px 'Open Sans', Helvetica, Arial, sans-serif;
	margin-bottom: 0.8vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		margin-bottom: 2.5vw;
	}
`;

const titleIco = css`
	font-size: 1.5vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 2.3vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 4.2vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 4.5vw;
	};
`;

const titleText = css`
	font-size: 1vw;
	font-weight: 500;
	display: flex;
	gap: 0.3vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 2vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.5vw;
		font-weight: 600;
		gap: 1.3vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 4vw;
		gap: 2vw;
	}
`;

const categoryTitleAmount = css`
	color: #999;
	font-size: 0.8em;
`;

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

// #endregion

const HomeCategory = ({title, amount, categoryView, categoryIndex}) => {
	return (
		<div className={category}>

			{/* Category title rendering */}
			<div className={categoryTitle}>
				<FaFolder className={titleIco} />
				<div className={titleText}>
					{title}
					<span 
						className={categoryTitleAmount}>{amount}</span>
				</div>
			</div>

			{
				// Subcategories titles rendering
				categoryView ? 
					categoryView.map(subcatg => <Publication
							title = {subcatg.title}
							cssLookup = {{
								container: homeContentPublication,
								title: homeContentPubTitle,
							}}
							key = {nanoid(5)}
						>
							<FaFolder
								className={homeContentSubLogo}
							/>
						</Publication>
					)
				: null
			}

			{
				// Publications title in Category
				categoryIndex.map(
					publication => 
					<Publication
						title = {publication.title}
						cssLookup = {{
							container: homeContentPublication,
							title: homeContentPubTitle,
						}}
						key = {nanoid(5)}
					>
						{
							publication.video ?
							<FaFilm 
								className={homeContentPubLogo}
							/>
							: <FaRegFileAlt
								className={homeContentPubLogo}
							/>
						}
					</Publication>
				)
			}
			
		</div>
	)
}

const HomeContent = ({contentIndex, categoryView}) => {
	return (
		<div className={container}>
			{
				categoryView.map(category => {
					if (!category.parent_category) {
						let amount = category.amount;
						let subcatgs = categoryView.filter(itm => itm.parent_category === category.title);
						let inside = contentIndex.filter(itm => itm.category === category.title);

						if(subcatgs.length) {
							amount = subcatgs.reduce((acc, item) => acc + item.amount, amount);
						}
						return (
						<HomeCategory 
							title = {category.title}
							amount = {`(${amount})`}
							categoryView = {subcatgs}
							categoryIndex = {inside[0].view}
							key = {nanoid(5)}
						/>
						)
					}
				})
			}
		</div>
	)
}

export default HomeContent;