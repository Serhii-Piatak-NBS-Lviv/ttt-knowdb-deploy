import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MainContainer from './components/MainContainer';
import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
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
			<PageTitle text="Rise Your Question" />
			<ComingSoon />
		</>
	)
};

const ContactPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		await new Promise(resolve => setTimeout(resolve,1000));
		setLoading(false);
	});

	return <MainContainer>
		{loading ? <FullSpinner text="Retrieving Contact page..." /> : <Body />}
	</MainContainer>;
}

ContactPage.propTypes = propTypes;
ContactPage.defaultProps = defaultProps;
// #endregion

export default ContactPage;