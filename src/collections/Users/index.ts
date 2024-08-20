import {
	isAdminOrSelf,
	isAdminOrSelfFieldLevel,
} from '../../access/isAdminOrSelf'
import { isAdmin, isAdminFieldLevel } from '../../access/isAdmin'
import { CollectionConfig } from 'payload/types'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		useAPIKey: true,
	},
	admin: {
		useAsTitle: 'fullName',
	},
	access: {
		create: isAdmin,
		read: () => true,
		update: isAdminOrSelf,
		delete: isAdminOrSelf,
	},
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'firstName',
					type: 'text',
					required: true,
				},
				{
					name: 'lastName',
					type: 'text',
					required: true,
				},
				{
					name: 'fullName',
					type: 'text',
					admin: {
						hidden: true, // hides the field from the admin panel
					},
					hooks: {
						beforeChange: [
							({ siblingData }) => {
								// ensures data is not stored in DB
								delete siblingData['fullName']
							},
						],
						afterRead: [
							({ data }) => {
								return `${data.firstName} ${data.lastName}`
							},
						],
					},
				},
			],
		},
		{
			name: 'roles',
			type: 'select',
			hasMany: true,
			defaultValue: ['public'],
			required: true,
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
			access: {
				read: isAdminOrSelfFieldLevel,
				create: isAdminFieldLevel,
				update: isAdminFieldLevel,
			},
			options: ['admin', 'public'],
		},
	],
	hooks: {
		afterChange: [loginAfterCreate],
	},
	timestamps: true,
}

export default Users
