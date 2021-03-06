import React from 'react';
import { cx, css } from '@emotion/css/macro';
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

	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.5vw};
	@media(max-width: ${screenSizes.mediumTablet}) {font-size: 2.3vw};
	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 3.2vw;
		margin-top: 1.5vw;
	};
`;

const cssCrumb = css`
	color: #808080;
	font-size: 1vw;

	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.4vw};
	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.2vw;
		margin-right: 1vw;
	};
	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 3vw;
	};
`;

const cssCrumbLink = css`
	&:hover {
		color: #a03717;
		text-decoration: underline;
	}
`;

const cssCrumBlock = css`
	margin-top: 0.6vw;

	@media (max-width: ${screenSizes.smartPhones}) {
		margin-top: 3.4vw;
	};
`;

const cssCrumbDecor = css`text-decoration: none`;
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

const HomeBreadcrumb = () => (<span><Link to="/home" className={cssCrumbDecor}><IoHome className={cx(cssCrumb, cssCrumbLink)}/></Link></span>);

const BreadcrumbItem = ({cId, isAncestor}) => {
	const oCategory = useRecoilValue(categoryAtom(cId));

	return <span className={isAncestor ? cx(cssCrumb, cssCrumbLink) : cssCrumb}>
		<BsForwardFill className={cssCrumb}/>
		{oCategory.title}
	</span>
};

const AncestorBreadcrumbs = ({cId}) => {
	let ancestors = useRecoilValue(ctGenealogySelector({id: cId, routeAcc:[]}));

	return <span>
		{ancestors.length ? ancestors.map((ancId) => <Link to={`/categories/${ancId}`} key={ancId} className={cssCrumbDecor}><BreadcrumbItem cId={ancId} isAncestor={true}/></Link>) : null}
	</span>
};

const PageBreadcrumb = ({caption}) => {
	return <span className={cssCrumb}>
		<BsForwardFill className={cssCrumb}/>
		{caption}
	</span>
};


/**
 * 
 */
const PageTitle = ({ title, description, categoryId }) => {
	const routes = [
		{ 
			path: '/', breadcrumb: HomeBreadcrumb 
		},
		{ 
			path: '/categories', 
			breadcrumb: AncestorBreadcrumbs, 
			props: { 
				cId: categoryId,
			},
		},
		{ 
			path: '/categories/:category_id', 
			breadcrumb: BreadcrumbItem, 
			props: { 
				cId: categoryId, 
				isAncestor: false 
			},
		},
		{ 
			path: '/faqs', 
			breadcrumb: PageBreadcrumb, 
			props: { 
				caption: "FAQs",
			},
		},
		{ 
			path: '/contact', 
			breadcrumb: PageBreadcrumb, 
			props: { 
				caption: "Contact",
			},
		},
	];

	const breadcrumbs = useBreadcrumbs(routes);
	// console.log(breadcrumbs)

	return <>

		<h1 className={styleRules}>
			
			{title}

			{description ? <div className={cssDescription}>{description.slice(3,-4)}</div> : null}

			<div className={cssCrumBlock}>
				{breadcrumbs[1].key !== "/home" ? 
					breadcrumbs.map(({ breadcrumb }) => <span>{breadcrumb}</span>)
				: null}
			</div>
		
		</h1>
	</>;
}

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;
// #endregion

export default PageTitle;