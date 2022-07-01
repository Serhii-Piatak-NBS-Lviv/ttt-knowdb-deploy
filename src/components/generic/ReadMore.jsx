import React from 'react';
import { cx, css } from '@emotion/css/macro';

// #region constants

// #endregion

// #region styled-components
const pin = css`
	position: relative;
	display: inline-block;
	height: 21px;
	min-width: 42px;
	padding: 0 10px 0 7px;
	margin-left: 20px;
	color: #fff;
	font-size: 0.63vw;
	font-family: Arial;
	text-align: center;
	line-height: 22px;
	text-transform: uppercase;
	border-radius: 4px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
	left: 55%;
	//transition: 0.2s;

	&::after {
		content: "";
		position: absolute;
		left: 88%;
		top: 8%;
		height: 15px;
		width: 15px;
		background-color: #7B6A58;
		border: 1px solid #7B6A58;
		border-radius: 4px;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
		z-index: -1;
		transform: rotate(45deg);
	};

	&::before {
		content: "";
		position: absolute;
		left: 98%;
		top: 2px;
		height: 19px;
		width: 2px;
		background-color: #7B6A58;
	};

	&:hover {
		//transform: translateX(5%);

		&::before {
			background-color: #A03717;
			border-color: #A03717;
		};

		&::after {
			background-color: #A03717;
		}
	}
`;

const pin__green = css`
	background-color: #7B6A58;
	border: 1px solid #7B6A58;
	border-right: 0 solid;

	&:hover {
		background-color: #A03717;
		border-color: #A03717;
	}
`;
// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */
const ReadMore = () => {
	return <div className={cx(pin, pin__green)}>See more</div>
};

// #endregion

export default ReadMore;