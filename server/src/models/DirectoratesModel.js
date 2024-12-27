const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const CreateDirectoratesModel = async ({office, headline, message, image, history}) => {
    const newData = prisma.directorates.create({
        data:{
            office,
            headline,
            message,
            image,
            history
        }
    })
    return newData;
};

const FetchDirectoratesModel = async () => {
    const data = prisma.directorates.findMany()
    return data;
};

const FetchDirectoratesByIdModel = async (id) => {
    const reqData = prisma.directorates.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return reqData;
}

const UpdateDirectorateImageModel = async ({id, image}) => {
    const newImage = prisma.directorates.update({
        where: {id},
        data: {
            image
        }
    });
    return newImage;
};

const UpdateDirctoratesDataModel = async ({id, data}) => {
    const updatedData = prisma.directorates.update({
        where: {id},
        data: data
    });
    return updatedData;
}

const deleteDirectorateDataModel = async (id) => {
    const deletedDataModel = prisma.directorates.delete({
        where: {
            id: id
        }
    });
    return deletedDataModel;
}

module.exports = {
    CreateDirectoratesModel,
    FetchDirectoratesModel,
    FetchDirectoratesByIdModel,
    UpdateDirectorateImageModel,
    UpdateDirctoratesDataModel,
    deleteDirectorateDataModel
}