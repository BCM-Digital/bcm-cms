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
					type: 'select',
					name: 'relationTo',
					label: 'Collection To Show',
					defaultValue: 'posts',
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
				},
			],
		},
	],
}
