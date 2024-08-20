import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import richText from '../fields/richText'

const Contact: GlobalConfig = {
	slug: 'contact',
	label: 'Contact',
	access: {
		read: () => true,
		readVersions: isAdmin,
		update: isAdmin,
	},
	fields: [
		{
			type: 'group',
			name: 'contactDetails',
			interfaceName: 'ContactDetails',
			fields: [
				{
					type: 'row',
					fields: [
						{
							type: 'text',
							name: 'businessName',
							label: 'Business Name',
							admin: {
								width: '50%',
							},
						},						{
							type: 'text',
							name: 'businessABN',
							label: 'Business ABN',
							admin: {
								width: '50%',
							},
						},
						{
							type: 'email',
							name: 'primaryEmail',
							label: 'Primary Email address',
							admin: {
								width: '50%',
							},
						},
						{
							type: 'text',
							name: 'contactPhone',
							label: 'Phone number',
							admin: {
								width: '50%',
							},
						},
					],
				},
				richText({
					name: 'location',
					label: 'Business location',
					admin: {
						width: '100%',
					},
				}),
				{
					type: 'row',
					fields: [
						{
							name: 'lat',
							label: 'Latitude',
							type: 'text',
							admin: {
								width: '50%',
							},
						},
						{
							name: 'lng',
							label: 'Longitude',
							type: 'text',
							admin: {
								width: '50%',
							},
						},

						]},

				{
					type: 'array',
					name: 'businessHours',
					label: 'Business hours',
					interfaceName: 'BusinessHours',
					fields: [
						{
							type: 'row',
							fields: [
								{
									type: 'text',
									name: 'dayOfWeek',
									label: 'Days of week',
									required: true,
									admin: {
										width: '50%',
									},
								},
								{
									type: 'text',
									name: 'openingHours',
									label: 'Opening hours',
									required: true,
									admin: {
										width: '50%',
									},
								},
							],
						},
					],
					admin: {
						width: '100%',
					},
				},
			],
		},
		{
			type: 'group',
			name: 'socialMedia',
			interfaceName: 'SocialMedia',
			fields: [
				{
					type: 'array',
					name: 'socialLinks',
					labels: {
						singular: 'Social media link',
						plural: 'Social media links',
					},
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: 'label',
									label: 'Label',
									type: 'text',
									required: true,
									admin: {
										width: '50%',
									},
								},
								{
									name: 'url',
									label: 'URL',
									type: 'text',
									required: true,
									admin: {
										width: '50%',
									},
								},
							],
						},
					],
				},
			],
		},
	],
}

export default Contact
