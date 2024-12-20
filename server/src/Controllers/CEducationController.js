const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const RandomName = require("../helpers/randomNameGenerator");
const { createCEducationModel, fetchContinuingEducationsModel, updateCEducationDataModel, fetchCEByIdModel, updateCEducationImageModel, deleteCEducationModel } = require("../models/CEducationModel")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const bucketName = process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccess = process.env.AWS_SECRET_ACCESS_KEY;
const bucketLocation = process.env.AWS_BUCKET_LOCATION;

const Client = new S3Client({
    region: bucketLocation,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccess
    }
})


const createProgram = async (req, res, next) => {
    const { program, headline, overview } = req.body;
    const reqImage = req.file;

    try {
        const generatedName = new RandomName(reqImage);
        const imageName = generatedName.getFullFileName();

        const data= {};
        data.program = program;
        data.image = imageName;
        data.headline = headline;
        data.overview = overview;

        const command  = new PutObjectCommand({
            Bucket: bucketName, 
            Key: `web/continuingEducation/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        });
        await Client.send(command);

        const newProgram = await createCEducationModel(data);

        res.status(201).json({
            message: "Successfully created new Program",
            data: newProgram
        })
    } catch (error) {
        next(error);
    }
};

const fetchAllPrograms = async (req, res, next) => {
    const programs = await fetchContinuingEducationsModel();

    try {
        for (const program of programs) {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key:  `web/continuingEducation/${program.image}`
            })

            const url = await getSignedUrl(Client, command, { expiresIn: 3600 })
            program.image = url
        }
        res.status(200).json({
            message: "Successfully fetched",
            data: programs
        }) 
    } catch (error) {
        next(error)
    }
};

const updateCEdata = async (req, res, next) => {
    const { program, headline, overview, requirements, benefits } = req.body;
    const { id } = req.params;
    const data = {};
    try {

        if(program) data.program = program;
        if(headline) data.headline = headline;
        if(overview) data.overview = overview;
        if(requirements) data.requirements = requirements.split('#');
        if(benefits) data.benefits = benefits.split('#');
        if(Object.keys(data).length === 0) res.status(404).json("Enter a value to update"); 

        const updatedData = await updateCEducationDataModel({id: parseInt(id), data: data});
        res.status(200).json({
            message: "Successfully updated data",
            data: updatedData
        })
        
    } catch (error) {
        next(error);
    }
}

const updateCEImage = async (req, res, next) => {
    const reqImage = req.file;
    const { id } = req.params;
    
    try {
        const generatedName = new RandomName(reqImage);
        const imageName = generatedName.getFullFileName();

        const prevdata = await fetchCEByIdModel(parseInt(id));
        const prevImg = prevdata.image;

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/continuingEducation/${prevImg}`
        });
        await Client.send(deleteCommand);
        const addCOmmand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/continuingEducation/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        })
        await Client.send(addCOmmand);

        const newImage = await updateCEducationImageModel({id: parseInt(id), image: imageName });

        res.status(200).json({
            message: "update image successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
}

const deleteCE = async (req, res, next) => {
    const { id } = req.params;
    const { image } = await fetchCEByIdModel(parseInt(id));
    
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: `web/continuingEducation/${image}`
    })
    await Client.send(command);

    const deletedData = await deleteCEducationModel(parseInt(id));
    res.status(200).json({
        message: "Deleted Successfully",
        data: deletedData
    })

}
module.exports = {
    createProgram,
    fetchAllPrograms,
    updateCEdata,
    updateCEImage,
    deleteCE
}