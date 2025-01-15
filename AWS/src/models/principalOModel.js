const { PrismaClient } =  require("@prisma/client");
const prisma = new PrismaClient();

const createPrincipalOfficerModel = async ({name, designation, image, biography}) => {
    const newMember = await prisma.principal.create({
        data:{
            name, designation, image, biography
        }
    });
    return newMember;
};

const fetchAllPrincipalOfficersModel = async () => {
    const members = await prisma.principal.findMany();
    return members;
};

const fetchPrincipalOfficerByIdModel = async (id) => {
    const data = await prisma.principal.findUnique({
        where: {
            id
        }
    });
    return data;
};

const updatePrincipalOfficerDataModel = async ({id, data}) => {
    const updatedData = await prisma.principal.update({
        where:{
            id
        },
        data
    });
    return updatedData;
};

const updatePrincipalOfficerImageModel = async ({id, image}) => {
    const newImage = await prisma.principal.update({
        where: { id: id },
        data: {
            image: image
        }
    });
    return newImage;
}

const deletePrincipalOfficcerModel = async (id) =>{
    const deleted = await prisma.principal.delete({
        where:{
            id
        }
    });
    return deleted;
}

module.exports = {
    createPrincipalOfficerModel,
    fetchAllPrincipalOfficersModel,
    fetchPrincipalOfficerByIdModel,
    updatePrincipalOfficerDataModel,
    updatePrincipalOfficerImageModel,
    deletePrincipalOfficcerModel
}