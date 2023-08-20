import Compress from 'compress.js'

class IconCreator {

    async createIcon(file) {
        const compress = new Compress()
        const resizedImage = await compress.compress([file], {
            size: 2, 
            quality: 1, 
            maxWidth: 300, 
            maxHeight: 300, 
            resize: true 
        })
        const img = resizedImage[0];

        const base64str = img.data
        const imgExt = img.ext
        const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
        return resizedFiile;
    }
}

export default IconCreator;
