import { Block } from 'payload/types'
import richText from '../fields/richText'

export const TextBlock: Block = {
	slug: 'text-block',
	interfaceName: 'TextBlock',
	fields: [
		{
			name: 'textBlockFields',
			type: 'group',
			fields: [
				richText({
					name: 'introText',
					label: 'Text',
				}),
			]
		}
	]
}