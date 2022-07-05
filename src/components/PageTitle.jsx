import React from 'react';
import { css } from '@emotion/css/macro';
import PropTypes from 'prop-types';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {useRecoilValue} from 'recoil';
import { IoHome } from "react-icons/io5";
import { BsForwardFill } from "react-icons/bs";
import {Link} from 'react-router-dom';

import { screenSizes } from '../assets/screenSizes';
import {categoryAtom, ctGenealogySelector} from '../atoms';

// #region constants

// #endregion

// #region styled-components
const styleRules = css`
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	color: #1a1a1a;
	font-weight: 400;
	font-size: 1.6vw;
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 1vw;
	padding-top: 2vw;

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 2.5vw;
		padding-bottom: 1.5vw;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 3.5vw;
		padding-bottom: 2vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 4.5vw;
		padding-bottom: 3vw;
	};
`;

const cssDescription = css`
	color: #808080;
	font-size: 1vw;
	font-weight: 246;
	font-style: italic;
	margin-top: 0.4vw;
	letter-spacing: 0.05em;
`;
// #endregion

// #region component
const propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	route: PropTypes.string,
};

const defaultProps = {
	title: "",
	description: "",
	route: "",
};

const HomeBreadcrumb = () => (<span><Link to="/home"><IoHome /></Link></span>);

const BreadcrumbItem = ({cId}) => {
	const oCategory = useRecoilValue(categoryAtom(cId));

	return <span>
		<BsForwardFill />
		{oCategory.title}
	</span>
};

const AncestorBreadcrumbs = ({cId}) => {
	let ancestors = useRecoilValue(ctGenealogySelector({id: cId, routeAcc:[]}));

	return <span>
		{ancestors.length ? ancestors.map((ancId) => <Link to={`/categories/${ancId}`} key={ancId}><BreadcrumbItem cId={ancId}/></Link>) : null}
	</span>
}



/**
 * 
 */
const PageTitle = ({ title, description, categoryId }) => {
	const routes = [
		{ path: '/', breadcrumb: HomeBreadcrumb },
		{ path: '/categories', breadcrumb: AncestorBreadcrumbs, props: { cId: categoryId } },
		{ path: '/categories/:category_id', breadcrumb: BreadcrumbItem, props: { cId: categoryId } },
	];

	const breadcrumbs = useBreadcrumbs(routes);

	return <>
		<h1 className={styleRules}>{title}
			{description ? <div className={cssDescription}>{description.slice(3,-4)}</div> : null}
			{breadcrumbs[2] ? 
				breadcrumbs.map(({ breadcrumb }) => <span>{breadcrumb}</span>)
			: null}
		</h1>
	</>;
}

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;
// #endregion

export default PageTitle;