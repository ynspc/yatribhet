const sharp = require('sharp');

class imageOptimizationService {
    constructor() {
        try {
        }catch (e) {
            console.log(e.message)
        }
    }

    async optimize(file, extension = 'webp') {
        const bufferFile = file.image.data;
        const data = await sharp(bufferFile)
            .webp()
            .toBuffer();
        const b64 = new Buffer.from(data).toString('base64');

        return `data:image/webp;base64,${b64}`;
    }
}

const imageOptimize = new imageOptimizationService();

module.exports = imageOptimize;
