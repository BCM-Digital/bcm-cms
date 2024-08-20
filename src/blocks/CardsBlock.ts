import { Block } from 'payload/types'
import richText from '../fields/richText'
import linkGroup from '../fields/linkGroup'

export const CardsBlock: Block = {
	slug: 'cards-block',
	labels: {
		singular: 'Cards block',
		plural: 'Cards blocks',
	},
	interfaceName: 'CardsBlock',
	fields: [
		{
			name: 'cardsBlockFields',
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
						{
							name: 'breadcrumb',
							type: 'text',
							admin: {
								width: '50%',
							},
						},
					],
				},
				{
					name: 'title',
					type: 'text',
				},
				richText(),
				linkGroup({
					overrides: {
						label: 'Buttons',
						maxRows: 2,
					},
				}),
				{
					name: 'cards',
					type: 'array',
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
						},
						{
							name: 'shortDescription',
							type: 'textarea',
						},
						linkGroup({
							appearances: false,
							disableLabel: true,
							overrides: {
								label: 'Link',
								maxRows: 1,
							},
						}),
					],
				},
			],
		},
	],
}
