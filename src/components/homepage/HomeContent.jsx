import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {FaFolder} from 'react-icons/fa';
import { cx, css } from '@emotion/css/macro';
import {Link} from 'react-router-dom';

import Publication from '../generic/Publication';
import {screenSizes} from '../../assets/screenSizes';
import ReadMore from '../generic/ReadMore';
import {catalogueCategoriesAtom, categoryAtom, totalCtgArticleSelector} from '../../atoms';


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

const cssCtgTitLink = css`
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

// #endregion

const HomeCategory = ({ id }) => {
	const categoryItem = useRecoilValue(categoryAtom(id));
	const totalArticlesAmount = useRecoilValue(totalCtgArticleSelector(id));

	let articlesToRender = [];

	if (categoryItem.parent_category) {
		return null;
	} else {
		if (categoryItem.articles.length) {
			categoryItem.articles.length > 5 ? 
				articlesToRender = [...categoryItem.articles.slice(0,5)]
				: articlesToRender = [...categoryItem.articles];

			return (
				<div className={category}>

				{/* Category title rendering */}
				<Link to={`/categories/${id}`} className={cssCtgTitLink}>
				<div className={categoryTitle}>
					<FaFolder className={titleIco} />
					<div className={titleText}>
						{categoryItem.title}
						<span className={categoryTitleAmount}>({totalArticlesAmount})</span>
					</div>
				</div>
				</Link>

				{
					// Subcategories titles rendering
					categoryItem.subcategories.length ? 
						categoryItem.subcategories.map(
							subtgId =>
								<Publication
									id = {subtgId}
									cssOption = "Homepage->Subcategory"
									key = {subtgId}
									type = "subcategory"
								/>
						)
					: null
				}

				{
					//** Articles in Category */ 
					articlesToRender.map(
						artclId =>
							<Publication
								id = {artclId}
								cssOption = "Homepage->Article"
								key = {artclId}
							/>
					)
				}

				{categoryItem.articles.length > 5 ? <Link to={`/categories/${id}`}><ReadMore /></Link> : null}
				
				</div>
		)
		} else {
			return null;
		};
	}
}

const HomeContent = () => {
	const categoryIds = useRecoilValue(catalogueCategoriesAtom);

	return (
		<div className={container}>
			{ categoryIds.map(id => <HomeCategory id = {id} key = {id} />) }
		</div>
	)
}

export default memo(HomeContent);