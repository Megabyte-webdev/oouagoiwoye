class RandomName {
    constructor(file){
        this.file = file
    }

    generateName(){
        const part1 = require('crypto').randomBytes(16).toString('hex');
        const part2 = Date.now() + Math.round(Math.random() * 1E9);
        const randomName = part1 + part2;
        return randomName;
    }

    getFullFileName(){
        let  fileExt;
        const generatedName = this.generateName();

        if (this.file.mimetype  === 'image/png') {
            fileExt = '.' + 'png'
        } else if (this.file.mimetype === 'image/jpeg') {
            fileExt = '.' + 'jpg'
        } else if (this.file.mimetype === 'video/mp4') {
            fileExt = '.' + 'mp4'
        }
        
        return `${generatedName}${fileExt}`
    }
        
}

module.exports = RandomName;