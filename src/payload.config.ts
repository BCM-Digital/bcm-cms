import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import formBuilder from '@payloadcms/plugin-form-builder'

import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload/config'

// Collections
import Categories from './collections/Categories'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import Projects from './collections/Projects'
import Users from './collections/Users'

// Globals
import Contact from './globals/Contact'
import Header from './globals/Header'
import Footer from './globals/Footer'
import Settings from './globals/Settings'
import EmailHtml from './utilities/EmailHtml'

const generateTitle: GenerateTitle = () => {
	return 'BCM'
}

const PAYLOAD_PUBLIC_SERVER_URL =
	process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://cms.business-template.com'
const PAYLOAD_PUBLIC_NEXT_SERVER_URL =
	process.env.PAYLOAD_PUBLIC_NEXT_SERVER_URL ||
	'https://www.business-template.com'

export default buildConfig({
	admin: {
		user: Users.slug,
		bundler: webpackBundler(),
		livePreview: {
			collections: ['pages', 'projects'],
			url: ({ data, documentInfo, locale }) =>
				`${PAYLOAD_PUBLIC_NEXT_SERVER_URL}/${
					data.slug !== 'home' ? data.slug : ''
				}`,
			breakpoints: [
				{
					name: 'mobile',
					height: 896,
					label: 'Mobile',
					width: 414,
				},
				{
					name: 'tablet',
					height: 1024,
					label: 'Tablet',
					width: 768,
				},
				{
					name: 'tablet-landscape',
					height: 768,
					label: 'Tablet landscape',
					width: 1024,
				},
				{
					name: 'laptop',
					height: 768,
					label: 'Laptop',
					width: 1366,
				},
			],
		},
	},
	editor: lexicalEditor({}),
	db: mongooseAdapter({
		url: process.env.DATABASE_URI,
	}),
	serverURL: PAYLOAD_PUBLIC_SERVER_URL,
	collections: [Pages, Projects, Posts, Media, Categories, Users],
	globals: [Header, Contact, Footer, Settings],
	rateLimit: {
		trustProxy: true,
		window: 2 * 60 * 1000, // 2 minutes
		max: 2400, // limit each IP per windowMs
	},
	localization: {
		locales: ['en'],
		defaultLocale: 'en',
		fallback: true,
	},
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
	},
	plugins: [
		formBuilder({
			formOverrides: {
				admin: {
					group: 'Content',
				},
			},
			formSubmissionOverrides: {
				admin: {
					group: 'Admin',
				},
			},
			redirectRelationships: ['pages'],
			beforeEmail: (emailsToSend) => {
				return emailsToSend.map((email) => ({
					...email,
					html: EmailHtml(email),
				}))
			},
		}),
		seo({
			collections: ['pages', 'projects'],
			generateTitle: ({ doc, locale, ...docInfo }: any) =>
				`${doc?.title?.value} | Business template`,
			generateDescription: ({ doc, locale, ...docInfo }: any) =>
				doc?.excerpt?.value,

			generateImage: ({ doc, locale, ...docInfo }: any) =>
				doc?.featureImage?.value,
			generateURL: ({ doc, locale, ...docInfo }: any) => {
				if (
					docInfo.collection?.slug === 'pages' &&
					doc?.fields?.slug?.value === 'home'
				) {
					return `${PAYLOAD_PUBLIC_NEXT_SERVER_URL}`
				}

				return `${PAYLOAD_PUBLIC_NEXT_SERVER_URL}/${doc?.fields?.slug?.value}`
			},
			uploadsCollection: 'media',
		}),
		nestedDocs({
			collections: ['pages'],
			generateLabel: (_, doc) => doc.title as string,
			generateURL: (docs) =>
				docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
		}),
	],
	cors: [
		'http://localhost:3000',
		PAYLOAD_PUBLIC_NEXT_SERVER_URL,
		PAYLOAD_PUBLIC_SERVER_URL,
	].filter(Boolean),
	csrf: [
		'http://localhost:3000',
		PAYLOAD_PUBLIC_NEXT_SERVER_URL,
		PAYLOAD_PUBLIC_SERVER_URL,
	].filter(Boolean),
})
