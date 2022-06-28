import React from 'react';
import { cx, css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import MainContainer from '../MainContainer';
import Sidebar from '../sidebar/Sidebar';
import PageTitle from '../PageTitle';
import { screenSizes } from '../../assets/screenSizes';
import {categoryAtom} from '../../atoms';

// #region constants

// #endregion

// #region styled-components
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

const CategoryKnowledges = () => {
	return (
		<>

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
		<div className={cssHomeContent}>
			<PageTitle text={`Category: ${categoryItem.title}`} />
			<CategoryKnowledges />
		</div>
		<Sidebar />
	</MainContainer>;
}

CategoryPage.propTypes = propTypes;
CategoryPage.defaultProps = defaultProps;
// #endregion

export default CategoryPage;