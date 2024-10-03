const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();
const deleteFile = require("../helpers/fileSystem")

const facultyDB = prisma.faculties;

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
        res.status(200).json({
            message: "Faculties fetched successfully",
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
    const image = req.file.filename;
    try {
        const prevdata = await facultyDB.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const previmg = prevdata.image;
        const newImage = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                image
            }
        })
        deleteFile(`public/uploads/${previmg}`);
        res.status(200).json({
            message: "Image updated successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
};

//update dean image
const updateDeanImg = async (req, res, next) =>{
    const deanImage = req.file.filename;
    try { 
        const prevcampus = await facultyDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        const prevImage = prevcampus.deanImage
        const newImage = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                deanImage
            }
        })
        if(prevImage !== null) deleteFile(`public/uploads/${prevImage}`);
        res.status(200).json({
            message: "Dean Image updated Successfully",
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
    const image = req.file.filename;
    const data = {};
    if(name) data.name = name;
    if(designation) data.designation = designation;
    if(image) data.image = image
    if(Object.keys(data).length === 0) res.status(400).json("No data to update");
    try {
        const updated = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                facultyLecturers: {
                    create: data
                }
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
    const image = req.file.filename

    try {
        const newDepartment = await facultyDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:{
                departments:{
                    create: {
                        title,
                        image,
                        body
                    }
                }
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
        // const departdelete = await prisma.departments.delete({
        //     where: {
        //         facultyId: parseInt(req.params.id)
        //     }
        // })
        // const lecturerdelete = await prisma.facultyLecturers.delete({
        //     where:{
        //         facultyId: parseInt(req.params.id)
        //     }
        // })
        const deleteFaculty = await facultyDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({
            message: "deleted successfully",
            data: deleteFaculty
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchFaculty,
    updateFaculty,
    updateFacultyImage,
    updateDeanImg,
    UpdateFacultyContact,
    createFacultyLecturers,
    addDepartment,
    deleteFaculties
}