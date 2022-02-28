import React from 'react';
import PropTypes from 'prop-types';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {
	title: PropTypes.string.isRequired,
	cssLookup: PropTypes.object,
};

const defaultProps = {
	title: "",
	cssLookup: {},
};

/**
 * <title> prop - is exactly the publication title
 * <cssLookup> - is object contains classnames for css rules being applied
 * <children> - assumes pictogram
 */
const Publication = ({title, cssLookup, children}) => {
	return (
		<div className={cssLookup.container}>
			{children}
			<div className={cssLookup.title}>
				{title}
			</div>
		</div>
	);
}

Publication.propTypes = propTypes;
Publication.defaultProps = defaultProps;
// #endregion

export default Publication;