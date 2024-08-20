import type { FeatureProvider } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload/types'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import deepMerge from '../../utilities/deepMerge'
import { defaultFeatures } from './defaultFeatures'

type RichText = (
	overrides?: Partial<RichTextField>,
	additions?: {
		features?: FeatureProvider[]
	}
) => RichTextField

const richText: RichText = (
	overrides,
	additions = {
		features: [],
	}
) =>
	deepMerge<RichTextField, Partial<RichTextField>>(
		{
			name: 'richText',
			editor: lexicalEditor({
				features: () => [
					...[...defaultFeatures, ...(additions.features || [])],
				],
			}),
			type: 'richText',
		},
		overrides || {}
	)

export default richText
