import { CollectionConfig } from 'payload/types'
import { isAdminsOrPublished } from '../../access/isAdminsOrPublished'
import { isAdmin } from '../../access/isAdmin'
import { revalidateProject } from './hooks/revalidateProject'
import { slugField } from '../../fields/slug'
import pageHead from '../../fields/pageHead'

import {
	CallToActionBlock,
	CardsBlock,
	ContactFormBlock,
	ImageSliderBlock,
	MediaAndContentBlock,
	MediaBlock,
	TabsBlock,
} from '../../blocks'

const Projects: CollectionConfig = {
	slug: 'projects',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'author', 'createdAt', 'status'],
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
		afterChange: [revalidateProject],
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'thumbnail',
			type: 'upload',
			relationTo: 'media',
			admin: {
				position: 'sidebar',
			},
		},
		slugField(),
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				position: 'sidebar',
			},
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
								TabsBlock,
							],
						},
					],
				},
			],
		},
		{
			name: 'relatedProjects',
			type: 'relationship',
			relationTo: 'projects',
			hasMany: true,
			filterOptions: ({ id }) => {
				return {
					id: {
						not_in: [id],
					},
				}
			},
		},
	],
}

export default Projects
