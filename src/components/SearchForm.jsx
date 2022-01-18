import React from 'react';
import { css } from '@emotion/css/macro';
import styled from '@emotion/styled';
import { screenSizes } from '../assets/screenSizes';
import PropTypes from 'prop-types';
import useResizeAware from 'react-resize-aware';

// #region constants
const SECTION_BACKGROUND = '#f5f5f5';
const SECTION_BORDER = '#e8e8e8';
const INPUT_BACKGROUND = '#fff';
const INPUT_BORDER = '1px solid rgb(209,209,209)';
const INPUT_PLACEHOLDER = 'Looking for answer? Just start typing a search term!';
const INPUT_PLACEHOLDER_PHONE = 'Need answer? Type a search term!';
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
	border: ${INPUT_BORDER};
	box-shadow: none;
	position: relative;
	outline: 0;
	border-radius: 10vw;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 80%;
	};
`
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const SearchForm = () => {
	const [resizeListener, sizes] = useResizeAware();
	return <Section>
		{resizeListener}
		<Input
			placeholder={
				sizes.width <= parseInt(screenSizes.smartPhones) ? INPUT_PLACEHOLDER_PHONE : INPUT_PLACEHOLDER
			}
		/>
	</Section>;
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
// #endregion

export default SearchForm;