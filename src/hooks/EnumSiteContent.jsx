import React, {useState, useEffect} from 'react';
import {useRecoilValue, useRecoilCallback} from 'recoil';

import {vwCategories, vwPopularArticles, vwLatestArticles, vwContentIdx} from '../assets/apisimul/serverdata_main';
import {categoryAtom, catalogueCategoriesAtom, articleAtom, catalogueArticlesAtom} from '../atoms';

/**
 * This hook requests all major data from knowledge-base 
 * storage and performs two important tasks:
 *  1. Cataloging all categories and articles and filling in app state with routing from IDs 
 * to titles and wise versa;
 * 
 *  2. Filling in recoil graph mirroring all tree-structure 
 *  with parent-child relations between categories - subcategories - articles
 */
function useEnumSiteContent(requestURL) {
	const [categoryCatalogue, setCategoryCatalogue] = useState([]);
	const [articleCatalogue, setArticleCatalogue] = useState([]);

	const addCategory = useRecoilCallback(({set}) => {
		return (oCategory, subCatgs, articles) => {
			set(catalogueCategoriesAtom, x => [...x, oCategory.id]);
			set(categoryAtom(oCategory.id), {
				id: oCategory.id,
				title: oCategory.title,
				url: oCategory.url,
				parent_category: oCategory.parent_category,
				amount: articles.length,
				subcategories: [...subCatgs],
				articles: [...articles],
			});
		};
	});

	const addArticle = useRecoilCallback(({set}) => {
		return (oArticle) => {
			const isFromPopular = vwPopularArticles.reduce((result, article) => {
				if (article.id === oArticle.id) result = true;
			}, false);

			const isFromLatest = vwLatestArticles.reduce((result, article) => {
				if (article.id === oArticle.id) result = true;
			}, false);

			set(catalogueArticlesAtom, x => [...x, oArticle.id]);
			set(articleAtom(oArticle.id), {
				id: oArticle.id,
				title: oArticle.title,
				url: oArticle.url,
				isVideo: oArticle.isVideo,
				isPopular: isFromPopular,
				isLatest: isFromLatest,
			});
		};
	});

	useEffect(() => {
		// ToDo: perform query in accordance to requestURL:
		// simultaneous requests for:
		// - categories view;
		// - popular articles view;
		// - latest articles view;
		// - all articles view;
		// - all FAQ view.

		// for spinning up static data set from JSON files being used

		/** Enumerating categories */
		vwCategories.map((category) => {

			setCategoryCatalogue(x => [...x, {
				categoryId: category.id,
				categoryTitle: category.title,
			}]);

			// Getting appropriate subcategories id's for this category
			const subCtg = vwCategories.reduce((acc, item) => {
				if (item.parent_category === category.title) acc.push(item.id);
			}, []);

			// Getting appropriate articles for this category
			const ctgArticles = vwContentIdx.reduce((acc, item) => {
				if (item.category === category.title) {
					item.view.map((article) => acc.push(article.id));
				};
			}, []);

			// adding category atom to the atom family
			addCategory(category, subCtg, ctgArticles);
		});

		/** Enumerating articles */
		vwContentIdx.map((ctg) => {
			ctg.view.map((article) => {

				setArticleCatalogue(x => [...x, {
					articleId: category.id,
					articleTitle: category.title,
				}]);

				addArticle(article);
			});
		});
	}, []);

	return [categoryCatalogue, articleCatalogue];
}

export default useEnumSiteContent;