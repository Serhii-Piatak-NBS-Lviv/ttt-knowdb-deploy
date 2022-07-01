import React, {useState, useEffect} from 'react';
import { css } from '@emotion/css/macro';
import styled from '@emotion/styled/macro';
import { screenSizes } from './assets/screenSizes';
import MainContainer from './components/MainContainer';
// import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import FullSpinner from './components/FullSpinner';
import Sidebar from './components/sidebar/Sidebar';
import useResizeAware from 'react-resize-aware';

// #region constants

// #endregion

// #region styled-components
const fontStyling = css`
	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.5vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.5vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.5vw;
	};
`;

const Field = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.5vw;
	color: #383838;
	gap: 0.3vw;

	& * {
		font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	};

	@media(max-width: ${screenSizes.largeTablet}) {
		margin-bottom: 3vw;
		gap: 1.3vw;
		font-size: 1.7vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.7vw;
		margin-bottom: 4.5vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.7vw;
		margin-bottom: 7.5vw;
	};
`;

const cssBody = css`
	display: flex;
	justify-content: space-between;
    width: 100%;

	@media(max-width: ${screenSizes.mediumTablet}) {
		flex-direction: column;
	};
`;

const cssContent = css`
	width: 65%;

	& fieldset {
		border: none;
	};

	& input[type="text"], & input[type="email"] {
		width: 55%;
		font-size: 1vw;

		${fontStyling}

		@media(max-width: ${screenSizes.largeTablet}) {
			width: 70%;
		};

		@media(max-width: ${screenSizes.smartPhones}) {
			width: 100%;
		};
	};

	& input[type="submit"] {
		width: 10%;
		background-color: #a03717;
		border: none;
		color: #fff;
		padding: 0.5em 1em;
		font-size: 0.9vw;
		cursor: pointer;
		box-sizing: border-box;

		@media(max-width: ${screenSizes.largeTablet}) {
			width: 12%;
			font-size: 1.3vw;
		};

		@media(max-width: ${screenSizes.mediumTablet}) {
			width: 14%;
			font-size: 2.3vw;
		};

		@media(max-width: ${screenSizes.smartPhones}) {
			width: 20%;
			font-size: 3vw;
		};
	};

	& textarea {
		${fontStyling}
	};

	@media(max-width: ${screenSizes.largeTablet}) {
		width: 70%;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
	};
`;

const alertBox = css`
	background-color: #65adc9;
    color: #fff;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	margin: 2vw 0;

	& > span {
		position: static;
		display: block;
		width: 10%;
		font-size: 0.9vw;
		text-align: center;
		left: 0;
		top: 0;
		padding: 0.2vw 0;
		color: #fafafa;
		background: rgba(0,0,0,0.2);
		border-radius: 1px 0 1px 0;

		@media(max-width: ${screenSizes.largeTablet}) {
			width: 12%;
			font-size: 1.3vw;
		};

		@media(max-width: ${screenSizes.mediumTablet}) {
			width: 15%;
			font-size: 2vw;
			padding: 0.6vw 0;
		};

		@media(max-width: ${screenSizes.smartPhones}) {
			width: 22%;
			font-size: 3vw;
			padding: 0.8vw 0;
		};
	};

	& > p {
		padding: 2vw 4vw;
		padding-top: 1vw;
		margin: 0;
		box-sizing: border-box;

		@media(max-width: ${screenSizes.largeTablet}) {
			font-size: 1.5vw;
			line-height: 2.2vw;
		};

		@media(max-width: ${screenSizes.mediumTablet}) {
			font-size: 2vw;
			line-height: 3vw;
			padding: 3vw 4vw;
			padding-top: 2vw;
		};

		@media(max-width: ${screenSizes.smartPhones}) {
			font-size: 3.2vw;
			line-height: 4.5vw;
		};
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		margin: 7vw 0;
	}
`;
// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */
const Body = () => {
	const [resizeListener, size] = useResizeAware();

	return (
		<>
			{/* <ComingSoon /> */}
			{resizeListener}
			<div className={cssContent}>
			<PageTitle text="Rise Your Question" />
			
			<form>
				<div className={alertBox}>
					<span>Important</span>
					<p>
						Before send your question please make sure that you have been tried to type few search terms in the field above and haven't found any acceptable answers.
					</p>
				</div>
				<fieldset>

					<Field>
						<label htmlFor="your-name">Your Name (required)</label>
						<input id="your-name" name="senderName" type="text" required />
					</Field>

					<Field>
						<label htmlFor="your-email">Your Email (required)</label>
						<input id="your-email" name="senderMail" type="email" required />
					</Field>

					<Field>
						<label htmlFor="your-subject">Subject</label>
						<input id="your-subject" name="mailSubj" type="text" />
					</Field>

					<Field>
						<label htmlFor="your-message">Your Message</label>
						<textarea 
							id="your-message" 
							name="mailMessage" 
							cols={size.width > 480 ? "50" : "35"}
							rows={size.width > 480 ? "10" : "20"}>
						</textarea>
					</Field>

					<Field>
						<input type="submit" value="Send" />
					</Field>
					
				</fieldset>
			</form>
			</div>
		</>
	)
};

const ContactPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		await new Promise(resolve => setTimeout(resolve,1000));
		setLoading(false);
	});

	return <MainContainer>
		{
			loading ? <FullSpinner text="Retrieving Contact page..." /> 
			: 
				<div className={cssBody}>
					<Body />
					<Sidebar />
				</div>
		}
	</MainContainer>;
};

// #endregion

export default ContactPage;