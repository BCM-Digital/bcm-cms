import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import menu from '../fields/menu'
import richText from "../fields/richText";

const Footer: GlobalConfig = {
	slug: 'footer',
	label: 'Footer',
	access: {
		read: () => true,
		readVersions: isAdmin,
		update: isAdmin,
	},
	fields: [
		richText({
			name: 'footerRichText',
			label: 'Footer text',
			admin: {
				width: '100%',
			},
		}),
		{
			type: 'group',
			name: 'footerMenu',
			interfaceName: 'Menu',
			fields: [menu()],
		},
		{
			type: 'group',
			name: 'legalsMenu',
			interfaceName: 'Menu',
			fields: [menu()],
		},
	],
}

export default Footer
