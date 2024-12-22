const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createCEducationModel = async (data) => {
    const newdu = await prisma.continuingEducation.create({
        data
    });
    return newdu;
};

const fetchContinuingEducationsModel = async () => {
    const educations = await prisma.continuingEducation.findMany();
    return educations;
};

const fetchCEByIdModel = async (id) => {
    const data = await prisma.continuingEducation.findUnique({
        where: {
            id: id
        }
    });
    return data;
}

const updateCEducationDataModel = async ({id, data}) => {
    const newData = await prisma.continuingEducation.update({
        where: {id},
        data: data
    });
    return newData;
};

const updateCEducationImageModel = async ({id, image}) => {
    const newImage = await prisma.continuingEducation.update({
        where: {id},
        data: {
            image
        }
    });
    return newImage
};

const deleteCEducationModel = async (id) => {
    const deleted = await prisma.continuingEducation.delete({
        where: {id}
    });
    return deleted;
};

module.exports = { 
    createCEducationModel,
    fetchContinuingEducationsModel,
    fetchCEByIdModel,
    updateCEducationDataModel,
    updateCEducationImageModel,
    deleteCEducationModel
}
