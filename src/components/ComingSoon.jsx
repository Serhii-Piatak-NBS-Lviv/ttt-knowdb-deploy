import React from 'react';
import { css } from '@emotion/css/macro';
import { screenSizes } from '../assets/screenSizes';

// #region constants

// #endregion

// #region styled-components
const containerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: ${screenSizes.mediumTablet}) {
		flex-direction: column;
	};
`
const kittyFace = css`
	text-align: center;
	font-size: 3vw;

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 6vw;
    	align-self: flex-end;
    	width: 80vw;
	};
`;

const imageStyle = css`
	width: 75%;
	height: auto;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
	};
`;

const symbolArt = css`
	font-size: 1vw;
	max-width: 32%;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 100%;
		font-size: 3vw;
    	align-self: flex-start;
	};
`;
// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */
const ComingSoon = () => {
	return <div className={containerStyles}>
		<img className={imageStyle} src={require('../assets/coming_soon.jpg')} alt="" />
		<div className={symbolArt}>

			╔═══╗─────────────╔═══╗
			║╔═╗║─────────────║╔═╗║
			║║─╚╬══╦╗╔╦╦═╗╔══╗║╚══╦══╦══╦═╗
			║║─╔╣╔╗║╚╝╠╣╔╗╣╔╗║╚══╗║╔╗║╔╗║╔╗╗
			║╚═╝║╚╝║║║║║║║║╚╝║║╚═╝║╚╝║╚╝║║║║
			╚═══╩══╩╩╩╩╩╝╚╩═╗║╚═══╩══╩══╩╝╚╝
			──────────────╔═╝║
			──────────────╚══╝

			<h2 className={kittyFace}>≧◔◡◔≦</h2>
		</div>
	</div>;
}

// #endregion

export default ComingSoon;