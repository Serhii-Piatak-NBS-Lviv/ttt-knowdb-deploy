import React from 'react';
import {FaFolder, FaRegFileAlt, FaFilm} from 'react-icons/fa';
import { cx, css } from '@emotion/css/macro';
import Publication from '../generic/Publication';

// #region styled-components
const container = css`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`;

const category = css`
	width: 50%;
	flex-shrink: 0;
`;

const categoryTitle = css`
	width: 100%;
	display: flex;
	gap: 5%;
	color: #383838;
	font: 15px/24px 'Open Sans', Helvetica, Arial, sans-serif;
`;

const titleIco = css`
	font-size: 1.5vw;
`;

const titleText = css`
	font-size: 1vw;
	font-weight: 500;
	display: flex;
	gap: 0.3vw;
`;

const categoryTitleAmount = css`
	color: #999;
	font-size: 0.8em;
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
					categoryView.map(subcatg => 		<Publication
							title = {subcatg.title}
						>
							<FaFolder />
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
					>
						{
							publication.video ?
							<FaFilm  />
							: <FaRegFileAlt />
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
						/>
						)
					}
				})
			}
		</div>
	)
}

export default HomeContent;