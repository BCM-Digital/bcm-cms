import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isAdminsOrPublished } from '../../access/isAdminsOrPublished'

import pageHead from '../../fields/pageHead'
import {
	CardsBlock,
	ContactFormBlock,
	ImageSliderBlock,
	MediaAndContentBlock,
	MediaBlock,
	TabsBlock,
} from '../../blocks'

import { slugField } from '../../fields/slug'
import { revalidateProject } from './hooks/revalidateProject'

const Projects: CollectionConfig = {
	slug: 'projects',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'createdAt', 'status'],
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
			name: 'categories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				position: 'sidebar',
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === 'published' && !value) {
							return new Date()
						}
						return value
					},
				],
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
