import {atom, selector, atomFamily, selectorFamily} from 'recoil';

// ********** This part serves the state of live search form *********
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

export const liveSearchArticleSelector = selector({
	key: "liveSearchArticleSelector",
	get: ({get}) => {
		const listArticles = get(catalogueArticlesAtom);
		const searchQuery = get(searchQuerySelector);
		const matchedArticles = [];
		if (searchQuery) {
			listArticles.forEach(id => {
				const objArticle = {...get(articleAtom(id))};
				if (objArticle.title.toLowerCase().includes(searchQuery.toLowerCase())) matchedArticles.push(objArticle.id);
			});
		};
		return matchedArticles;
	}
});

export const getArticleCategorySelector = selectorFamily({
	key: "getArticleCategorySelector",
	get: (articleId) => ({get}) => {
		const listCategories = get(catalogueCategoriesAtom);
		const matchedCategories = [];

		listCategories.forEach((ctgId) => {
			const objCategory = get(categoryAtom(ctgId));
			if (objCategory.articles.includes(articleId)) matchedCategories.push(objCategory);
		});
		return matchedCategories;
	}
});

// ***** This part serves main content indexing *******
export const catalogueCategoriesAtom = atom({
	key: "catalogueCategories",
	default: [],
});

export const catalogueArticlesAtom = atom({
	key: "catalogueArticles",
	default: [],
});

export const categoryAtom = atomFamily({
	key: "category",
	default: {
		title: "",
		type: "category",
		url: "",
		description: "",
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
		type: "",
		isVideo: false,
		isPopular: false,
		isLatest: false,
		description: "",
		content: "",
	}
});

export const totalCtgArticleSelector = selectorFamily({
	key: "totalCtgArticleSelector",
	get: id => ({get}) => {
		const ctgr = get(categoryAtom(id));
		let total = ctgr.amount;
		if (ctgr.subcategories.length) {
				ctgr.subcategories.forEach(subcatId => {
				const subctgr = get(categoryAtom(subcatId));
				total += subctgr.amount;
			});
		}
		
		return total;
	}
});

// category genealogy selector
export const ctGenealogySelector = selectorFamily({
	key: "ctGenealogySelector",
	get: ({id, routeAcc}) => ({get}) => {
		const ctgr = get(categoryAtom(id));

		if (ctgr.parent_category) {
			routeAcc = [ctgr.parent_category, ...routeAcc];
			get(ctGenealogySelector(ctgr.parent_category, routeAcc));
		};

		return routeAcc;
	}
});

export const publicationSelector = selectorFamily({
	key: "publicationSelector",
	get: ({id, type}) => ({get}) => {
		let publicationItem;
		if (type === 'article') {
			publicationItem = {...get(articleAtom(id))};
		} else {
			publicationItem = {...get(categoryAtom(id))};
		};
		return publicationItem;
	}
});

export const rmPublicationSelector = selectorFamily({
	key: "rmPublicationSelector",
	reset: ({id, type}) => ({reset}) => {

	}
})

export const popularArticleSelector = selector({
	key: "popularArticleSelector",
	get: ({get}) => {
		const listArticles = get(catalogueArticlesAtom);
		const popularArticles = [];
		listArticles.forEach(id => {
			const objArticle = {...get(articleAtom(id))};
			if (objArticle.isPopular) popularArticles.push(objArticle.id);
		});
		return popularArticles;
	}
});

export const latestArticleSelector = selector({
	key: "latestArticleSelector",
	get: ({get}) => {
		const listArticles = get(catalogueArticlesAtom);
		const latestArticles = [];
		listArticles.forEach(id => {
			const objArticle = {...get(articleAtom(id))};
			if (objArticle.isLatest) latestArticles.push(objArticle.id);
		});
		return latestArticles;
	}
});

// ***** This part serves FAQs indexing *******
export const catalogueFaqsAtom = atom({
	key: "catalogueFaqs",
	default: [],
});

export const faqsAtom = atomFamily({
	key: "FAQs",
	default: {
		question: "",
		answer: "",
		type: "faq",
		isOpened: false,
	}
});