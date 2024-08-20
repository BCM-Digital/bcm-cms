import { CollectionConfig } from 'payload/types'

import linkGroup from '../fields/linkGroup'
import { isAdmin } from '../access/isAdmin'
import { isAdminsOrPublished } from '../access/isAdminsOrPublished'
import { revalidatePage } from './Pages/hooks/revalidatePage'
import { populateAuthor } from '../hooks/populateAuthor'
import richText from '../fields/richText'

const CallsToAction: CollectionConfig = {
	slug: 'ctas',
	labels: {
		singular: 'Call to action',
		plural: 'Calls to action',
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'createdAt', 'status'],
		group: 'Content',
	},
	// the access is set to allow read for anyone
	access: {
		create: isAdmin,
		read: isAdminsOrPublished,
		readVersions: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	versions: {
		drafts: true,
	},
	fields: [
		{
			type: 'select',
			name: 'type',
			defaultValue: 'basic',
			required: true,
			options: [
				{
					label: 'Basic',
					value: 'basic',
				},
				{
					label: 'Image',
					value: 'image',
				},
			],
		},
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			localized: true,
		},
		richText(),
		linkGroup({
			overrides: {
				label: 'Button',
				maxRows: 2,
			},
		}),
		{
			name: 'author',
			relationTo: 'users',
			type: 'relationship',
			hooks: {
				beforeChange: [
					// By using a hook to set the author, admins cannot change the author as is allowed in the posts
					// collections that has a defaultValue property to populates it and allow changing in the UI
					populateAuthor,
				],
			},
			admin: {
				// this is going to be filled by the hook, or will remain the same on edit
				readOnly: true,
				position: 'sidebar',
			},
		},
		{
			name: 'featureImage',
			label: 'Feature Image',
			type: 'upload',
			relationTo: 'media',
			filterOptions: {
				mimeType: {
					contains: 'image',
				},
			},
			admin: {
				position: 'sidebar',
				condition: (_, siblingData) => siblingData.type === 'image',
				description:
					'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
			},
		},
	],

	hooks: {
		afterChange: [revalidatePage],
	},
}

export default CallsToAction
