import {atom, selector, atomFamily} from 'recoil';

// ================ This part serves the state of live search form ============
export const searchFormState = atom({
	key: "liveSearchForm",
	default: {
		loading: false,
		query: "",
	}
});

export const searchTypingSelector = selector({
	key: "isSearchTyping",
	get: ({get}) => {
		const searchFormAtom = {...get(searchFormState)};
		return searchFormAtom.loading;
	},
	set: ({get, set}, newVal) => {
		const searchFormAtom = {...get(searchFormState), loading: newVal};
		set(searchFormState, searchFormAtom);
	},
});

export const searchQuerySelector = selector({
	key: "liveSearchQuery",
	get: ({get}) => {
		const searchFormAtom = {...get(searchFormState)};
		return searchFormAtom.query;
	},
	set: ({get, set}, newVal) => {
		const searchFormAtom = {...get(searchFormState), query: newVal};
		set(searchFormState, searchFormAtom);
	},
});

// ==== This part serves main content indexing =====
export const catalogueCategoriesAtom = atom({
	key: "catalogueCategories",
	default: [],
});

export const catalogueArticlesAtom = atom({
	key: "catalogueArticles",
	default: [],
});

// export const allCategorySelector = selector({
// 	key: "getAllCategories",
// 	get: ({get}) => ({...get(catalogueCategoriesAtom)}),
// 	set: ({get, set}, newCategoryTitle) => {
// 		const catgCatalog = {...get(catalogueCategoriesAtom)};
// 		catgCatalog.push({
// 			id: `category-${nanoid(5)}`,
// 			title: newCategoryTitle,
// 		});
// 		set(catalogueCategoriesAtom, catgCatalog);
// 	}
// });

// export const indexArticles = atom({
// 	key: "idxArticle",
// 	default: []
// });

export const categoryAtom = atomFamily({
	key: "category",
	default: {
		title: "",
		url: "",
		parent_category: "",
		amount: 0,
		subcategories: [],
		articles: [],
	}
});

export const articleAtom = atomFamily({
	key: "article",
	default: {
		title: "",
		url: "",
		isVideo: false,
		isPopular: false,
		isLatest: false,
		description: "",
		content: "",
	}
});