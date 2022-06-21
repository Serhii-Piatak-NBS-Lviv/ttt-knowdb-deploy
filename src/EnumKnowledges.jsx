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
				url: oCategory.path[0].alias,
				parent_category: oCategory.parent[0].target_uuid,
				amount: articles.length,
				subcategories: [...subCatgs],
				articles: [...articles],
			};
			set(catalogueCategoriesAtom, x => [...x, oCategory.uuid[0].value]);
			set(categoryAtom(oCategory.uuid[0].value), newCategoryObj);
			console.log(`----Adding a new category---`);
			console.log(JSON.stringify(newCategoryObj));
		};
	});

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

	return <></>
};

export default EnumKnowledges;