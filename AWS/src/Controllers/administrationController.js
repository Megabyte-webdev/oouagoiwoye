const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const  RandomName = require("../helpers/randomNameGenerator");
const { createAdminMemberModel, fetchAllAdminMembersModel, fetchAdminMemberByIdModel, updateAdministrationDataModel, updateAdminContactModel, deleteAdministrationModel, updateAdminImageModel, updateResponsibilitiesModel } = require("../models/AdministrationModel");


// env values definition
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketLocation = process.env.AWS_BUCKET_LOCATION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccess = process.env.AWS_SECRET_ACCESS_KEY;

const client = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccess
    },
    region: bucketLocation
})

const createMember = async (req, res, next) => {
    const { name, designation, biography } = req.body;
    const image = req.file;
    try {
        const generatedName = new RandomName(image)
        const imageName = generatedName.getFullFileName();

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/administration/${imageName}`,
            Body: image.buffer,
            ContentType: image.mimetype
        })
        await client.send(command);

        const member = await createAdminMemberModel({name, designation, image: imageName, biography})

        res.status(201).json({
            message: "Successfully created Administration data",
            data: member
        })

    } catch (error) {
        next(error);
    }
};

 const fetchAllMembers = async (req, res) => {
    const members = await fetchAllAdminMembersModel()

    for (const member of members) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: `web/administration/${member.image}`
        })

        const url = await getSignedUrl(client, command, { expiresIn: 3600 })
        member.image = url
    }
    res.status(200).json({
        message: "Fetched all administration members",
        data: members
    })
};

 const updateAdminImage = async (req, res, next) => {
    const reqImage =  req.file;
    const {id} = req.params;
    const parsedInt = parseInt(id)
    try {
        const GeneratedName = new RandomName(reqImage);
        const imageName = GeneratedName.getFullFileName(); 

        const prevData = await fetchAdminMemberByIdModel(parsedInt);

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/administration/${prevData.image}`
        })
        await client.send(deleteCommand);

        const addCommand = new PutObjectCommand({
            Bucket:bucketName,
            Key: `web/administration/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        })
        await client.send(addCommand);

        const updatedImage = await updateAdminImageModel({id, image: imageName});

        res.status(200).json({
            message: "Updated image successfully",
            data: updatedImage
        })
    } catch (error) {
        next(error)
    }
}

 const updateAdminData = async (req, res, next) => {
    const { name, designation, biography, resposibilities } = req.body;
    const { id } = req.params;
    const parsedId = parseInt(id);
    try {
        let responsibilitiesData;
        resposibilities ? responsibilitiesData = resposibilities.split('#') : responsibilitiesData = null

        const data = {};
        if (name) data.name = name;
        if (designation) data.designation = designation;
        if (biography) data.biography = biography;
        if (resposibilities) data.resposibilities = responsibilitiesData;
        if (Object.keys(data).length === 0) res.status(400).json("No data to update")

        const updatedData = await updateAdministrationDataModel({ id: parsedId, data });
        res.status(200).json({
            message: "Successfully updated data",
            data: updatedData
        })
    } catch (error) {
        next(error);
    }
};

 const updateAdminContact = async (req, res, next) => {
    const { whatsapp, facebook, youtube } = req.body;
    const { id } = req.params;

    let data = {};
    if(whatsapp) data.whatsapp =  whatsapp;
    if(facebook) data.facebook =  facebook;
    if(youtube) data.youtube =  youtube;
    if(Object.keys(data).length === 0) res.status(200).json("No data to send")
    try {
        const parsedId = parseInt(id);
        const updatedData = await updateAdminContactModel({ id: parsedId, whatsapp: data.whatsapp, facebook: data.facebook , youtube: data.youtube});
        res.status(200).json({
            message: "Successfully updated contact",
            data: updatedData
        });
    } catch (error) {
        next(error);
    }
};

const updateAdminResponsibilities = async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    const { responsibilities } = req.body;
    const responsibilityArray = responsibilities.split("#");

    try {
        const updatedData = await updateResponsibilitiesModel({id: parsedId, data: responsibilityArray});

        res.status(200).json({
            message: "Successfully update data",
            data: updatedData
        })
    } catch (error) {
        next
    }
}

 const deleteAdminMember = async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    
    try {
        const prevData = await fetchAdminMemberByIdModel(parsedId);
        const prevImg = prevData.image;
        
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/administration/${prevImg}`
        })
        await client.send(command);
        
        const deletedData = await deleteAdministrationModel(parsedId);
        res.status(200).json({
            message: "Successfully deleted",
            data: deletedData
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMember,
    fetchAllMembers,
    updateAdminImage,
    updateAdminData,
    updateAdminResponsibilities,
    updateAdminContact,
    deleteAdminMember

}