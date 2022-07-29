import React, {useRef, useEffect, useState} from 'react';
import MainContainer from './components/MainContainer';
import { css, cx } from '@emotion/css/macro';
import {useRecoilValue, useRecoilState} from 'recoil';

// import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import {catalogueFaqsAtom, faqsAtom, lvsrchFaqSelectedAtomSelector} from './atoms';
import {BASIC_URL_DEV} from './endpoints';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';

// #region constants

// #endregion

// #region styled-components
const cssBody = css`
	display: flex;
	justify-content: space-between;
    width: 100%;

	@media(max-width: ${screenSizes.mediumTablet}) {
		flex-direction: column;
	};
`;

const cssFaqContent = css`
	width: 65%;

	@media(max-width: ${screenSizes.largeTablet}) {
		width: 70%;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
	};
`;

const cssFaq = css`
	border-bottom: 1px solid #E6E6E6;
`;

const cssFaqQuestion = css`
	cursor: pointer;
	color: #45454C;
	font-size: 1.5vw;
	letter-spacing: -0.5px;
	padding: 0.7em 0;

	& > .qTitle:hover {
		color: #a03717;
	};

	&.opened {color: #a03717};

	@media(max-width: ${screenSizes.largeTablet}) {font-size: 2vw;};

	@media(max-width: ${screenSizes.mediumTablet}) {font-size: 2.7vw;};

	@media(max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw;};
`;

const cssFaqPictogram = css`
	margin-right: 1.3vw;
`;

const cssFaqAnswer = css`
	transform-origin: 0;
	transform: translateY(-3vw) scaleY(0);
	transition:         0.7s ease-in-out;
	opacity: 0;
	height: 0;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	color: #383838;
	font-size: 0.95vw;
	line-height: 1.4vw;
	letter-spacing: 0.5px;

	& > * {
		position: unset;
	}

	&.opened, &.opened * {
		opacity: 1;
		transform: translateY(0) scaleY(1);
		height: auto;
	};

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.3vw;
		line-height: 2vw;
		letter-spacing: 0.7px;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 1.7vw;
		line-height: 2.7vw;
		letter-spacing: 0.8px;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 2.5vw;
		line-height: 3.7vw;
		letter-spacing: 1px;
	};
`;


// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */

const FAQ = ({ id, isInitOpen }) => {
	const faqItem = useRecoilValue(faqsAtom(id));
	const answRef = useRef();
	const myFaq = useRef();
	const [faqSelected, setFaqSelected] = useRecoilState(lvsrchFaqSelectedAtomSelector);

	const [isOpened, setIsOpened] = useState();

	const getCorrectImgUrl = (url) => (`${BASIC_URL_DEV}/${url.slice(url.indexOf('sites'))}`);

	const updFaqState = () => {
		if (isOpened && faqSelected) setFaqSelected("");
		setIsOpened(!isOpened);
	};

	useEffect(() => {
		setIsOpened(isInitOpen);
		const divAnswer = answRef.current;
		divAnswer.innerHTML = faqItem.answer;
		const chldAnswer = Array.from(answRef.current.childNodes);
		// console.log(chldAnswer);
		chldAnswer.map((el) => {
			if (el.tagName === "FIGURE") {
				el.firstElementChild.src = getCorrectImgUrl(el.firstElementChild.src);
			};
			if (el.tagName === "P") {
				if (el.firstChild.tagName === "IMG") {
					el.firstChild.src = getCorrectImgUrl(el.firstChild.src);
				}
			}
		});
		// console.log(imgAnswer);
		// answRef.current.innerHtml = faqItem.answer;
	}, [isInitOpen]);

	return <div className={cssFaq} ref={myFaq}>
		{isOpened ? myFaq.current.scrollIntoView() : null}

		<div className={cx(cssFaqQuestion, isOpened ? "opened" : "")} onClick={updFaqState}>
			{isOpened ? <FaMinusCircle className={cssFaqPictogram} /> : <FaPlusCircle className={cssFaqPictogram} />}
			<span className="qTitle">{faqItem.question} </span>
		</div>

		<div ref={answRef} className={cx(cssFaqAnswer, isOpened ? "opened" : "")}/>
	</div>
}

const FAQsList = () => {
	const faqsIds = useRecoilValue(catalogueFaqsAtom);
	const [faqSelected, setFaqSelected] = useRecoilState(lvsrchFaqSelectedAtomSelector);

	return <div>
		{ faqsIds.map(id => <FAQ id = {id} key = {id} isInitOpen={faqSelected === id ? true : false}/>) }
	</div>
};

const FAQsPage = () => {

	return <MainContainer>
		<div className={cssBody}>
			<div className={cssFaqContent}>
				<PageTitle 
					title={`Frequently Asked Questions`}
				/>
				<FAQsList />
			</div>
		</div>
	</MainContainer>;

}

// #endregion

export default FAQsPage;