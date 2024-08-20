import { Block } from 'payload/types'
import link from '../fields/link'

export const MenuLink: Block = {
	slug: 'menuLink',
	labels: {
		singular: 'Menu Link',
		plural: 'Menu Links',
	},
	interfaceName: 'MenuLink',
	fields: [
		{
			type: 'row',
			fields: [
				link({
					appearances: false,
					overrides: {
						label: false,
					},
				}),
			],
		},
	],
}
