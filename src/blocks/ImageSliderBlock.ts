import embeddedVideo from '../fields/embeddedVideo'
import { Block } from 'payload/types'
import richText from "../fields/richText";
import linkGroup from "../fields/linkGroup";

export const ImageSliderBlock: Block = {
    slug: 'image-slider-block',
    labels: {
        singular: 'Image slider block',
        plural: 'Image slider blocks',
    },
    interfaceName: 'ImageSliderBlock',
    fields: [
        {
            name: 'imageSliderBlockFields',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'anchorId',
                            type: 'text',
                            admin: {
                                width: '50%',
                            },
                        },
                        {
                            name: 'breadcrumb',
                            type: 'text',
                            admin: {
                                width: '50%',
                            },
                        },
                    ],
                },
                {
                    name: 'title',
                    type: 'text',
                },
                richText(),
                linkGroup({
                    overrides: {
                        label: 'Buttons',
                        maxRows: 2,
                    },
                }),
                {
                    name: 'slides',
                    type: 'array',
                    minRows: 3,
                    required: true,
                    fields: [
                        {
                            name: 'media',
                            label: 'Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            filterOptions: {
                                mimeType: {
                                    contains: 'image',
                                },
                            },
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
