const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const fetchAllRequirement = async (req, res, next) => {
    try {
        const responses = await prisma.faculties.findMany({
            include: {
                admissionReq: true
            }
        });

        const admissionRequirements = responses.map(({title, admissionReq}) => ({title, admissionReq}))
        res.status(200).json({
            message: "Successfully Fetched Admission requirements",
            data: admissionRequirements
        })
    } catch (error) {
        next(error);
    }
}

const updateRequirements = async (req, res, next) => {
    const { course, utmeReq, olevelReq, DEReq } = req.body;
    const { id } = req.params;

    const data= {};
    try {
        if(course)data.course = course;
        if(utmeReq)data.utmeReq = utmeReq.split('#');
        if(olevelReq)data.olevelReq = olevelReq.split('#');
        if(DEReq)data.DEReq = DEReq.split('#');
        if(Object.keys(data).length < 1) res.status(404).json('No data to update');

        const updatedData = await prisma.admissionReq.update({
            where: {
                id: id
            },
            data: data
        });
        res.status(200).json({
            message: "Updated Data successfully",
            data: updatedData
        })
    } catch (error) {
        next(error);
    }
}

const deleteRequirement = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deletedData = await prisma.admissionReq.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Deleted Successfully",
            data: deletedData
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetchAllRequirement,
    updateRequirements,
    deleteRequirement
}