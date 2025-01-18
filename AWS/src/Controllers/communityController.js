const prismaClient = require("@prisma/client");
const RandomName = require("../helpers/randomNameGenerator");

//S3 bucket config
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const prisma = new prismaClient.PrismaClient();
const communityDB = prisma.communities;

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

const createCommunity = async (req, res) => {
    const { title, body } = req.body;  

    try {
        const GeneratedName = new RandomName(req.file)
        const imageName = GeneratedName.getFullFileName()

        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/community/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })
        await Client.send(putCommand);
        const newCommunity = await communityDB.create({
            data: {
                image: imageName,
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

        for(const community of Communities){
            const fetchCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: `web/community/${community.image}`
            })
            const url = await getSignedUrl(Client, fetchCommand, { expiresIn: 3600 })
            community.image = url
        };
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
                id: parseInt(req.params.id),
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
        const GeneratedName = new RandomName(reqfile);
        const imageName = GeneratedName.getFullFileName()
        
        const community = await communityDB.findUnique({
            where: {
                id: parseInt(req.params.id),
            }
        })
        const prevImg = community.image;
        
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/community/${prevImg}`
        })
        await Client.send(deleteCommand);

        const updateCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/community/${imageName}`,
            Body: reqfile.buffer,
            ContentType: reqfile.mimetype
        })
        await Client.send(updateCommand);
        
        const updatedImage = await communityDB.update({
            where:{
                id: parseInt(req.params.id),
            },
            data: {
                image: imageName
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
                id: parseInt(req.params.id),
            }
        })
        const prevImg = prevData.image
        
        const deletedCommunity = await communityDB.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })
        const Command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/community/${prevImg}`
        })
        await Client.send(Command);

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