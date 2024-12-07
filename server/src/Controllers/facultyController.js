const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();
const RandomName = require("../helpers/randomNameGenerator")


const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3 } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const facultyDB = prisma.faculties;

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

//fetch faculty
const fetchFaculty = async (req, res, next) => {
    try {
        const allFaculties = await facultyDB.findMany({
            include:{
                Contact: true,
                departments: true,
                facultyLecturers: true
            }
        }) 
        //faculty for loop
        for (const faculty of allFaculties){
            if(faculty.image !== null ){
                const command = new GetObjectCommand({
                    Bucket: bucketName,
                    Key: `web/faculty/${faculty.image}`
                });
                
                const imgUrl = await getSignedUrl(client, command, { expiresIn: 3600 } )
                faculty.image = imgUrl;
            }

            if(faculty.deanImage !== null){
                const deanComd = new GetObjectCommand({
                    Bucket: bucketName,
                    Key: `web/faculty/${faculty.deanImage}`
                })
                
                const deanUrl = await getSignedUrl(client, deanComd, { expiresIn: 3600 } )
                
                faculty.deanImage = deanUrl;
            }

            if (faculty.bannerImage  !== null) {
                const bannercommand = new GetObjectCommand({
                    Bucket: bucketName,
                    Key: `web/faculty/${faculty.bannerImage}`
                })
                
                const bannerUrl = await getSignedUrl(client, bannercommand, { expiresIn: 3600 } )
                
                faculty.bannerImage = bannerUrl;
            }
            
            for(const lecturer of faculty.facultyLecturers){
                if(faculty.facultyLecturers.length !== 0){
                    const lecturerComd = new GetObjectCommand({
                        Bucket: bucketName,
                        Key: `web/lecturer/${lecturer.image}`
                    })
                    
                    const lecturerUrl = await getSignedUrl(client, lecturerComd, { expiresIn: 3600 } )
                    
                    lecturer.image = lecturerUrl
                }
            }
            for(const department of faculty.departments ){
                if(faculty.departments.length !== 0){
                    const departmentComd = new GetObjectCommand({
                        Bucket: bucketName,
                        Key: `web/department/${department.image}`
                    })
                    
                    const url = await getSignedUrl(client, departmentComd, { expiresIn: 3600 } )
                    
                    department.image = url
                }
            }
        }
       
        res.status(200).json({
            message: "Faculties data fetched successfully",
            data: allFaculties
        })
    } catch (error) {
        next(error)
    }
}

//update faculty data
const updateFaculty = async (req, res, next) => {
    const { title, deanName, noOfDepartments, body } = req.body;

    const data = {};
    if(title) data.title = title;
    if(deanName) data.deanName = deanName;
    if(noOfDepartments) data.noOfDepartments = noOfDepartments;
    if(body) data.body = body
    if (Object.keys(data).length === 0) res.status(404).json("No data for update");
    try {
        const newData = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data
        });
        res.status(200).json({
            message: "Data updated successfully",
            data: newData
        });
    } catch (error) {
        next(error)
    }
} 

//update faculty image
const updateFacultyImage = async (req, res, next) => {
    const reqImg = req.file;
    try {
        const GeneratedName = new RandomName(reqImg)
        const imageName = GeneratedName.getFullFileName();

        const prevdata = await facultyDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.image;

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${previmg}`
        })
        await client.send(deleteCommand);

        const updateCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${imageName}`,
            Body: reqImg.buffer,
            ContentType: reqImg.mimetype
        })
        await client.send(updateCommand);

        const newImage = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                image: imageName
            }
        })
       
        res.status(200).json({
            message: "Image updated successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
};

//upsert banner video
const upsertBannerimage = async (req, res, next) => {
    const reqBannerImg = req.file;
    try {
        const GeneratedName = new RandomName(reqBannerImg)
        const bannerName = GeneratedName.getFullFileName();

        const prevData = await facultyDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const prevBanner = prevData.bannerImage;

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${prevBanner}`
        })
        await client.send(deleteCommand);

        const updateCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${bannerName}`,
            Body: reqBannerImg.buffer,
            ContentType: reqBannerImg.mimetype
        })
        await client.send(updateCommand);

        const newBanner = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:{
                bannerImage: bannerName
            }
        });
        res.status(200).json({
            message: "successfully updated faculty banner",
            data: newBanner
        });

    } catch (error) {
        next(error)
    }
}
//update dean image
const updateDeanImg = async (req, res, next) =>{
    
    try {
        const GeneratedName = new RandomName(req.file)
        const imageName = GeneratedName.getFullFileName();

        const prevdata = await facultyDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.deanImage;

        if(previmg != null ){
            const command = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `web/faculty/${previmg}`
            });
            await client.send(command);
        }

        const updateCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })
        await client.send(updateCommand);

        const newImage = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                deanImage: imageName
            }
        })
        
        res.status(200).json({
            message: "successfully updated dean's image",
            data: newImage
        })
    } catch (error) {
       next(error) 
    }


    
}


//updating faculty contact
const UpdateFacultyContact = async (req, res, next) => {
    const { whatsapp, facebook, youtube } = req.body;
    try {
        const data = {};
        if(whatsapp) data.whatsapp = whatsapp;
        if(facebook) data.facebook = facebook;
        if(youtube) data.youtube = youtube;
        if(Object.keys(data).length === 0) res.status(400).json("No data to update");
        const updatedData = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                Contact: {
                    update: data
                }
            },
            include:{
                Contact: true
            }
        })
        res.status(200).json({
            message: "Campus contact updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}
//creating faculty lecturers
const createFacultyLecturers = async (req, res, next) => {
    const { name, designation } = req.body;
    const imageReq = req.file;
    
    try {
        const GeneratedName = new RandomName(imageReq)
        const imageName =GeneratedName.getFullFileName();

        const data = {};
        if(name) data.name = name;
        if(designation) data.designation = designation;
        if(imageReq) data.image = imageName;
        if(Object.keys(data).length === 0) res.status(400).json("No data to update");
    
        const comand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/lecturer/${imageName}`,
            Body: imageReq.buffer,
            ContentType: imageReq.mimetype
        })
        await client.send(comand);

        const updated = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                facultyLecturers: {
                    create: data
                }
            },
            include:{
                facultyLecturers: true
            }
        })
        res.status(200).json({
            message: "Lecturer Added Successfully",
            data: updated
        })
    } catch (error) {
        next
    }
}

//Adding departments in faculty
const addDepartment = async (req, res, next) => {
    const {title, body} = req.body;

    try {
        const GeneratedName = new RandomName(req.file);
        const imageName = GeneratedName.getFullFileName();

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/department/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })
        await client.send(command);

        const newDepartment = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:{
                departments:{
                    create: {
                        title,
                        image: imageName,
                        body
                    }
                }
            },
            include: {
                departments: true
            }
        })
        res.status(200).json({
            message: "Department successfully added",
            data: newDepartment
        })
    } catch (error) {
        next(error)
    }
}

//deleting faculties
const deleteFaculties = async (req, res, next) => {
    try {
        const facultyData = await prisma.faculties.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include:{
                facultyLecturers: true,
                departments: true
            }
        });

        const facultyImg = facultyData.image;
        const facultyDeanImg = facultyData.deanImage;
        const facultyBanner = facultyData.bannerImage;

        const delCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${facultyImg}`
        })
        const delCommand2 = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${facultyDeanImg}`
        })
        const delCommand3 = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${facultyBanner}`
        })
        client.send(delCommand);
        client.send(delCommand2);
        client.send(delCommand3);

        let departmentImages = [];
        let lecturerImages = [];

        function deleteMisc(){
            if(facultyData.departments.length !== 0){
                for(const dep of facultyData.departments){
                    departmentImages = facultyData.departments.map(item => ({image: item.image}))
                }
            }
            if (facultyData.facultyLecturers.length !== 0) {
                for(const lec of facultyData.facultyLecturers){
                    lecturerImages = facultyData.facultyLecturers.map(item => ({image: item.image}))
                }
            }
            // console.log("success", departmentImages, lecturerImages);
            
            for(const data of departmentImages){
                if (data.image !== null) {
                    const delDepCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/department/${data.image}`
                    }) 
                    client.send(delDepCommand);
                    
                }
            }
            for(const data of lecturerImages){
                if (data.image !== null) {
                    const delLecCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/lecturer/${data.image}`
                    }) 
                    client.send(delLecCommand);
                    
                }
            }
        }
        deleteMisc();

        const deleteFaculty = await facultyDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });

        res.status(200).json({
            message: "deleted successfully",
            data:  deleteFaculty
        }) 
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchFaculty,
    updateFaculty,
    updateFacultyImage,
    upsertBannerimage,
    updateDeanImg,
    UpdateFacultyContact,
    createFacultyLecturers,
    addDepartment,
    deleteFaculties
}