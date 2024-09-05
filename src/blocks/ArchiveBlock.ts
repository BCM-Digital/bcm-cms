import type { Block } from 'payload/types'

import richText from '../fields/richText'

export const ArchiveBlock: Block = {
	slug: 'archive-block',
	interfaceName: 'ArchiveBlock',
	fields: [
		{
			name: 'archiveBlockFields',
			type: 'group',
			fields: [
				richText({
					name: 'introContent',
					label: 'Intro Content',
				}),
				{
					name: 'populateBy',
					type: 'select',
					defaultValue: 'collection',
					options: [
						{
							label: 'Collection',
							value: 'collection',
						},
						{
							label: 'Individual Selection',
							value: 'selection',
						},
					],
				},
				{
					type: 'select',
					name: 'relationTo',
					label: 'Collection To Show',
					defaultValue: 'posts',
					admin: {
						condition: (_, siblingData) =>
							siblingData.populateBy === 'collection',
					},
					options: [
						{
							label: 'News Articles',
							value: 'posts',
						},
						{
							label: 'Projects',
							value: 'projects',
						},
					],
				},
				{
					type: 'relationship',
					name: 'categories',
					label: 'Categories To Show',
					relationTo: 'categories',
					hasMany: true,
					admin: {
						condition: (_, siblingData) =>
							siblingData.populateBy === 'collection',
					},
				},
				{
					type: 'number',
					name: 'limit',
					label: 'Limit',
					defaultValue: 10,
					admin: {
						condition: (_, siblingData) =>
							siblingData.populateBy === 'collection',
						step: 1,
					},
				},
				{
					type: 'relationship',
					name: 'selectedDocs',
					label: 'Selection',
					relationTo: ['posts', 'projects'],
					hasMany: true,
					admin: {
						condition: (_, siblingData) =>
							siblingData.populateBy === 'selection',
					},
				},
				{
					type: 'relationship',
					name: 'populatedDocs',
					label: 'Populated Docs',
					relationTo: ['posts', 'projects'],
					hasMany: true,
					admin: {
						disabled: true,
						description: 'This field is auto-populated after-read',
						condition: (_, siblingData) =>
							siblingData.populateBy === 'collection',
					},
				},
				{
					type: 'number',
					name: 'populatedDocsTotal',
					label: 'Populated Docs Total',
					admin: {
						step: 1,
						disabled: true,
						description: 'This field is auto-populated after-read',
						condition: (_, siblingData) =>
							siblingData.populateBy === 'collection',
					},
				},
			],
		},
	],
}
