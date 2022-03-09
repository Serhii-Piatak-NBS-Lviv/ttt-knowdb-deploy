import {useState} from 'react';
import { css } from '@emotion/css/macro';
import styled from '@emotion/styled';
import { screenSizes } from '../assets/screenSizes';
import PropTypes from 'prop-types';
import useResizeAware from 'react-resize-aware';
import {FaSearch, FaRegHandPointer, FaRegEnvelope} from 'react-icons/fa';
import Typing from './generic/Typing';
import {vwContentIdx} from '../assets/apisimul/serverdata_main';

// #region constants
const SECTION_BACKGROUND = '#f5f5f5';
const SECTION_BORDER = '#e8e8e8';
const INPUT_BACKGROUND = '#fff';
const INPUT_BORDER = '1px solid rgb(209,209,209)';
const INPUT_PLACEHOLDER = 'Looking for answer? Just start typing a search term!';
const INPUT_PLACEHOLDER_PHONE = 'Need answer? Type a search term!';

const initState = {
	loading: false,
	query: "",
	data: [],
}
// #endregion

// #region styled-components
const Section = styled.section`
	width: 100vw;
	background: ${SECTION_BACKGROUND};
    padding: 25px 0;
    border-top: 1px solid ${SECTION_BORDER};
    border-bottom: 1px solid ${SECTION_BORDER};
	display: flex;
	justify-content: center;
`;

const Input = styled.input`
	width: 65%;
	background: ${INPUT_BACKGROUND};
	color: #595959;
	font-size: 16px;
	padding: 20px 25px;
	padding-left: 5vw;
	border: ${INPUT_BORDER};
	box-shadow: none;
	position: relative;
	outline: 0;
	border-radius: 10vw;
	box-sizing: border-box;

	@media (max-width: ${screenSizes.largeTablet}) {
		padding-left: 7vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 80%;
		padding-left: 9vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		padding-right: 0;
		padding-left: 11vw;
		width: 90%;
	}
`;

const searchIco = css`
	display: flex;
    align-items: center;
    border: none;
    background: none;
    position: relative;
    left: 4%;
    font-size: 1.3vw;
	z-index: 1;
	color: #45454C;

	@media (max-width: ${screenSizes.largeTablet}) {
		left: 5%;
		font-size: 2vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		left: 7%;
		font-size: 3vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		left: 10%;
		font-size: 5vw;
	};
`;

const TypeAnim = css`
	display: flex;
    align-items: center;
    width: 3vw;
    position: absolute;
    left: 79%;
    top: 13.8vw;
`;

const liveSearchContainer = css`
	position: absolute;
    width: 63%;
    background-color: #fffdd2;
    border: 1px solid rgb(209,209,209);
    left: 20%;
    top: 15.5vw;
	box-sizing: border-box;
	padding: 0;
	font-family: "Open Sans",Helvetica,Arial,sans-serif;

	& > li {
		display: flex;
		align-items: center;
		list-style: none;
		padding: 0.8% 2%;
		color: #45454C;
	}
`;

const keepTypeTip = css`
	justify-content: center;
	color: #a03717 !important;
	gap: 1%;
`;

const contactLiveSearch = css`
	background-color: #e6e28f;
	gap: 3%;

	& > a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 7%;
		width: 10%;
		background-color: #a03717;
		color: #fff;
		text-decoration: none;
		padding: 0.5% 0.8%;
		border-radius: 1vw;
		box-sizing: border-box;
	};

	& > a:hover {
		background-color: #4a4a4a;
	};
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *  This is components compound. In addition to form component itself contains:
 *  - <TypingAnimation> component: displays while user typing a search query. Two seconds
 *   after user stops typing this component has to be hidden again
 *  - <QueryLiveSearch>: a box displaying search results while user typing a                                  query.   
 *  - <ContactInvite>: default nested "search result" contains proposition for user to fill contact form
 */
const TypingAnimation = () => {
	return <div className={TypeAnim}><Typing /></div>
};

const ContactInvite = () => {
	return (
		<li className={contactLiveSearch}>
			Steel haven't an answer after few queries? 
			<a href="#">
				<FaRegEnvelope />
				<div>Ask Us!</div>
			</a>
		</li>
	)
}


const QueryLiveSearch = ({isTyping, data}) => {
	return (
		<ul className={liveSearchContainer}>
			{isTyping && <li className={keepTypeTip}><FaRegHandPointer /> Keep typing for live search results...</li>}
			{
				!data.length ? <li>--- No results found ---</li> 
				: data.map((category) => category.view.map((article) => <li>{article.title}</li>))
				
			}
			<ContactInvite />
		</ul>
	)
};


const SearchForm = () => {
	const [resizeListener, sizes] = useResizeAware();
	const [appState, setAppState] = useState(initState);

	const delayStateLoadingFalse = (delay) => {
        setTimeout(() => setAppState(appSt => ({...appSt, loading: false})), delay);
    };

	const handleType = ({target}) => {
		setAppState(appSt => ({...appSt, loading: true}));
		setAppState(appSt => ({...appSt, query: target.value}));
		// ToDo: getting filtered articles
		if (target.value) {
			let dataQueried = vwContentIdx.reduce(
				(acc, itm) => {
					let results = itm.view.filter(
						(article) => article.title.toLowerCase().includes(target.value.toLowerCase())
					);
					results.length && acc.push({
						category: itm.category,
						view: results,
					});
					return acc;
				}
			,[]);
			// console.log(dataQueried);
			setAppState(appSt => ({...appSt, data: dataQueried}));
		} else {
			setAppState(appSt => ({...appSt, data: []}));
		};

		delayStateLoadingFalse(2000);
	}

	return <Section>
		{resizeListener}
		<button className={searchIco} type="submit" disabled><FaSearch /> </button>	
		<Input
			placeholder={
				sizes.width <= parseInt(screenSizes.mediumTablet) ? INPUT_PLACEHOLDER_PHONE : INPUT_PLACEHOLDER
			}
			onChange={handleType}
		/>
		{ appState.loading && <TypingAnimation /> }
		{ appState.query && <QueryLiveSearch isTyping={appState.loading} data={appState.data} />}
	</Section>;
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
// #endregion

export default SearchForm;