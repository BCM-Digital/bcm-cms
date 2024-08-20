import populateFullTitle from '../hooks/populateFullTitle'
import { Field } from 'payload/types'

export const fullTitle: Field = {
	name: 'fullTitle',
	type: 'text',
	hooks: {
		beforeChange: [populateFullTitle],
	},
	admin: {
		components: {
			Field: () => null,
		},
	},
}
