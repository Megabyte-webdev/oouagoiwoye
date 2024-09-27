const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const deleteFile = require("../helpers/fileSystem")

const newsDB = prisma.news;


const createNews = async (req, res) => {
    const { headline, body, author } = req.body;
    const image = req.file.filename;

    try {
        const data = {headline, image, body}
        const newNews = await newsDB.create({
            data:{
                headline: headline,
                image: image,
                body: body,
                author: author
            }
        })
        res.status(201).json({
            message: "Successfully uploaded News",
            data: data
        })
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

const fetchNews = async (req, res)=>{
    try {
        const News = await newsDB.findMany();
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
    const img = req.file.filename;
    try {
        console.log(img);
        
        const news = await newsDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        
        const prevImage = news.image;
        const updatedImage = await newsDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image: img
            }
        })
        deleteFile(`public/uploads/${prevImage}`)
        res.status(200).json({
            message: "News image successfully updated",
            data: updatedImage
        })
        
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const deleteNews = async (req, res) => {
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
    })
    res.status(200).json({
        message: "successfully deleted news",
        data: deletedNews
    })
    deleteFile(`public/uploads/${prevImage}`)
}


module.exports= {
    createNews,
    fetchNews,
    updateNews,
    updateNewsImage,
    deleteNews
}