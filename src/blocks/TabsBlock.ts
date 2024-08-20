import { Block } from 'payload/types'

import richText from '../fields/richText'

export const TabsBlock: Block = {
    slug: 'tabs-block',
    labels: {
        singular: 'Tabs block',
        plural: 'Tabs blocks',
    },
    interfaceName: 'TabsBlock',
    fields: [
        {
            name: 'tabsBlockFields',
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
                    name: 'tabs',
                    type: 'array',
                    required: true,
                    minRows: 2,
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        richText(),
                        {
                            name: 'accordions',
                            type: 'array',
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Title',
                                    type: 'text',
                                    required: true,
                                    localized: true,
                                },
                                richText(),
                            ],
                        },
                        {
                            name: 'media',
                            label: 'Media',
                            type: 'upload',
                            relationTo: 'media',
                            admin: {
                                description:
                                    'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
