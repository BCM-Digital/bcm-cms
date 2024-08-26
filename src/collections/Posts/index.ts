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
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateAuthor } from './hooks/populateAuthor'
import { revalidatePost } from './hooks/revalidatePost'

const Posts: CollectionConfig = {
	slug: 'posts',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'updatedAt'],
		group: 'Content',
	},
	hooks: {
		beforeChange: [populatePublishedAt],
		afterChange: [revalidatePost],
		afterRead: [populateArchiveBlock, populateAuthor],
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
			name: 'authors',
			type: 'relationship',
			relationTo: 'users',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		// This field is only used to populate the user data via the `populateAuthors` hook
		// This is because the `user` collection has access control locked to protect user privacy
		// GraphQL will also not return mutated user data that differs from the underlying schema
		{
			name: 'populatedAuthor',
			type: 'array',
			admin: {
				readOnly: true,
				disabled: true,
			},
			access: {
				update: () => false,
			},
			fields: [
				{
					name: 'id',
					type: 'text',
				},
				{
					name: 'name',
					type: 'text',
				},
			],
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
			name: 'relatedPosts',
			type: 'relationship',
			relationTo: 'posts',
			hasMany: true,
			filterOptions: ({ id }) => {
				return {
					id: {
						not_in: [id],
					},
				}
			},
		},
		slugField(),
	],
}

export default Posts
