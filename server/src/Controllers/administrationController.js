import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const  RandomName = require("../helpers/randomNameGenerator");
const { createAdminMemberModel, fetchAllAdminMembersModel, fetchAdminMemberByIdModel } = require("../models/AdministrationModel");


const bucketName = process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccess = process.env.AWS_SECRET_ACCESS_KEY;
const bucketLocation = process.env.AWS_BUCKET_NAME;

const client = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccess
    },
    region: bucketLocation
})

export const createMember = async (req, res, next) => {
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

export const fetchAllMembers = async (req, res) => {
    const members = await fetchAllAdminMembersModel()

    for (const member of members) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: `web/administration/${member.image}`
        })

        const url = await getSignedUrl(client, command, { expiresIn: 3600

         })
        member.image = url
    }
    res.status(200).json({
        message: "Fetched all administration members",
        data: members
    })
};

export const updateAdminImage = async (req, res, next) => {
    const image =  req.file;
    const {id} = req.params;
    try {
        const generatedName = new RandomName(image);
        const imageName = generatedName.getFullFileName(); 

        const prevData = fetchAdminMemberByIdModel(parseInt(id))
    } catch (error) {
        next(error)
    }
}