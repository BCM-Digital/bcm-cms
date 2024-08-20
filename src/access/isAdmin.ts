import { Access, FieldAccess } from 'payload/types'
import { User } from '../payload-types'
import { checkRole } from '../collections/Users/checkRole'

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
	// Return true or false based on if the user has an admin role
	return Boolean(checkRole(['admin'], user))
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
	req: { user },
}) => {
	// Return true or false based on if the user has an admin role
	return Boolean(checkRole(['admin'], user))
}
