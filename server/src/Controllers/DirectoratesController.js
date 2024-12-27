const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const RandomName = require("../helpers/randomNameGenerator");
const utils = require("../helpers/utils");
const { CreateDirectoratesModel, FetchDirectoratesModel, FetchDirectoratesByIdModel, UpdateDirectorateImageModel, UpdateDirctoratesDataModel, deleteDirectorateDataModel } = require("../models/DirectoratesModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
    credentials: {
        accessKeyId: utils.accessKey,
        secretAccessKey: utils.secretAccessKey
    },
    region: utils.bucketLocation
})

const createDirectorateMember = async (req, res, next) => {
    const { office, headline, message, history } = req.body;
    const reqImage = req.file;

    try {
        const generatedName = new RandomName(reqImage);
        const imageName = generatedName.getFullFileName();

        const comand = new PutObjectCommand({
            Bucket: utils.bucketName,
            Key: `web/directorates/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        });
        await client.send(comand);

        const newMember = await CreateDirectoratesModel({office, headline, message, image: imageName, history});
        
        res.status(201).json({
            message: "Successfully created directorates member",
            data: newMember
        })
        
    } catch (error) {
        next(error);
    }
};
const FetchDirectorates = async (req, res, next) => {
    try {
        const directorates = await FetchDirectoratesModel();
        
        for(const directorate of directorates) {
            const command = new GetObjectCommand({
                Bucket: utils.bucketName,
                Key: `web/directorates/${directorate.image}`
            });
            const url = await getSignedUrl(client, command, { expiresIn: 3600 });
            directorate.image = url;
        }
        res.status(200).json({
            message: "Successfully fetched",
            data: directorates
        });
         
    } catch (error) {
        next(error);
    }
};

const updateDirectoratesImage = async (req, res, next) => {
    const reqImage = req.file;
    const { id } = req.params;

    try {
        const generatedName = new RandomName(reqImage);
        const imageName = generatedName.getFullFileName();

        const {image} = await FetchDirectoratesByIdModel(parseInt(id));

        const delCommand = new DeleteObjectCommand({
            Bucket: utils.bucketName,
            Key: `web/directorates/${image}`
        });
        await client.send(delCommand);

        const putCom = new PutObjectCommand({
            Bucket: utils.bucketName,
            Key: `web/directorates/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        });
        await client.send(putCom);

        const newImage = await UpdateDirectorateImageModel({id: parseInt(id), image: imageName});

        res.status(200).json({
            message: "Succesfully updated image",
            data: newImage
        })
    } catch (error) {
        next(error);
    }
};

const updateDirectoratesData = async (req, res, next) => {
    const { office, headline, message, history, vission, mission, responsibilities } = req.body;
    const {id} = req.params;

    const data = {};
    try {
        if(office) data.office = office;
        if(headline) data.headline = headline;
        if(message) data.message = message;
        if(history) data.history = history;
        if(vission) data.vission = vission;
        if(mission) data.mission = mission;
        if(responsibilities) data.responsibilities = responsibilities.split('#');
        if(Object.keys(data).length < 1) res.status(404).json("No data to update");

        const newData = await UpdateDirctoratesDataModel({id: parseInt(id), data: data});
        res.status(200).json({
            message: "Successfully changed data",
            data: newData
        })
    } catch (error) {
        next(error);
    }
}

const deleteDirectoratesData = async (req, res, next) => {
    const { id } = req.params;
    
    const {image} = await FetchDirectoratesByIdModel(parseInt(id));

    const command = new DeleteObjectCommand({
        Bucket: utils.bucketName,
        Key: `web/directorates/${image}`
    });
    await client.send(command);

    const deletedData = await deleteDirectorateDataModel(parseInt(id));

    res.status(200).json({
        message: "Successfully deleted",
        data: deletedData
    })
}

module.exports = {
    createDirectorateMember,
    FetchDirectorates,
    updateDirectoratesImage,
    updateDirectoratesData,
    deleteDirectoratesData
}