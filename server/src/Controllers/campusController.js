const prismaClient = require("@prisma/client");
const { BASE_URL } = require("../helpers/utils");
const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClient.PrismaClient();
const campusDB = prisma.campus;

const createCampus = async (req, res) => {
    const { title , campusInfo, location} = req.body;
    const image = req.file;
    try {

        const newCampus = await campusDB.create({
            data:{
                title,
                image: image?.filename,
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
        const prevdata = await campusDB.findUnique({
            where:{
                id: req.params.id
            }
        })
        const previmg = prevdata.image;

        const newImage = await campusDB.update({
            where:{
                id: req.params.id
            },
            data:{
                image: reqImage?.filename
            }
        })
        deleteFile(`public/uploads/${previmg}`)
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
        const prevdata = await campusDB.findUnique({
            where:{
                id: req.params.id
            }
        })
        const prevVid = prevdata.bannerVideo;

        const bannerVid = await campusDB.upsert({
            where:{
                id: req.params.id
            },
            update:{
                bannerVideo : bannerVideo?.filename
            },
            create:{
                title: prevdata.title,
                location: prevdata.location,
                image: prevdata.image,
                campusInfo: prevdata.campusInfo,
                bannerVideo : prevVid
            }
        });

        prevVid !== null ? deleteFile(`public/uploads/${prevVid}`) : ''
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
                id: req.params.id
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
                id: req.params.id
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
    const imageName = req.file;

    try {
        const newFaculty = await campusDB.update({
            where:{
                id: req.params.id
            },
            data:{
                faculties:{
                    create: {
                        title,
                        image:  imageName?.filename,
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
            },
            include: {
                faculties: true
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
                id: req.params.id
            }
        });
        
        
        const deletedCampus= await campusDB.delete({
            where: {
                id: req.params.id
            } 
        });
        prevdata.bannerVideo !== null ? deleteFile(`public/uploads/${prevdata.bannerVideo}`) : ''
        prevdata.image !== null ? deleteFile(`public/uploads/${prevdata.image}`): ''
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