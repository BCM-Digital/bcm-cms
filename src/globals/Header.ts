import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import menu from '../fields/menu'
import linkGroup from '../fields/linkGroup'

const Header: GlobalConfig = {
	slug: 'header',
	label: 'Header',
	access: {
		read: () => true,
		readVersions: isAdmin,
		update: isAdmin,
	},
	fields: [
		{
			type: 'group',
			name: 'mainMenu',
			interfaceName: 'MainMenu',
			fields: [menu()],
		},
	],
}

export default Header
