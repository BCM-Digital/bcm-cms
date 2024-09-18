import { Block } from 'payload/types'
import richText from '../fields/richText'
import link from '../fields/link'

export const ProjectGrid: Block = {
	slug: 'project-grid',
	interfaceName: 'ProjectGrid',
	fields: [
		{
			name: 'projectGridFields',
			type: 'group',
			fields: [
				richText({
					name: 'introText',
					label: 'Intro Text',
				}),
				{
					name: 'tiles',
					label: 'Grid Tiles',
					type: 'array',
					required: true,
					minRows: 1,
					maxRows: 18,
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
									label: 'News Article',
									value: 'newsArticle',
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
							name: 'width',
							type: 'select',
							defaultValue: 'oneThird',
							options: [
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
									value: 'full',
									label: 'Full',
								},
							],
						},
						{
							name: 'height',
							label: 'Toggle Double Height',
							type: 'checkbox',
						},
						{
							name: 'project',
							type: 'relationship',
							relationTo: 'projects',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'project',
							},
						},
						{
							name: 'post',
							label: 'News Article',
							type: 'relationship',
							relationTo: 'posts',
							admin: {
								condition: (_, siblingData) =>
									siblingData.type === 'newsArticle',
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
						{
							name: 'addLink',
							label: 'Add Tile Link',
							type: 'checkbox',
							admin: {
								condition: (_, siblingData) =>
									siblingData.type === 'text' || siblingData.type === 'image',
							},
						},
						link({
							appearances: false,
							overrides: {
								label: false,
								admin: {
									condition: (_, siblingData) => siblingData.addLink,
								},
							},
						}),
						{
							name: 'invertBackground',
							type: 'checkbox',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'text',
							},
						},
					],
					admin: {
						components: {
							RowLabel: ({ data }) => {
								const typeOptions = {
									project: 'Project',
									newsArticle: 'News Article',
									image: 'Image',
									text: 'Text'
								};
								let label = typeOptions[data.type] || data.type;
								
								if (data.type === 'project' && data.project?.title) {
									label = `Project: ${data.project.title}`;
								} else if (data.type === 'newsArticle' && data.post?.title) {
									label = `News Article: ${data.post.title}`;
								}
								
								return `Tile: ${label}`;
							}
						}
					}
				},
			],
		},
	],
}
