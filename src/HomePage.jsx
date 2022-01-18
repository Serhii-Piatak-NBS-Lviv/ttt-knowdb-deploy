import {useState, useEffect} from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import MainContainer from './components/MainContainer';
import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import FullSpinner from './components/FullSpinner';

// #region constants

// #endregion

// #region styled-components

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
			<PageTitle text="Article Categories" />
			<ComingSoon />
		</>
	)
};

const HomePage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		await new Promise(resolve => setTimeout(resolve,1000));
		setLoading(false);
	});

	return <MainContainer>
		{loading ? <FullSpinner text="Retrieving Homepage..." /> : <Body />}
	</MainContainer>;
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;
// #endregion

export default HomePage;