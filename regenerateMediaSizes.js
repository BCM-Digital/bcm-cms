const payload = require('payload');
const path = require('path');

require('dotenv').config();

const { PAYLOAD_SECRET, MONGODB_URI } = process.env;


const regenerateMediaSizes = async () => {

    try {

        await payload.init({
            secret: PAYLOAD_SECRET,
            mongoURL: MONGODB_URI,
            local: true,
        });

        const media = await payload.find({
            collection: 'media',
            depth: 0,
            limit: 300,
        })

        await Promise.all(media.docs.map(async (mediaDoc) => {
            try {
                const staticDir = path.resolve(__dirname, './media');

                await payload.update({
                    collection: 'media',
                    id: mediaDoc.id,
                    data: mediaDoc,
                    filePath: `${staticDir}/${mediaDoc.filename}`,
                    overwriteExistingFiles: true,
                });

                console.log(`Media ${mediaDoc.alt || mediaDoc.id} regenerated successfully`);
            } catch (err) {
                console.error(`Media ${mediaDoc.alt || mediaDoc.id} failed to regenerate`);
                console.error(err);
            }
        }));
    } catch (err) {
        console.log('Unable to find documents with payload');
        console.error(err);
        process.exit(0);
    }

    console.log('Media size regeneration completed!');
    process.exit(0);
};

regenerateMediaSizes();
