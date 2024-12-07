const prismaClent = require("@prisma/client");
const prisma = new prismaClent.PrismaClient();
const RandomImageName = require("../helpers/randomNameGenerator");
const { S3Client, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const departmentDB = prisma.departments;

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

//fetching all departments
const findAllDepartments = async (req, res, next) => {
    try {
        const data = await departmentDB.findMany();

        for(const department of data){
            if (department.image !== (null || "")) {
                const command = new GetObjectCommand ({
                    Bucket: bucketName,
                    Key: `web/department/${department.image}`
                })
                const url = await getSignedUrl(client, command, { expiresIn : 3600 });
                department.image = url
            }
        }

        res.status(200).json({
            message: "Departments fetched successfully",
            data: data
        });
    } catch (error) {
        next(error)
    }
}

//updating dpartment info
const editDepartment = async (req, res, next) => {
    const {title, body} = req.body;
    const data = {};

    if(title) data.title = title;
    if(body) data.body = body;
    if (Object.keys(data).length === 0) {
        return res.status(400).json("No data to update");
    }
    try {
        const editd = await departmentDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: data
        })
        res.status(200).json({
            message: "Department data successfully updated",
            data: editd
        })
    } catch (error) {
        next(error)
    }
}

// updating department image
const editDepartmentImage = async (req, res, next) => {

    const GeneratedName = new RandomImageName(req.file);
    const imageName = GeneratedName.getFullFileName();

    const departmentInfo = await departmentDB.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

     const prevImage = departmentInfo.image;

    try {
        if(prevImage !== null || prevImage !== ""){
            const delcommand = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `web/department/${prevImage}`
            })
            client.send(delcommand);
    
            const putCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: `web/department/${imageName}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            })
            client.send(putCommand)

        }
        const editd = await departmentDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:{
                image: imageName 
            }
        })
        res.status(200).json({
            message: "Image updated successfully",
            data: editd
        })
    } catch (error) {
        next(error)
    }
}

//delete Department
const deleteDepartment = async (req, res, next)=>{
    try {
        const departmentInfo = await departmentDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
         
        const prevImage = departmentInfo.image;

        if (prevImage !== null || prevImage !== "") {
            const delCommand = new DeleteObjectCommand({
                Bucket:bucketName, 
                Key: `web/department/${prevImage}`
            });
            await client.send(delCommand)
        }
        const deletedDepartment = await departmentDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        }) 
        res.status(200).json({
            message: "Successfully deleted the department",
            data: deletedDepartment
        });
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    findAllDepartments,
    editDepartment,
    editDepartmentImage,
    deleteDepartment
}