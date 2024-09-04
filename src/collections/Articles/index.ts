import type { CollectionConfig } from 'payload/types'

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
import { revalidateArticle } from './hooks/revalidateArticle'

const Articles: CollectionConfig = {
	slug: 'news',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'createdAt', 'status'],
		group: 'Content',
	},
	hooks: {
		afterChange: [revalidateArticle],
	},
	versions: {
		drafts: true,
	},
	access: {
		read: isAdminsOrPublished,
		update: isAdmin,
		create: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
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
				date: {
					pickerAppearance: 'dayAndTime',
				},
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
					label: 'Hero',
					fields: [pageHead],
				},
				{
					label: 'Content',
					fields: [
						{
							name: 'layout',
							type: 'blocks',
							required: true,
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
			name: 'relatedArticles',
			type: 'relationship',
			relationTo: 'news',
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

export default Articles
