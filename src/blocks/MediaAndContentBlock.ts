import { Block } from 'payload/types'

import linkGroup from '../fields/linkGroup'
import richText from '../fields/richText'

export const MediaAndContentBlock: Block = {
	slug: 'media-and-content-block',
	labels: {
		singular: 'Media and content block',
		plural: 'Media and content blocks',
	},
	interfaceName: 'MediaAndContentBlock',
	fields: [
		{
			name: 'mediaAndContentBlockFields',
			type: 'group',
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'anchorId',
							type: 'text',
							admin: {
								width: '50%',
							},
						},
					],
				},
				{
					name: 'breadcrumb',
					type: 'text',
				},
				{
					name: 'title',
					type: 'text',
				},
				richText(),
				linkGroup({
					overrides: {
						maxRows: 2,
					},
				}),
				{
					name: 'media',
					label: 'Media',
					type: 'upload',
					relationTo: 'media',
					admin: {
						description:
							'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
					},
				},
				{
					name: 'mediaPosition',
					label: 'Media position',
					type: 'select',
					defaultValue: 'left',
					options: [
						{
							label: 'Left',
							value: 'left',
						},
						{
							label: 'Right',
							value: 'right',
						},
					],
				},
			],
		},
	],
}
