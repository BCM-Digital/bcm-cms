import { Field } from 'payload/types'
import linkGroup from './linkGroup'

const pageHead: Field = {
	name: 'pageHead',
	label: false,
	type: 'group',
	interfaceName: 'PageHead',
	fields: [
		{
			type: 'select',
			name: 'type',
			defaultValue: 'basic',
			options: [
				{
					label: 'Basic',
					value: 'basic',
				},
				{
					label: 'Hero',
					value: 'hero',
				},
			],
		},
		{
			name: 'subhead',
			type: 'text',
			admin: {
				condition: (_, siblingData) => siblingData.type === 'basic',
			},
		},
		{
			name: 'title',
			label: 'Title',
			type: 'text',
		},
		{
			name: 'content',
			label: 'Content',
			type: 'textarea',
		},
		linkGroup({
			overrides: {
				maxRows: 2,
				admin: {
					condition: (_, siblingData) => siblingData.type === 'hero',
				},
			},
		}),
		{
			name: 'media',
			label: 'Media',
			type: 'upload',
			relationTo: 'media',
			admin: {
				condition: (_, siblingData) => siblingData.type === 'hero',
				description:
					'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
			},
		},
	],
}

export default pageHead
