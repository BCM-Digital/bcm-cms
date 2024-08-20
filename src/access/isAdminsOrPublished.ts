import { Access } from 'payload/config'
import { checkRole } from '../collections/Users/checkRole'

export const isAdminsOrPublished: Access = ({ req: { user } }) => {
	if (checkRole(['admin'], user)) {
		return true
	}

	return {
		_status: {
			equals: 'published',
		},
	}
}
