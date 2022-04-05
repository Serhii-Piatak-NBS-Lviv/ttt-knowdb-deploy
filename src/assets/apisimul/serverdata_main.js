import {nanoid} from 'nanoid';

export const vwCategories = [
	{
		id: `category-${nanoid(5)}`,
		title: "Account Settings",
		url: "https://demo.herothemes.com/knowhow/category/account-settings/",
		parent_category: "",
		amount: 6,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "API Questions",
		url: "https://demo.herothemes.com/knowhow/category/api-questions/",
		parent_category: "",
		amount: 5,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Billing",
		url: "https://demo.herothemes.com/knowhow/category/billing/",
		parent_category: "",
		amount: 6,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Copyright & Legal",
		url: "https://demo.herothemes.com/knowhow/category/copyright-legal/",
		parent_category: "",
		amount: 5,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Customization",
		url: "https://demo.herothemes.com/knowhow/category/using-knowhow/customization/",
		parent_category: "Using KnowHow",
		amount: 3,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Mobile Apps",
		url: "https://demo.herothemes.com/knowhow/category/mobile-apps/",
		parent_category: "",
		amount: 5,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Upgrading",
		url: "https://demo.herothemes.com/knowhow/category/using-knowhow/upgrading-using-knowhow/",
		parent_category: "Using KnowHow",
		amount: 2,
	},
	{
		id: `category-${nanoid(5)}`,
		title: "Using KnowHow",
		url: "https://demo.herothemes.com/knowhow/category/using-knowhow/",
		parent_category: "",
		amount: 6,
	},
];

export const vwPopularArticles = [
	{
		id: `article-abc001`,
		title: "How Secure Is My Password?",
		url: "https://demo.herothemes.com/knowhow/how-secure-is-my-password/",
		video: false,
	},
	{
		id: `article-abc002`,
		title: "What Technologies Are Used?",
		url: "https://demo.herothemes.com/knowhow/what-technologies-are-used/",
		video: true,
	},
	{
		id: `article-abc003`,
		title: "Can I Change My Username?",
		url: "https://demo.herothemes.com/knowhow/can-i-change-my-username/",
		video: false,
	},
	{
		id: `article-abc004`,
		title: "How Do I Change My Password?",
		url: "https://demo.herothemes.com/knowhow/how-do-i-change-my-password/",
		video: false,
	},
];

export const vwLatestArticles = [
	{
		id: `article-abc005`,
		title: "Customizing The Theme Colors",
		url: "https://demo.herothemes.com/knowhow/customizing-the-theme-colors/",
		video: false,
	},
	{
		id: `article-abc006`,
		title: "Recommended Plugins",
		url: "https://demo.herothemes.com/knowhow/recommended-plugins/",
		video: false,
	},
	{
		id: `article-abc007`,
		title: "Modifying The Background Image & Color",
		url: "https://demo.herothemes.com/knowhow/modifying-the-background-image-color/",
		video: false,
	},
	{
		id: `article-abc008`,
		title: "Changing The KnowHow Header",
		url: "https://demo.herothemes.com/knowhow/chaning-the-knowhow-header/",
		video: false,
	},
];

export const vwContentIdx = [
	{
		category: "Account Settings",
		view: [
			{
				id: `article-abc001`,
				title: "How Secure Is My Password?",
				url: "https://demo.herothemes.com/knowhow/how-secure-is-my-password/",
				video: false,
			},
			{
				id: `article-abc003`,
				title: "Can I Change My Username?",
				url: "https://demo.herothemes.com/knowhow/can-i-change-my-username/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Where Can I Upload My Avatar?",
				url: "https://demo.herothemes.com/knowhow/where-can-i-upload-my-avatar/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I Change My Timezone?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-change-my-timezone/",
				video: false,
			},
			{
				id: `article-abc004`,
				title: "How Do I Change My Password?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-change-my-password/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I Close My Account?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-close-my-account/",
				video: false,
			},
		],
	},
	{
		category: "API Questions",
		view: [
			{
				id: `article-abc002`,
				title: "What Technologies Are Used?",
				url: "https://demo.herothemes.com/knowhow/what-technologies-are-used/",
				video: true,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "What Are The API Limits?",
				url: "https://demo.herothemes.com/knowhow/what-are-the-api-limits/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Why Was My Developer Application Rejected?",
				url: "https://demo.herothemes.com/knowhow/why-was-my-developer-application-rejected/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Where can I find the documentation?",
				url: "https://demo.herothemes.com/knowhow/where-can-i-find-the-documentation/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I Get An API Key?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-get-an-api-key/",
				video: false,
			},
		],
	},
	{
		category: "Billing",
		view: [
			{
				id: `article-${nanoid(5)}`,
				title: "Can I Contact A Salés Rep?",
				url: "https://demo.herothemes.com/knowhow/can-i-contact-a-sales-rep/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Do I Need To Pay VAT?",
				url: "https://demo.herothemes.com/knowhow/do-i-need-to-pay-vat/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Can I Get A Refund?",
				url: "https://demo.herothemes.com/knowhow/can-i-get-a-refund/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "What’s The Difference Between Annual & Monthly Billing",
				url: "https://demo.herothemes.com/knowhow/whats-the-difference-between-annual-monthly-billing/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "What Happens If The Price Increases?",
				url: "https://demo.herothemes.com/knowhow/what-happens-if-the-price-increases/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "When Will I Be Billed?",
				url: "https://demo.herothemes.com/knowhow/when-will-i-be-billed/",
				video: false,
			},
		],
	},
	{
		category: "Copyright & Legal",
		view: [
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I Contact Legal?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-contact-legal/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Where Are Your Offices Located?",
				url: "https://demo.herothemes.com/knowhow/where-are-your-offices-located/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Who Owns The Copyright On Uploaded Text & Images?",
				url: "https://demo.herothemes.com/knowhow/who-owns-the-copyright-on-uploaded-text-images/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Our Content Policy",
				url: "https://demo.herothemes.com/knowhow/our-content-policy/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I File A DMCA?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-file-a-dmca/",
				video: false,
			},
		],
	},
	{
		category: "Mobile Apps",
		view: [
			{
				id: `article-${nanoid(5)}`,
				title: "How Do I Download The Andoird App?",
				url: "https://demo.herothemes.com/knowhow/how-do-i-download-the-andoird-app/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How To Download Our iPad App",
				url: "https://demo.herothemes.com/knowhow/how-to-download-our-ipad-app/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Incompatibilities With Horizon Phones",
				url: "https://demo.herothemes.com/knowhow/incompatibilities-with-horizon-phones/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Can I Use My Android Phone?",
				url: "https://demo.herothemes.com/knowhow/can-i-use-my-android-phone/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Is There An iOS App?",
				url: "https://demo.herothemes.com/knowhow/is-there-an-ios-app/",
				video: false,
			},
		],
	},
	{
		category: "Using KnowHow",
		view: [
			{
				id: `article-${nanoid(5)}`,
				title: "Customizing Your Theme",
				url: "https://demo.herothemes.com/knowhow/customizing-your-theme/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Upgrading Your Theme",
				url: "https://demo.herothemes.com/knowhow/upgrading-your-theme/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Installation Guide",
				url: "https://demo.herothemes.com/knowhow/installation-guide/",
				video: true,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Adding New FAQ Items",
				url: "https://demo.herothemes.com/knowhow/adding-new-faq-items/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Creating Articles",
				url: "https://demo.herothemes.com/knowhow/creating-articles/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "Introduction To KnowHow",
				url: "https://demo.herothemes.com/knowhow/introduction-to-knowhow/",
				video: false,
			}
		],
	},
	{
		category: "Customization",
		view: [
			{
				id: `article-abc005`,
				title: "Customizing The Theme Colors",
				url: "https://demo.herothemes.com/knowhow/customizing-the-theme-colors/",
				video: false,
			},
			{
				id: `article-abc007`,
				title: "Modifying The Background Image & Color",
				url: "https://demo.herothemes.com/knowhow/modifying-the-background-image-color/",
				video: false,
			},
			{
				id: `article-abc008`,
				title: "Changing The KnowHow Header",
				url: "https://demo.herothemes.com/knowhow/chaning-the-knowhow-header/",
				video: false,
			},
		],
	},
	{
		category: "Upgrading",
		view: [
			{
				id: `article-abc006`,
				title: "Recommended Plugins",
				url: "https://demo.herothemes.com/knowhow/recommended-plugins/",
				video: false,
			},
			{
				id: `article-${nanoid(5)}`,
				title: "How To Update Seamlessly Every Time",
				url: "https://demo.herothemes.com/knowhow/how-to-update-seamlessly-every-time/",
				video: false,
			},
		],
	},
]