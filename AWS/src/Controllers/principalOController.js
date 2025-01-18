const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const RandomName = require("../helpers/randomNameGenerator");
const { createPrincipalOfficerModel, fetchAllPrincipalOfficersModel, fetchPrincipalOfficerByIdModel, updatePrincipalOfficerDataModel, deletePrincipalOfficcerModel, updatePrincipalOfficerImageModel } = require("../models/principalOModel");
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


//create principal officers
const createAPrincipalOfficer = async (req, res, next) => {
    const { name, designation, biography } = req.body;
    const image = req.file;
    try {
        const generatedName = new RandomName(image);
        const imageName = generatedName.getFullFileName(); 

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/principal/${imageName}`,
            Body: image.buffer,
            ContentType: image.mimetype
        })
        await Client.send(command);

        const newMmber = await createPrincipalOfficerModel({name, designation, image: imageName, biography});

        res.status(201).json({
            message: "Successfully created Principal Officer",
            data: newMmber
        });
    } catch (error) {
        next(error);
    }
};

//fetch principalOfficers
const getPrincipalOfficers = async (req, res) => {
    const officers = await fetchAllPrincipalOfficersModel();

    for(const officer of officers) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: `web/principal/${officer.image}`
        })

        const imageUrl = await getSignedUrl(Client, command, { expiresIn: 3600 })
        officer.image = imageUrl
    }
    res.status(200).json({
        message: "Succssfully fetched data",
        data: officers
    })
}
// update principal officer data
const updatePrincipalOData = async (req, res, next) => {
    const { name, designation,biography, responsibilities } = req.body;
    const { id } = req.params;

    

    const data = {};
    if(name) data.name = name;
    if(designation) data.designation = designation;
    if(biography) data.biography = biography;
    if(responsibilities) {
        const responsibilityData = responsibilities.split("#")
        data.responsibilities = responsibilityData
    };

    try {
        const updatdData = await updatePrincipalOfficerDataModel({id: parseInt(id), data: data});
        res.status(202).json({
            message: "Updated Succssfully",
            data: updatdData
        })
        
    } catch (error) {
        next(error)
    }
} 

//update principal officer image
const updatePrincipalOfficerImage = async (req, res, next) => {
    const image = req.file;
    const { id } = req.params;

    const prevData = await fetchPrincipalOfficerByIdModel(parseInt(id));
    const prevImg = prevData.image;
    try{
        const generatedName = new RandomName(image);
        const imageName = generatedName.getFullFileName();

        const deleteComand  = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/principal/${prevImg}`
        });
        await Client.send(deleteComand);
        const addCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/principal/${imageName}`,
            Body: image.buffer,
            ContentType: image.mimetype
        });
        await Client.send(addCommand);

        const newImage = await updatePrincipalOfficerImageModel({id: parseInt(id), image: imageName})

        res.status(200).json({
            message: "Successfully updated image",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
};

// delete principal officers
const deletePrincipal = async (req, res, next) => {
    const { id } = req.params;
     try {
        const prevData = await fetchPrincipalOfficerByIdModel(parseInt(id));
        const prevImage = prevData.image;

        const command  = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/principal/${prevImage}`
        });
        await Client.send(command);

        const deletedData = await deletePrincipalOfficcerModel(parseInt(id));
        res.status(200).json({
            message: "Successfully deleted data",
            data: deletedData
        })
     } catch (error) {
        next(error);
     }
}

module.exports = {
    createAPrincipalOfficer,
    getPrincipalOfficers,
    updatePrincipalOData,
    updatePrincipalOfficerImage,
    deletePrincipal
}