import { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'

type EmbeddedVideo = (options?: {
	overrides?: Record<string, unknown>
}) => Field

const embeddedVideo: EmbeddedVideo = ({ overrides = {} } = {}) => {
	const generatedEmbeddedVideo: Field = {
		name: 'embeddedVideo',
		label: 'Embedded Video',
		type: 'group',
		interfaceName: 'EmbeddedVideo',
		admin: {
			hideGutter: true,
		},
		fields: [
			{
				name: 'embed',
				type: 'checkbox',
				admin: {
					description: 'Embeds a Vimeo or YouTube iframe.',
				},
			},
			{
				name: 'poster',
				label: 'Poster Image',
				type: 'upload',
				relationTo: 'media',
				admin: {
					condition: (data, { embed }) => Boolean(embed),
					description:
						'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
				},
			},
			{
				name: 'platform',
				type: 'select',
				defaultValue: 'internal',
				options: [
					{
						label: 'YouTube',
						value: 'youtube',
					},
					{
						label: 'Vimeo',
						value: 'vimeo',
					},
					{
						label: 'Internal',
						value: 'internal',
					},
				],
				admin: {
					condition: (data, { embed }) => Boolean(embed),
				},
			},
			{
				name: 'videoURL',
				label: 'Video URL',
				type: 'text',
				required: true,
				admin: {
					condition: (data, { embed, platform }) =>
						Boolean(embed) && Boolean(platform !== 'internal'),
				},
			},
			{
				name: 'video',
				label: 'Video',
				type: 'upload',
				relationTo: 'media',
				admin: {
					condition: (data, { embed, platform }) =>
						Boolean(embed) && Boolean(platform === 'internal'),
					description:
						'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
				},
			},
		],
	}
	return deepMerge(generatedEmbeddedVideo, overrides)
}

export default embeddedVideo
