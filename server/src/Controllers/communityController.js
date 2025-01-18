const prismaClient = require("@prisma/client");
const deleteFile = require("../helpers/fileSystem");

const prisma = new prismaClient.PrismaClient();
const communityDB = prisma.communities;

const createCommunity = async (req, res) => {
    const { title, body } = req.body;  

    try {
        
        const newCommunity = await communityDB.create({
            data: {
                image: req.file?.filename,
                title: title,
                body: body
            }
        })
        res.status(200).json({
            message: "Community created successfully",
            data: newCommunity,
        })
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

const getAllCommunities = async (req, res) => {
    try {
        const Communities = await communityDB.findMany();

        res.status(200).json({
            message: "Communities fetched successfully",
            data: Communities,
        });
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

const updateCommunityData = async (req, res) => {
    const { title, body } = req.body;

    const data = {}
     if(title) data.title = title;
     if(body) data.body = body; 

    if (Object.keys(data).length === 0){
        return res.status(400).json("No data to update");
    }

    try {
        const updatedCommunity = await communityDB.update({
            where: {
                id: req.params.id,
            },
            data: data
        })
        res.status(200).json({
           messag: "Community updated successfully",
           data: updatedCommunity,
        })
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

const updateCommunityImage = async (req, res) => {
    const reqfile = req.file;

    try {
        const community = await communityDB.findUnique({
            where: {
                id: req.params.id,
            }
        })
        const prevImg = community.image;
        
        const updatedImage = await communityDB.update({
            where:{
                id: req.params.id,
            },
            data: {
                image: reqfile?.filename
            }
        })
        res.status(200).json({
            message: "Community image updated successfully",
            data: updatedImage,
        })
        
    } catch (error) {
        res.status(400).json("internal server error");
    }
}


const deleteCommunity = async (req, res, next) => {
    try {
        const prevData = await communityDB.findUnique({
            where: {
                id: req.params.id,
            }
        })
        const prevImg = prevData.image
        
        const deletedCommunity = await communityDB.delete({
            where: {
                id: req.params.id,
            }
        });
        prevImg !== null ? deleteFile(`public/uploads/${prevImg}`) : '';
        res.status(200).json({
            message: "Community deleted successfully",  
            data: deletedCommunity,
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createCommunity,
    getAllCommunities,
    updateCommunityData,
    updateCommunityImage,
    deleteCommunity
}