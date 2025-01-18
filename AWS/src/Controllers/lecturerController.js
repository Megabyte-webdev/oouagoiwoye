const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const RandomName = require("../helpers/randomNameGenerator");
const { GetObjectCommand, S3Client, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const lecturerDB = prisma.lecturers;

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_LOCATION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const client =  new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }
})

const fetchLecturers = async (req, res, next) => {
    try {
        const lecturers = await lecturerDB.findMany();
        for(const lecturer of lecturers){
            const command = new GetObjectCommand ({
                Bucket: bucketName,
                Key: `web/lecturer/${lecturer.image}`
            })
            const url = await getSignedUrl (client, command, { expiresIn: 3600 })
            lecturer.image = url
        }
        res.status(200).json({
            message: "Lecturers fetched successfully",
            data: lecturers
        })
    } catch (error) {
        next(error)
    }
}

//edit lecturers data
const editLecturers = async (req, res, next) => {
    const { name, designation } = req.body;

    const data = {};
    if(name) data.name = name;
    if(designation) data.designation = designation;
    if (Object.keys(data).length === 0) {
        return res.status(400).json("No data to update");
    }
    try {
        const updatedData = await lecturerDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: data
        });
        res.status(200).json({
            message: "Lecturer updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}


//edit lecturers image
const editLecturerImage = async (req, res, next) => {
    // const image = req.file.filename;
    
    
    const GeneratedName = new RandomName(req.file)
    const imageName = GeneratedName.getFullFileName();

    try {
        const prevData = await lecturerDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        const prevImg = prevData.image;

        if (prevImg !== null) {
            const delCommand = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `web/lecturer/${prevImg}`
            })
            client.send(delCommand);
        }
        
        const putcommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/lecturer/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })
        client.send(putcommand);

        const newImage = await lecturerDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image: imageName,
            }
        });
        res.status(200).json({
            message: "Updated successfully",
            data: newImage,
        })
    } catch (error) {
        next(error)
    }
}

//delete lecturers
const deleteLecturer = async (req, res, next) => {
    try {
        const prevData = await lecturerDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        const prevImg = prevData.image;

        if (prevImg !== null) {
            const delCommand = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `web/lecturer/${prevImg}`
            })
            client.send(delCommand);
        }

        const deletedLecturers = await lecturerDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json({
            message: "Lecturer data successfully deleted",
            data: deletedLecturers
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetchLecturers,
    editLecturers,
    editLecturerImage,
    deleteLecturer
}