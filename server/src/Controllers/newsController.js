const prismaClient = require("@prisma/client");
const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClient.PrismaClient();

const newsDB = prisma.news;

const createNews = async (req, res, next) => {
    const { headline, body, author } = req.body;
    const reqImage = req.file;

    
    try {
        const newNews = await newsDB.create({
            data:{
                headline: headline,
                image: reqImage?.filename,
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

        res.status(200).json({
            message: "successfully fetched all news",
            data: News
        })
    } catch (error) {
        res.status(400).json("internal server error")
    }
};

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
                id: req.params.id
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
        const news = await newsDB.findUnique({
            where: {
                id: req.params.id
            }
        })
        
        const prevImage = news.image;
        
        const updatedImage = await newsDB.update({
            where:{
                id: req.params.id
            },
            data:{
                image: reqImg?.filename
            }
        })
        prevImage ? deleteFile(`public/uploads/${prevImage}`) : '';
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
                id: req.params.id
            }
        })
        const prevImage = prevNews.image;
    
        const deletedNews = await newsDB.delete({
            where: {
                id: req.params.id
            }
        });
        prevImage !== null ? deleteFile(`public/uploads/${prevImage}`) : '';
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