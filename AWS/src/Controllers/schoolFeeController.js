const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { currencyFormatter } = require("../helpers/utils")

const fetchSchholFee = async (req, res, next) => {
    const fees = await prisma.faculties.findMany({
        include: {
            schoolFee: true
        }
    })
    const schoolFee = fees.map(({title, schoolFee}) => ({title, schoolFee}));

    res.status(200).json({
        message: "Successfully fetched programs school fees",
        data: schoolFee
    })
};

const editSchoolFee = async (req, res, next) => {
    const { course, acceptanceFee, admissionSchFee, returningSchFee } = req.body;
    const { id } = req.params;

    const data = {};
    try {
        if(course) data.course = course;
        if(acceptanceFee) data.acceptanceFee = currencyFormatter(acceptanceFee);
        if(admissionSchFee) data.admissionSchFee = currencyFormatter(admissionSchFee);
        if(returningSchFee) data.returningSchFee = currencyFormatter(returningSchFee);
        if(Object.keys(data).length < 1) res.status(404).json("Enter a data to update");

        const updatedSchholFee = await prisma.schoolFee.update({
            where:{
                id: parseInt(id)
            },
            data: data
        });

        res.status(200).json({
            message: "Updated Datac Successfully",
            data: updatedSchholFee
        })
    } catch (error) {
        next(error);
    }
};

const deleteSchoolFee = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedSchoolFee = await prisma.schoolFee.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({
            message: "successfully deleted school fee",
            data: deletedSchoolFee
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    fetchSchholFee,
    editSchoolFee,
    deleteSchoolFee
}