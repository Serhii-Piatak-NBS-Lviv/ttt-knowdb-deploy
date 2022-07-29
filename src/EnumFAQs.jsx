import React from 'react';
import { useRecoilCallback } from 'recoil';
import PropTypes from 'prop-types';

import {catalogueFaqsAtom, faqsAtom} from './atoms';

// #region constants

// #endregion

// #region component
const propTypes = {
	faqs: PropTypes.array,
};

const defaultProps = {
	faqs: [],
};

/**
 * 
 */
const EnumFAQs = ({ faqs }) => {

	const clearFaqState = useRecoilCallback(({reset}) => {
		return () =>  {
			reset(catalogueFaqsAtom);
		};
	});

	const addFaq = useRecoilCallback(({set}) => {
		return (oFaq) => {
			const newFaqObj = {
				id: oFaq.uuid[0].value,
				type: "faq",
				isOpened: false,
				question: oFaq.title[0].value,
				answer: oFaq.body[0].processed,
			};
			set(catalogueFaqsAtom, x => [...x, oFaq.uuid[0].value]);
			set(faqsAtom(oFaq.uuid[0].value), newFaqObj);
			// console.log(`----Adding a new FAQ---`);
			// console.log(JSON.stringify(newFaqObj));
		};
	});

	clearFaqState();

	faqs.map((faq) => addFaq(faq));

	return <div></div>;
}

EnumFAQs.propTypes = propTypes;
EnumFAQs.defaultProps = defaultProps;
// #endregion

export default EnumFAQs;