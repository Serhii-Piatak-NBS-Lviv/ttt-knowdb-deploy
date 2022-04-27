import {useState, useEffect} from 'react';
import { cx, css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import MainContainer from './components/MainContainer';
import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import FullSpinner from './components/FullSpinner';
import Sidebar from './components/sidebar/Sidebar';
import {vwCategories, vwPopularArticles, vwLatestArticles, vwContentIdx} from './assets/apisimul/serverdata_main';
import HomeContent from './components/homepage/HomeContent';
import useEnumSiteContent from './hooks/EnumSiteContent';

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

/**
 * 
 */

const Body = () => {
	return (
		<>
			{/* <ComingSoon /> */}
			<div className={cssHomeContent}>
				<PageTitle text="Article Categories" />
				<HomeContent />
			</div>
		</>
	)
};

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [categories, articles] = useEnumSiteContent();
	
	useEffect(async () => {
		await new Promise(resolve => setTimeout(resolve,1000));
		setLoading(false);
	});

	return <MainContainer>
		{
			loading ? 
				<FullSpinner text="Retrieving Homepage..." /> 
			: 
				<div className={cssBody}>
					<Body />
					{/* <Sidebar 
						categoryView = { vwCategories }
						popularView = { vwPopularArticles }
						latestView = { vwLatestArticles }
					/> */}
				</div>
		}
	</MainContainer>;
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;
// #endregion

export default HomePage;