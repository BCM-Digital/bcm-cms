import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'

export const appearanceOptions = {
	primary: {
		label: 'Primary Button',
		value: 'primary',
	},
	primaryOutline: {
		label: 'Primary outline Button',
		value: 'primary-outline',
	},
	secondary: {
		label: 'Secondary Button',
		value: 'secondary',
	},
	secondaryOutline: {
		label: 'Secondary outline Button',
		value: 'secondary-outline',
	},
	white: {
		label: 'White Button',
		value: 'white',
	},
	whiteOutline: {
		label: 'White outline Button',
		value: 'white-outline',
	},
	text: {
		label: 'Text',
		value: 'text',
	},
}

export type LinkAppearances =
	| 'primary'
	| 'primary-outline'
	| 'secondary'
	| 'secondary-outline'
	| 'white'
	| 'white-outline'
	| 'text'

type LinkType = (options?: {
	appearances?: LinkAppearances[] | false
	disableLabel?: boolean
	overrides?: Record<string, unknown>
}) => Field

const link: LinkType = ({
	appearances,
	disableLabel = false,
	overrides = {},
} = {}) => {
	const linkResult: Field = {
		name: 'link',
		interfaceName: 'Link',
		admin: {
			hideGutter: true,
		},
		fields: [
			{
				fields: [
					{
						name: 'type',
						required: true,
						admin: {
							layout: 'horizontal',
							width: '50%',
						},
						defaultValue: 'reference',
						options: [
							{
								label: 'Internal link',
								value: 'reference',
							},
							{
								label: 'Custom URL',
								value: 'custom',
							},
						],
						type: 'radio',
					},
					{
						name: 'newTab',
						admin: {
							style: {
								alignSelf: 'flex-end',
							},
							width: '50%',
						},
						label: 'Open in new tab',
						type: 'checkbox',
					},
				],
				type: 'row',
			},
		],
		type: 'group',
	}

	const linkTypes: Field[] = [
		{
			name: 'reference',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'reference',
				width: '50%',
			},
			label: 'Document to link to',
			maxDepth: 1,
			relationTo: ['pages', 'projects', 'posts'], // You need to add any collection here you wish to link too
			// required: true,
			type: 'relationship',
		},
		{
			name: 'url',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'custom',
				width: '50%',
			},
			label: 'Custom URL',
			// required: true,
			type: 'text',
		},
	]

	if (!disableLabel) {
		linkTypes.map((linkType) => ({
			...linkType,
			admin: {
				...linkType.admin,
				width: '50%',
			},
		}))

		linkResult.fields.push({
			fields: [
				...linkTypes,
				{
					name: 'label',
					admin: {
						width: '50%',
					},
					label: 'Label',
					required: true,
					type: 'text',
				},
			],
			type: 'row',
		})
	} else {
		linkResult.fields = [...linkResult.fields, ...linkTypes]
	}

	if (appearances !== false) {
		let appearanceOptionsToUse = [
			appearanceOptions.primary,
			appearanceOptions.primaryOutline,
			appearanceOptions.secondary,
			appearanceOptions.secondaryOutline,
			appearanceOptions.white,
			appearanceOptions.whiteOutline,
			appearanceOptions.text,
		]

		if (appearances) {
			appearanceOptionsToUse = appearances.map(
				(appearance) => appearanceOptions[appearance]
			)
		}

		linkResult.fields.push({
			name: 'appearance',
			admin: {
				description: 'Choose how the link should be rendered.',
			},
			defaultValue: 'primary',
			options: appearanceOptionsToUse,
			type: 'select',
		})
	}

	return deepMerge(linkResult, overrides)
}

export default link
