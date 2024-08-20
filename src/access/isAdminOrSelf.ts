import { FieldAccess } from 'payload/types'
import { User } from '../payload-types'
import { Access } from 'payload/config'
import { checkRole } from '../collections/Users/checkRole'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
	// Need to be logged in
	if (user) {
		// If user has role of 'admin'
		if (checkRole(['admin'], user)) {
			return true
		}

		// If any other type of user, only provide access to themselves
		return {
			id: {
				equals: user.id,
			},
		}
	}

	// Reject everyone else
	return false
}

export const isAdminOrSelfFieldLevel: FieldAccess<
	{ id: string },
	unknown,
	User
> = ({ req: { user }, id }) => {
	// Return true or false based on if the user has an admin role
	if (checkRole(['admin'], user)) return true
	if (user?.id === id) return true
	return false
}
