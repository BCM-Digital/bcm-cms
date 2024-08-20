import path from 'path'

import nestedDocs from '@payloadcms/plugin-nested-docs'
import seo from '@payloadcms/plugin-seo'
import formBuilder from '@payloadcms/plugin-form-builder'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

// Collections
import Users from './collections/Users'
import Pages from './collections/Pages'
import Projects from './collections/Projects'
import Media from './collections/Media'

// Globals
import Header from './globals/Header'
import Contact from './globals/Contact'
import Footer from './globals/Footer'
import EmailHtml from './utilities/EmailHtml'
import CallsToAction from './collections/CallsToAction'

const PAYLOAD_PUBLIC_SERVER_URL =
	process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://cms.business-template.com'
const PAYLOAD_PUBLIC_NEXT_SERVER_URL =
	process.env.PAYLOAD_PUBLIC_NEXT_SERVER_URL ||
	'https://www.business-template.com'

export default buildConfig({
	serverURL: PAYLOAD_PUBLIC_SERVER_URL,
	admin: {
		user: Users.slug,
		bundler: webpackBundler(),
		livePreview: {
			collections: ['pages'],
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
	collections: [Pages, Projects, CallsToAction, Media, Users],
	globals: [Header, Contact, Footer],
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
			collections: ['pages'],
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
	db: mongooseAdapter({
		url: process.env.DATABASE_URI,
	}),
})
