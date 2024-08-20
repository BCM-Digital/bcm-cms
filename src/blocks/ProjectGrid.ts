import { Block } from 'payload/types'
import richText from '../fields/richText'

export const ProjectGrid: Block = {
	slug: 'project-grid',
	interfaceName: 'ProjectGrid',
	fields: [
		{
			name: 'projectGridFields',
			type: 'group',
			fields: [
				richText(),
				{
					name: 'tiles',
					label: 'Grid Tiles',
					type: 'array',
					required: true,
					minRows: 1,
					fields: [
						{
							name: 'type',
							type: 'select',
							defaultValue: 'project',
							options: [
								{
									label: 'Project',
									value: 'project',
								},
								{
									label: 'Image',
									value: 'image',
								},
								{
									label: 'Text',
									value: 'text',
								},
							],
						},
						{
							name: 'size',
							type: 'select',
							defaultValue: 'oneThird',
							options: [
								{
									value: 'oneQuarter',
									label: 'One Quarter',
								},
								{
									value: 'oneThird',
									label: 'One Third',
								},
								{
									value: 'half',
									label: 'Half',
								},
								{
									value: 'twoThirds',
									label: 'Two Thirds',
								},
								{
									value: 'threeQuarters',
									label: 'Three Quarters',
								},
								{
									value: 'full',
									label: 'Full',
								},
							],
						},
						{
							type: 'relationship',
							name: 'project',
							relationTo: 'projects',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'project',
							},
						},
						{
							name: 'image',
							type: 'upload',
							relationTo: 'media',
							required: true,
							admin: {
								condition: (_, siblingData) => siblingData.type === 'image',
							},
						},
						richText({
							name: 'tileText',
							label: 'Tile Text',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'text',
							},
						}),
						// To Do: Fix this lazy approach
						{
							name: 'invertBackground',
							type: 'checkbox',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'text',
							},
						},
					],
				},
			],
		},
	],
}
