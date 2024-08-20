import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import path from 'path'

export const sharpFormatOptions = {
	defaultJPG: {
		formatOptions: {
			format: 'jpeg',
			options: {
				quality: 90,
			},
		},
	},
	defaultPNG: {
		formatOptions: {
			format: 'png',
			options: {
				quality: 90,
			},
		},
	},
	WEBP: {
		formatOptions: {
			format: 'webp',
		},
		options: {
			quality: 100,
			lossless: true,
		},
	},
} as const

const Media: CollectionConfig = {
	slug: 'media',
	admin: {
		useAsTitle: 'filename',
		group: 'Uploads',
	},
	access: {
		create: isAdmin,
		read: () => true,
		update: isAdmin,
		delete: isAdmin,
	},
	upload: {
		adminThumbnail: 'card',
		staticURL: '/media',
		staticDir: path.resolve(__dirname, '../../media'),
		mimeTypes: [
			'image/jpeg',
			'audio/*',
			'video/*',
			'image/png',
			'application/pdf',
			'application/msword',
			'image/webp',
			'image/svg+xml',
		],
		imageSizes: [
			{
				name: 'card',
				width: 768,
				height: 512,
				...sharpFormatOptions.WEBP,
			},
			{
				name: 'video',
				width: 1380,
				height: 778,
				...sharpFormatOptions.WEBP,
			},
			{
				name: 'fullscreen',
				width: 1920,
				height: 1080,
				...sharpFormatOptions.WEBP,
			},
		],
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'text',
			required: true,
		},
	],
}

export default Media
