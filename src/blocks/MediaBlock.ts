import embeddedVideo from '../fields/embeddedVideo'
import { Block } from 'payload/types'

export const MediaBlock: Block = {
	slug: 'media-block',
	labels: {
		singular: 'Media block',
		plural: 'Media blocks',
	},
	interfaceName: 'MediaBlock',
	fields: [
		{
			name: 'mediaBlockFields',
			type: 'group',
			fields: [
				{
					name: 'anchorId',
					type: 'text',
				},
				{
					name: 'media',
					type: 'array',
					required: true,
					minRows: 1,
					fields: [
						{
							name: 'media',
							label: 'Media',
							type: 'upload',
							relationTo: 'media',
							admin: {
								condition: (data, { embeddedVideo }) =>
									Boolean(!embeddedVideo?.embed),
								description:
									'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
							},
						},
						embeddedVideo(),
						{
							name: 'gridLayout',
							type: 'select',
							required: true,
							defaultValue: 'fullwidth',
							options: [
								{
									label: 'Full width',
									value: 'fullwidth',
								},
								{
									label: 'Full screen',
									value: 'fullscreen',
								},
								{
									label: 'Half',
									value: 'half',
								},
								{
									label: 'Third',
									value: 'third',
								},
							],
						},
					],
				},
			],
		},
	],
}
