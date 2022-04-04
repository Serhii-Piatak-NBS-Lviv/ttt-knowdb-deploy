import {atom, selector} from 'recoil';

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