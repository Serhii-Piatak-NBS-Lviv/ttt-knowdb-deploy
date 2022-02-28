import React from 'react';
import styled from '@emotion/styled/macro';
import { screenSizes } from '../assets/screenSizes';

// #region constants

// #endregion

// #region styled-components
const MainContainer = styled.main`
	width: 68vw;
	padding: 0 16vw;
	margin-bottom: 4vw;

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 84%;
		padding: 0 8vw;
	};
`
// #endregion


export default MainContainer;