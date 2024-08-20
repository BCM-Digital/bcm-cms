import { Block } from 'payload/types'

export const CallToActionBlock: Block = {
	slug: 'cta-block',
	labels: {
		singular: 'Call to action block',
		plural: 'Call to action blocks',
	},
	interfaceName: 'CallToActionBlock',
	fields: [
		{
			name: 'ctaBlockFields',
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
						}
					],
				},
				{
					name: 'cta',
					type: 'relationship',
					relationTo: 'ctas',
					hasMany: false,
				},
			],
		},
	],
}
