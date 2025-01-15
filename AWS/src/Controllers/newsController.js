const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const RandomName =  require("../helpers/randomNameGenerator");

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const newsDB = prisma.news;

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_LOCATION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }
})

const createNews = async (req, res, next) => {
    const { headline, body, author } = req.body;
    const reqImage = req.file;

    
    try {
        const randomImageName = new RandomName(reqImage)
        const imageName = randomImageName.getFullFileName()

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/news/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        })
        await Client.send(command);

        const newNews = await newsDB.create({
            data:{
                headline: headline,
                image: imageName,
                body: body,
                author: author
            }
        })
        res.status(201).json({
            message: "Successfully uploaded News",
            data: newNews
        })
    } catch (error) {
        next(error);
    }
}

const fetchNews = async (req, res)=>{
    try {
        const News = await newsDB.findMany();

        for(const news of News){
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: `web/news/${news.image}`
            });
            const url = await getSignedUrl(Client, command, { expiresIn: 3600 });
            news.image = url
        }

        res.status(200).json({
            message: "successfully fetched all news",
            data: News
        })
    } catch (error) {
        res.status(400).json("internal server error")
    }
}

const updateNews = async (req, res)=>{
    const {headline, body, author} = req.body;
    try {

        let data = {}

        if(headline) data.headline = headline;
        if(body) data.body = body; 
        if(author) data.author = author; 

        if (Object.keys(data).length === 0) {
            return res.status(204).json("No data was found for update")
        }

        const updatedData = await newsDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: data
        })
        res.status(200).json({
            message: "Data updated successfully",
            data: updatedData
        });
        
    } catch (error) {
        res.status(400).json("internal server error")
    }
}

const updateNewsImage = async (req, res)=>{
    const reqImg = req.file
    try {
        const randomImageName = new RandomName(reqImg)
        const imageName = randomImageName.getFullFileName();
        
        const news = await newsDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        
        const prevImage = news.image;
        
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/news/${prevImage}`
        });
        await Client.send(deleteCommand);

        const updateCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/news/${imageName}`,
            Body: reqImg.buffer,
            ContentType: reqImg.mimetype
        });
        await Client.send(updateCommand);

        const updatedImage = await newsDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image: imageName
            }
        })

        res.status(200).json({
            message: "News image successfully updated",
            data: updatedImage
        })
        
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const deleteNews = async (req, res, next) => {
    try {
        const prevNews = await newsDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const prevImage = prevNews.image;
    
        const deletedNews = await newsDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
    
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/news/${prevImage}`
        })
        await Client.send(deleteCommand);
    
        res.status(200).json({
            message: "successfully deleted news",
            data: deletedNews
        });
    } catch (error) {
        next(error)
    }
}


module.exports= {
    createNews,
    fetchNews,
    updateNews,
    updateNewsImage,
    deleteNews
}