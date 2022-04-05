import React, {useState, useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import {vwCategories, vwPopularArticles, vwLatestArticles, vwContentIdx} from '../assets/apisimul/serverdata_main';
import {categoryAtom} from '../atoms';

const defaultState = {
	catalogueCategories: [],
	catalogueArticles: [],
};

/**
 * This hook requests all major data from knowledge-base 
 * storage and performs two important tasks:
 *  1. Cataloging all categories and articles, assigning unique
 *  IDs to them, and filling in app state with routing from IDs 
 * to titles and wise versa;
 * 
 *  2. Filling in recoil graph mirroring all tree-structure 
 *  with parent-child relations between 
 *  categories - subcategories - articles
 */
function useEnumSiteContent(requestURL) {
	const [catalogue, setCatalogue] = useState(defaultState);

	useEffect(() => {
		// ToDo: perform query in accordance to requestURL:
		// simultaneous requests for:
		// - categories view;
		// - popular articles view;
		// - latest articles view;
		// - all articles view;
		// - all FAQ view.

		// for spinning up static data set from JSON files being used
		vwCategories.map((category) => {
			const ctgItem = useRecoilValue(categoryAtom(category.id));
		})
	}, []);

	return [catalogue, setCatalogue];
}

export default useEnumSiteContent;