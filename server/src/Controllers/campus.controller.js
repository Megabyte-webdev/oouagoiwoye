const prismaClient = require("@prisma/client");
const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClient.PrismaClient();

const campusDB = prisma.campus;


const createCampus = async (req, res) => {
    const { title , campusInfo,} = req.body;
    const image = req.file.filename;
    try {
        const newCampus = await campusDB.create({
            data:{
                image,
                title,
                campusInfo,
                Contact: {
                    create: {
                        whatsapp: "000",
                        facebook: "000",
                        youtube: "000"
                    }
                }
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
    const image = req.file.filename;
    try {
        const prevdata = await campusDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.image;
        const newImage = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image
            }
        })
        deleteFile(`public/uploads/${previmg}`);
        res.status(200).json({
            message: "Campus image updated successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
}

//update campus data    
const updateCampusData = async (req, res, next) => {
    const { title, campusInfo } = req.body;
    try {
        const data = {};
        if(title) data.title = title;
        if(campusInfo) data.campusInfo = campusInfo;
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
        if(Object.keys(data).length === 0) res.status(400).json("No data to update");
        const updatedData = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data: {
                Contact:{
                    update:{
                        data
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
}

//link / create faculty in campus
const createFaculty = async (req, res, next) => {
    const { title, noOfDepartments, body } = req.body;
    // const image = req.file.filename;
    try {
        const newFaculty = await campusDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                faculties:{
                    create: {
                        title,
                        image:  req.file.filename,
                        noOfDepartments,
                        body
                    }
                }
            },
            include:{
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
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.image;
        
        await prisma.contact.delete({
            where:{
                campusId: parseInt(req.params.id)
            }
        })
        
        const deletedCampus= await campusDB.delete({
            where: {
                id: parseInt(req.params.id)
            } 
        });
        deleteFile(`public/uploads/${previmg}`);
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
    updateCampusData,
    updateCampusContact,
    createFaculty,
    deleteCampus
}