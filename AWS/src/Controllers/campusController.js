const prismaClient = require("@prisma/client");
// const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClient.PrismaClient();
const RandomName = require("../helpers/randomNameGenerator");

//S3 bucket config
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const campusDB = prisma.campus;

// env values definition
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_LOCATION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// S3 client instance and config 
const S3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region:bucketRegion
})

const createCampus = async (req, res) => {
    const { title , campusInfo, location} = req.body;

    try {

        const GeneratedName = new RandomName(req.file)
        const imageName = GeneratedName.getFullFileName()
        
        const imagedata = {
            Bucket: bucketName,
            Key: `web/campus/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }
        // console.log(imagedata.Key);
        
        const command = new PutObjectCommand(imagedata);
        await S3.send(command);
        
        const newCampus = await campusDB.create({
            data:{
                title,
                image: imageName,
                campusInfo,
                location,
            }
        });
        res.status(201).json({
            message: "Campus created successfully",
            data: newCampus
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const fetchCampus = async (req, res) => {
    try {
        const campuses = await campusDB.findMany({
            include:{
                Contact: true,
                faculties: true
            }
        });
        for(const campus of campuses){
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: `web/campus/${campus.image}`
            })
            
            const url = await getSignedUrl(S3, command, { expiresIn: 3600 })
            campus.image = url
            
            const bannerComand = new GetObjectCommand({
                Bucket: bucketName,
                Key: `web/campus/${campus.bannerVideo}`
            })
            const Burl = await getSignedUrl(S3, bannerComand, {expiresIn: 3600});
            campus.bannerVideo = Burl
        }
        for(const campus of campuses){
            if (campus.faculties.length !== 0) {
                for(const faculty of campus.faculties){
                    const command = new GetObjectCommand({
                        Bucket: bucketName,
                        Key: `web/faculty/${faculty.image}`
                    })

                    const url = await getSignedUrl(S3, command, { expiresIn: 3600 })
                    faculty.image = url

                    if (faculty.deanImage !== null) {
                        const command = new GetObjectCommand({
                            Bucket: bucketName,
                            Key: `web/faculty/${faculty.deanImage}`
                        })
                        const durl = await getSignedUrl(S3, command, { expiresIn: 3600 })
                        faculty.deanImage = durl
                    }
                }
            }
        }
        
        res.status(200).json({
            message: "Campuses fetched successfully",
            data: campuses
        })
    } catch (error) {
        res.status(400).json("Internal server error");
    }
}

//update campus image
const updateCampusImage = async (req, res, next) => {
    const reqImage = req.file;
    try {
        const GeneratedName = new RandomName(reqImage)
        const imageName = GeneratedName.getFullFileName();

        const prevdata = await campusDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.image;

        //deleting previous image
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/campus/${previmg}`,
        })
        await S3.send(deleteCommand)

        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/campus/${imageName}`,
            Body: reqImage.buffer,
            ContentType: reqImage.mimetype
        })
        await S3.send(putCommand)
        const newImage = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image: imageName
            }
        })

        res.status(200).json({
            message: "Campus image updated successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
}

//add or add campus Banner video
const upsertCampusBannerVideo = async (req, res, next) =>{
    const bannerVideo =  req.file;
    try {
        const GeneratedName = new RandomName(bannerVideo)
        const videoName = GeneratedName.getFullFileName();

        const prevdata = await campusDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        const prevVid = prevdata.bannerVideo;

        //deleting previous video
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/campus/${prevVid}`,
        })
        await S3.send(deleteCommand);

        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/campus/${videoName}`,
            Body: bannerVideo.buffer,
            ContentType: bannerVideo.mimetype
        })
        await S3.send(putCommand);

        const bannerVid = await campusDB.upsert({
            where:{
                id: parseInt(req.params.id)
            },
            update:{
                bannerVideo : videoName
            },
            create:{
                title: prevdata.title,
                location: prevdata.location,
                image: prevdata.image,
                campusInfo: prevdata.campusInfo,
                bannerVideo : videoName
            }
        });
        res.status(200).json({
            message: "Successfully updated then banner video",
            data: bannerVid
        })

    } catch (error) {
        next(error)
    }
};

//update campus data    
const updateCampusData = async (req, res, next) => {
    const { title, campusInfo, location } = req.body;
    try {
        const data = {};
        if(title) data.title = title;
        if(campusInfo) data.campusInfo = campusInfo;
        if(location) data.location = location;
        if(Object.keys(data).length === 0)(res.status(400).json("No data to update"));
        const updatedData = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data
        }) 
        res.status(200).json({
            message: "Campus data updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}

//update campus contact
const updateCampusContact = async (req, res, next) => {
    const { whatsapp, facebook, youtube } = req.body;
    try {
        const data = {};
        if(whatsapp) data.whatsapp = whatsapp;
        if(facebook) data.facebook = facebook;
        if(youtube) data.youtube = youtube;
        if(Object.keys(data).length < 1) res.status(400).json("No data to update");
        const updatedData = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data: {
                Contact:{
                    upsert:{
                        update:data,
                        create: data
                    }
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
};

//link / create faculty in campus
const createFaculty = async (req, res, next) => {
    const { title, noOfDepartments, body } = req.body;

    try {
        const GeneratedName = new RandomName(req.file)
        const imageName = GeneratedName.getFullFileName()

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `web/faculty/${imageName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        });
        await S3.send(command);
        
        const newFaculty = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                faculties:{
                    create: {
                        title,
                        image:  imageName,
                        noOfDepartments,
                        body,
                        Contact:{
                            create: {
                                whatsapp: "000",
                                facebook: "000",
                                youtube: "000"
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json({
            message: "Faculty created successfully",
            data: newFaculty
        })
    } catch (error) {
        next(error)
    }
}

//delete campus
const deleteCampus = async (req, res, next) => {
    try {
        const prevdata = await campusDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            },
            include: {
                faculties: {
                    include:{
                        departments: true,
                        facultyLecturers: true
                    }
                }

            }
        });
        const findFac = await prisma.faculties.findMany({
            where:{
                campusId: parseInt(req.params.id)
            },
            include:{
                departments: true,
                facultyLecturers: true
            }
        });
        
        const previmg = prevdata.image;
        const prevBannerVid = prevdata.bannerVideo;

        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `web/campus/${previmg}`
        });
        await S3.send(command);
        if (prevdata.bannerVideo !== null) {
            const BannerCommand = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `web/campus/${prevBannerVid}`
            });
            await S3.send(BannerCommand); 
        }
        
        function deleteMiscImg(){
            let facultyImgs = [];
            let departmentImgs = [];
            let lecturerImgs = [];

            if (prevdata.faculties.length !== 0) {
                for(const faculty of prevdata.faculties){
                    facultyImgs = prevdata.faculties.map(item =>({image: item.image, dean: item.deanImage, videos: item.bannerImage}));    
                }

                for(const fac of findFac){
                    if(fac.departments.length !== 0){
                        departmentImgs = fac.departments.map(item => ({image: item.image}))
                    }
                    if (fac.facultyLecturers.length !== 0) {
                        lecturerImgs = fac.facultyLecturers.map(item => ({image: item.image}))
                    }
                }
            }

            for(const data of facultyImgs){
                if(data.image !== null){
                    const delFacCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/faculty/${data.image}`
                    }) 
                    S3.send(delFacCommand)
                }
                if (data.dean !== null) {
                    const delFacCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/faculty/${data.dean}`
                    }) 
                    S3.send(delFacCommand)
                }
                if (data.bannerImage !== null) {
                    const delFacCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/faculty/${data.bannerImage}`
                    }) 
                    S3.send(delFacCommand)
                }

            }
            for(const data of departmentImgs){
                if (data.image !== null) {
                    const delDepCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/department/${data.image}`
                    }) 
                    S3.send(delDepCommand)
                }
            }
            for(const data of lecturerImgs){
                if (data.image !== null) {
                    const delLecCommand = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: `web/lecturer/${data.image}`
                    }) 
                    S3.send(delLecCommand)
                }
            }
        }
        deleteMiscImg();
        
        const deletedCampus= await campusDB.delete({
            where: {
                id: parseInt(req.params.id)
            } 
        });

        res.status(200).json({
            message: "Campus deleted successfully",
            data: deletedCampus
        });
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createCampus,
    fetchCampus,
    updateCampusImage,
    upsertCampusBannerVideo,
    updateCampusData,
    updateCampusContact,
    createFaculty,
    deleteCampus
}