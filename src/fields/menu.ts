import { Field } from 'payload/types'

import link from '../fields/link'
import deepMerge from '../utilities/deepMerge'
import { MenuLink } from '../blocks/MenuLink'
const menuBlocks = [MenuLink]
type Menu = (options?: { overrides?: Record<string, unknown> }) => Field

const menu: Menu = ({ overrides = {} } = {}) => {
	const generatedMenu: Field = {
		name: 'menuItem',
		type: 'array',
		interfaceName: 'MenuItem',
		fields: [
			{
				name: 'type',
				type: 'radio',
				defaultValue: 'link',
				admin: {
					layout: 'horizontal',
				},
				options: [
					{
						label: 'Link',
						value: 'link',
					},
					{
						label: 'Submenu',
						value: 'submenu',
					},
				],
			},
			{
				name: 'label',
				admin: {
					width: '50%',
					condition: (_, { type } = {}) => type === 'submenu',
				},
				label: 'Label',
				required: true,
				type: 'text',
			},
			link({
				appearances: false,
				overrides: {
					admin: {
						condition: (_, siblingData) => siblingData.type !== 'submenu',
					},
				},
			}),
			{
				name: 'submenu',
				type: 'group',
				admin: {
					condition: (_, { type } = {}) => type === 'submenu',
					hideGutter: true,
				},
				fields: [
					{
						name: 'submenuItem',
						type: 'blocks',
						blocks: menuBlocks,
					},
				],
			},
		],
		admin: {},
	}

	return deepMerge(generatedMenu, overrides)
}

export default menu
