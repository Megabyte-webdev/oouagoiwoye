const prismaClent = require("@prisma/client");
const prisma = new prismaClent.PrismaClient();
const deleteFile = require("../helpers/fileSystem");
const departmentDB = prisma.departments;

const findAllDepartments = async (req, res, next) => {
    try {
        const data = await departmentDB.findMany();
        res.status(200).json({
            message: "Departments fetched successfully",
            data: data,
        });
    } catch (error) {
        next(error)
    }
}

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
            data:data
        })
    } catch (error) {
        next(error)
    }
}

const editDepartmentImage = async (req, res, next) => {
    const image = req.file.filename;
    const data = {};
    if(image) data.image = image;
    if (Object.keys(data).length === 0) {
        return res.status(400).json("No data to update");
    }
    try {
        const editd = await departmentDB.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:data
        })
        res.status(200).json({
            message: "Image updated successfully",
            data: editd
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    findAllDepartments,
    editDepartment,
    editDepartmentImage
}