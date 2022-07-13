import React, {useState, useEffect} from 'react';
import MainContainer from './components/MainContainer';
import { css } from '@emotion/css/macro';
import {useRecoilValue} from 'recoil';
// import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import {catalogueFaqsAtom, faqsAtom} from './atoms';
// import FullSpinner from './components/FullSpinner';

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

const cssFaqContent = css`
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

/**
 * 
 */
// const Body = () => {
// 	return (
// 		<>
// 			<PageTitle text="Frequently Asked Questions" />
// 			<ComingSoon />
// 		</>
// 	)
// }

const FAQ = ({ id }) => {
	const faqItem = useRecoilValue(faqsAtom(id));

	return <div>
		<div>{faqItem.question}</div>
		<div>{faqItem.answer}</div>
	</div>
}

const FAQsList = () => {
	const faqsIds = useRecoilValue(catalogueFaqsAtom);

	return <div>
		{ faqsIds.map(id => <FAQ id = {id} key = {id} />) }
	</div>
};

const FAQsPage = () => {
	// const [loading, setLoading] = useState(true);

	// useEffect(async () => {
	// 	await new Promise(resolve => setTimeout(resolve,1000));
	// 	setLoading(false);
	// });
	

	return <MainContainer>
		{/* {loading ? <FullSpinner text="Retrieving FAQs page..." /> : <Body />} */}
		<div className={cssBody}>
			<div className={cssFaqContent}>
				<PageTitle 
					title={`Frequently Asked Questions`}
				/>
				<FAQsList />
			</div>
		</div>
	</MainContainer>;
}

// #endregion

export default FAQsPage;