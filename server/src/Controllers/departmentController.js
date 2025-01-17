const prismaClent = require("@prisma/client");
const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClent.PrismaClient();

const departmentDB = prisma.departments;

//fetching all departments
const findAllDepartments = async (req, res, next) => {
    try {
        const data = await departmentDB.findMany();

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
                id: req.params.id
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

    const departmentInfo = await departmentDB.findUnique({
        where: {
            id: req.params.id
        }
    })

     const prevImage = departmentInfo.image;

    try {
        const editd = await departmentDB.update({
            where: {
                id: req.params.id
            },
            data:{
                image: req.file.filename 
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
                id: req.params.id
            }
        });
         
        const prevImage = departmentInfo.image;
        const deletedDepartment = await departmentDB.delete({
            where: {
                id: req.params.id
            }
        });
        prevImage !== null ? deleteFile(`public/uploads/${prevImage}`) : '';
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