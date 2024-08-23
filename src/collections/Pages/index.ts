import { populateAuthor } from '../../hooks/populateAuthor'
import { isAdminsOrPublished } from '../../access/isAdminsOrPublished'
import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/isAdmin'
import { revalidatePage } from './hooks/revalidatePage'
import { slugField } from '../../fields/slug'
import { fullTitle } from '../../fields/fullTitle'
import pageHead from '../../fields/pageHead'
import {
	CallToActionBlock,
	CardsBlock,
	ContactFormBlock,
	ImageSliderBlock,
	MediaAndContentBlock,
	MediaBlock,
	ProjectGrid,
	TabsBlock,
} from '../../blocks'

const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'fullTitle',
		defaultColumns: ['fullTitle', 'createdAt', 'status'],
		group: 'Content',
	},
	access: {
		create: isAdmin,
		read: isAdminsOrPublished,
		readVersions: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [revalidatePage],
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			localized: true,
		},
		fullTitle,
		{
			name: 'excerpt',
			type: 'textarea',
			localized: true,
		},
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Page Header',
					fields: [pageHead],
				},
				{
					label: 'Content',
					fields: [
						{
							name: 'layout',
							type: 'blocks',
							blocks: [
								CallToActionBlock,
								CardsBlock,
								ContactFormBlock,
								ImageSliderBlock,
								MediaAndContentBlock,
								MediaBlock,
								ProjectGrid,
								TabsBlock,
							],
						},
					],
				},
			],
		},
		slugField(),
		{
			name: 'author',
			relationTo: 'users',
			type: 'relationship',
			hooks: {
				beforeChange: [
					// By using a hook to set the author, admins cannot change the author as is allowed in the posts
					// collections that has a defaultValue property to populates it and allow changing in the UI
					populateAuthor,
				],
			},
			admin: {
				// this is going to be filled by the hook, or will remain the same on edit
				// readOnly: true,
				position: 'sidebar',
			},
		},
		{
			name: 'featureImage',
			label: 'Feature Image',
			type: 'upload',
			relationTo: 'media',
			admin: {
				position: 'sidebar',
			},
		},
	],
}

export default Pages
