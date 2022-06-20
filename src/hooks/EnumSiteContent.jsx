import React, {useState, useEffect} from 'react';
import {useRecoilValue, useRecoilCallback, useResetRecoilState, useRecoilState} from 'recoil';
import axios from 'axios';

import {vwCategories, vwPopularArticles, vwLatestArticles, vwContentIdx} from '../assets/apisimul/serverdata_main';
import {categoryAtom, catalogueCategoriesAtom, articleAtom, catalogueArticlesAtom} from '../atoms';
import {BASIC_URL_DEV} from '../endpoints';

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
			const newCategoryObj = {
				id: oCategory.id,
				title: oCategory.title,
				url: oCategory.url,
				parent_category: oCategory.parent_category,
				amount: articles.length,
				subcategories: [...subCatgs],
				articles: [...articles],
			};
			set(catalogueCategoriesAtom, x => [...x, oCategory.id]);
			set(categoryAtom(oCategory.id), newCategoryObj);
			// console.log(`----Adding a new category---`);
			// console.log(JSON.stringify(newCategoryObj));
		};
	});

	const clearContentState = useRecoilCallback(({reset}) => {
		return () =>  {
			reset(catalogueCategoriesAtom);
			reset(catalogueArticlesAtom);
		};
	})

	const addArticle = useRecoilCallback(({set}) => {
		return (oArticle) => {
			const isFromPopular = vwPopularArticles.reduce((result, article) => {
				if (article.id === oArticle.id) result = true;
				return result;
			}, false);

			const isFromLatest = vwLatestArticles.reduce((result, article) => {
				if (article.id === oArticle.id) result = true;
				return result;
			}, false);

			const newArticleObj = {
				id: oArticle.id,
				title: oArticle.title,
				url: oArticle.url,
				isVideo: oArticle.video,
				isPopular: isFromPopular,
				isLatest: isFromLatest,
			};

			set(catalogueArticlesAtom, x => [...x, oArticle.id]);
			set(articleAtom(oArticle.id), newArticleObj);

			// console.log(`----Adding a new article---`);
			// console.log(JSON.stringify(newArticleObj));
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
		axios.get(`http://localhost:1234/get-all-reference-links?_format=json`).then((r) => console.log(r.data))
		// Every time before enumerating content we should clear previous enumeration
		clearContentState();

		//**Enumerating categories */
		vwCategories.map((category) => {

			setCategoryCatalogue(x => [...x, {
				categoryId: category.id,
				categoryTitle: category.title,
			}]);

			// Getting appropriate subcategories id's for this category 
			const subCtg = vwCategories.reduce((acc, item) => {
				if (item.parent_category === category.title) acc.push(item.id);
				return acc;
			}, []);

			// Getting appropriate articles for this category
			const ctgArticles = vwContentIdx.reduce((acc, item) => {
				if (item.category === category.title) {
					item.view.map((article) => acc.push(article.id));
				};
				return acc;
			}, []);

			// adding category atom to the atom family
			addCategory(category, subCtg, ctgArticles);
		});

		//** Enumerating articles */
		vwContentIdx.map((ctg) => {
			ctg.view.map((article) => {

				setArticleCatalogue(x => [...x, {
					articleId: article.id,
					articleTitle: article.title,
				}]);

				addArticle(article);
			});
		});
	}, []);

	
	return [categoryCatalogue, articleCatalogue];
};

export default useEnumSiteContent;