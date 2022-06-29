import React from 'react';
import {useRecoilValue, useRecoilCallback, useResetRecoilState, useRecoilState} from 'recoil';
import {categoryAtom, catalogueCategoriesAtom, articleAtom, catalogueArticlesAtom} from './atoms';

export const EnumKnowledges = ({categories, sharepoints}) => {

	const clearContentState = useRecoilCallback(({reset}) => {
		return () =>  {
			reset(catalogueCategoriesAtom);
			reset(catalogueArticlesAtom);
		};
	});

	const addCategory = useRecoilCallback(({set}) => {
		return (oCategory, subCatgs, articles) => {
			const newCategoryObj = {
				id: oCategory.uuid[0].value,
				title: oCategory.name[0].value,
				description: oCategory.description[0].processed,
				url: oCategory.path[0].alias,
				parent_category: oCategory.parent[0].target_uuid,
				amount: articles.length,
				subcategories: [...subCatgs],
				articles: [...articles],
			};
			set(catalogueCategoriesAtom, x => [...x, oCategory.uuid[0].value]);
			set(categoryAtom(oCategory.uuid[0].value), newCategoryObj);
			// console.log(`----Adding a new category---`);
			// console.log(JSON.stringify(newCategoryObj));
		};
	});

	const addLinkOrArticle = useRecoilCallback(({set}) => {
		return (oArticle) => {
		// 	const isFromPopular = vwPopularArticles.reduce((result, article) => {
		// 		if (article.id === oArticle.id) result = true;
		// 		return result;
		// 	}, false);

		// 	const isFromLatest = vwLatestArticles.reduce((result, article) => {
		// 		if (article.id === oArticle.id) result = true;
		// 		return result;
		// 	}, false);

		const newArticleObj = {
			id: oArticle.uuid[0].value,
			type: oArticle.type[0].target_id,
			title: oArticle.type[0].target_id === "reference_link" ? oArticle.field_url[0].title : "",
			url: oArticle.type[0].target_id === "reference_link" ? oArticle.field_url[0].uri : "",
			isVideo: oArticle.type[0].target_id === "reference_link" ? false : false, //ToDo: oArticle.video,
			isPopular: false, //ToDo: isFromPopular,
			isLatest: false,  //ToDo: isFromLatest,
			description: oArticle.field_description[0].value,
			content: oArticle.type[0].target_id === "reference_link" ? oArticle.field_origin_type[0].value : "",
		};

		set(catalogueArticlesAtom, x => [...x, oArticle.uuid[0].value]);
		set(articleAtom(oArticle.uuid[0].value), newArticleObj);

			// console.log(`----Adding a new article---`);
			// console.log(JSON.stringify(newArticleObj));
		};
	});

	const enumLinkOrArticle = (arrLnkOrArtcl) => {
		arrLnkOrArtcl.map((knowledge) => addLinkOrArticle(knowledge));
	};

	clearContentState();

	//** Enumerating categories */
	categories.map((category) => {

		// Getting appropriate subcategories id's for this category 
		const subCtg = categories.reduce((acc, item) => {
			if (item.parent[0].target_uuid === category.uuid[0].value) acc.push(item.uuid[0].value);
			return acc;
		}, []);

		// Getting appropriate shared links for this category
		const ctgShareLinks = sharepoints.reduce((acc, item) => {
			if (item.field_category[0].target_uuid === category.uuid[0].value) acc.push(item.uuid[0].value);
			return acc;
		}, []);

		// Aggregated array containing all Sharepoints&Ko and articles related to this category
		const ctgContent = [...ctgShareLinks];

		// ToDo: scramble items of ctgContent array before pass it into addCategory function
		// adding category atom to the atom family
		addCategory(category, subCtg, ctgContent);
	});

	//** Enumerating sharePoints */
	enumLinkOrArticle(sharepoints);

	return <></>
};

export default EnumKnowledges;