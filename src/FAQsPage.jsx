import React, {useRef, useEffect, useState} from 'react';
import MainContainer from './components/MainContainer';
import { css } from '@emotion/css/macro';
import {useRecoilValue} from 'recoil';

// import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import { screenSizes } from './assets/screenSizes';
import {catalogueFaqsAtom, faqsAtom} from './atoms';
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
	}
`;

const cssFaqPictogram = css`
	margin-right: 1.3vw;
`;

const cssFaqAnswer = css`

`;

const cssOpenedFaqAnswer = css`
	${cssFaqAnswer}
	display: block;
	-webkit-animation: SHOW-BOX 0.5s ease;
    -moz-animation: SHOW-BOX 0.5s ease;
    -o-animation: SHOW-BOX 0.5s ease;
    animation: SHOW-BOX 0.5s ease;

	@-webkit-keyframes SHOW-BOX {
		0%   { 
			height: 0; 
		}
		100% { 
			height: auto; 
		}
	};
	
	@-moz-keyframes SHOW-BOX {
		0%   { 
			height: 0; 
		}
		100% { 
			height: auto; 
		}
	};
	
	@-o-keyframes SHOW-BOX {
		0%   { 
			height: 0; 
		}
		100% { 
			height: auto; 
		}
	};
	
	@keyframes SHOW-BOX {
		0%   { 
			height: 0; 
		}
		100% { 
			height: auto; 
		}
	};
`;

const cssClosedFaqAnswer = css`
	${cssFaqAnswer}
	height: 0;
	display: none;
`;
// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */

const FAQ = ({ id }) => {
	const faqItem = useRecoilValue(faqsAtom(id));
	const answRef = useRef();
	const [isOpened, setIsOpened] = useState(false);

	const getCorrectImgUrl = (url) => (`${BASIC_URL_DEV}/${url.slice(url.indexOf('sites'))}`);

	const updFaqState = () => setIsOpened(!isOpened);

	useEffect(() => {
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
		})
		// console.log(imgAnswer);
		// answRef.current.innerHtml = faqItem.answer;
	}, []);

	return <div className={cssFaq}>

		<div className={cssFaqQuestion} onClick={updFaqState}>
			{isOpened ? <FaMinusCircle className={cssFaqPictogram} /> : <FaPlusCircle className={cssFaqPictogram} />}
			<span className="qTitle">{faqItem.question} </span>
		</div>

		<div ref={answRef} className={isOpened ? cssOpenedFaqAnswer : cssClosedFaqAnswer}/>
		
	</div>
}

const FAQsList = () => {
	const faqsIds = useRecoilValue(catalogueFaqsAtom);

	return <div>
		{ faqsIds.map(id => <FAQ id = {id} key = {id} />) }
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