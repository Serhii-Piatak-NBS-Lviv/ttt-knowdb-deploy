import React, {useState, useEffect} from 'react';
import { cx, css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import axios from 'axios';
import {QueryClientProvider, QueryClient, useQueries, useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import MainContainer from './components/MainContainer';
import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import FullSpinner from './components/FullSpinner';
import Sidebar from './components/sidebar/Sidebar';
import {vwCategories, vwPopularArticles, vwLatestArticles, vwContentIdx} from './assets/apisimul/serverdata_main';
import HomeContent from './components/homepage/HomeContent';
import {BASIC_URL_DEV, BASIC_URL_LIVE} from './endpoints';
import EnumKnowledges from './EnumKnowledges';
// import useEnumSiteContent from './hooks/EnumSiteContent';

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

const ALL_REFERENCES_URL = `${BASIC_URL_DEV}/get-all-reference-links?_format=json`;
const KNOWLEDGE_CATEGORIES_URL = `${BASIC_URL_DEV}/get-knowledge-categories?_format=json`;

/**
 * 
 */

const Body = () => {
	return (
		<>
			{/* <ComingSoon /> */}
			<div className={cssHomeContent}>
				<PageTitle title="Knowledge Categories" />
				<HomeContent />
			</div>
		</>
	)
};

const queryClient = new QueryClient();

const HomePageContent = () => {

	const getShareLinks = () => {
		return axios.get(ALL_REFERENCES_URL)
		.then((r) => r.data)
	};

	const getKnowledgeCategories = () => {
		return axios.get(KNOWLEDGE_CATEGORIES_URL)
		.then((r) => r.data)
	};

	const requestKnowledge = useQueries([

		{ queryKey: 'allSharedContent', queryFn: getShareLinks, enabled: true },
		{ queryKey: 'allKnowledgeCategories', queryFn: getKnowledgeCategories, enabled: true },

	]);

	return requestKnowledge.reduce((showSpinner, request) => (request.isLoading || showSpinner), false) ?
		<FullSpinner text="Retrieving Homepage..." /> :
		requestKnowledge.isError && requestKnowledge.error ? <p>{requestKnowledge.error.message}</p> :
		<div className={cssBody}>
			<EnumKnowledges 
				categories={requestKnowledge[1].data} 
				sharepoints={requestKnowledge[0].data}
			/>
			<Body />
			<Sidebar />
		</div>
};

const HomePage = () => {

	return <MainContainer>

		<QueryClientProvider client={queryClient}>
			<HomePageContent />
			<ReactQueryDevtools />
		</QueryClientProvider>
	
	</MainContainer>
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;
// #endregion

export default HomePage;