const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const deleteFile = require("../helpers/fileSystem");

const lecturerDB = prisma.lecturers;

const fetchLecturers = async (req, res, next) => {
    try {
        const lecturers = await lecturerDB.findMany();
        res.status(200).json({
            message: "Lecturers fetched successfully",
            data: lecturers
        })
    } catch (error) {
        next(error)
    }
}
//edit lecturers data
const editLecturers = async (req, res, next) => {
    const { name, designation } = req.body;
    const data = {};

    if(name) data.name = name;
    if(designation) data.designation = designation;
    if (Object.keys(data).length === 0) {
        return res.status(400).json("No data to update");
    }
    try {
        const updatedData = await lecturerDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: data
        });
        res.status(200).json({
            message: "Lecturer updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}


//edit lecturers image
const editLecturerImage = async (req, res, next) => {
    // const image = req.file.filename;
    
    try {
        const prevData = await lecturerDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        const prevImg = prevData.image;
        const newImage = await lecturerDB.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                image: req.file.filename,
            }
        })
        deleteFile(`public/uploads/${prevImg}`);
        res.status(200).json({
            message: "Updated successfully",
            data: newImage,
        })
    } catch (error) {
        next(error)
    }
}

//delete lecturers
const deleteLecturer = async (req, res, next) => {
    try {
        const prevData = await lecturerDB.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        const prevImg = prevData.image;
        const deletedLecturers = await lecturerDB.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        deleteFile(`public/uploads/${prevImg}`);
        res.status(200).json({
            message: "Lecturer data successfully deleted",
            data: deletedLecturers
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetchLecturers,
    editLecturers,
    editLecturerImage,
    deleteLecturer
}