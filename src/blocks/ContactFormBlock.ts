import { Block } from 'payload/types'

import richText from '../fields/richText'

export const ContactFormBlock: Block = {
	slug: 'contact-form-block',
	labels: {
		singular: 'Contact form block',
		plural: 'Contact form blocks',
	},
	interfaceName: 'ContactFormBlock',
	fields: [
		{
			name: 'contactFormBlockFields',
			type: 'group',
			fields: [
				{
					name: 'anchorId',
					type: 'text',
					admin: {
						width: '50%',
					},
				},
				{
					type: 'row',
					fields: [

						{
							name: 'showContactInfo',
							label: 'Show contact information',
							type: 'radio',
							options: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							defaultValue: 'yes',
						},
						{
							name: 'showGoogleMap',
							label: 'Show Google map',
							type: 'radio',
							options: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							defaultValue: 'yes',
						},
						{
							name: 'showOpeningHours',
							label: 'Show opening hours',
							type: 'radio',
							options: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							defaultValue: 'yes',
						},

					],
				},
				richText(),
				{
					name: 'payloadForm',
					label: 'Form',
					type: 'relationship',
					relationTo: 'forms',
				},
			],
		},
	],
}
