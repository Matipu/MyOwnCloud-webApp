import Compress from 'compress.js'

class IconCreator {

    async createIcon(file) {
        if(!file.type.startsWith('image')){
            return null;
        }
        const compress = new Compress()
        const resizedImage = await compress.compress([file], {
            size: 1, 
            quality: 1, 
            maxWidth: 200, 
            maxHeight: 200, 
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
