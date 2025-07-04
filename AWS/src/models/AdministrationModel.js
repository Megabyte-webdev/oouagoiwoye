const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const createAdminMemberModel = async ({name, designation, image, biography}) => {
    const adminMember = await prisma.administration.create({
        data: {
            name, designation, image, biography
        }
    });
    return adminMember
};

const fetchAllAdminMembersModel = async () => {
    const adminMembers = await prisma.administration.findMany({
        include: {
            contact: true
        }
    });
    return adminMembers
}

const fetchAdminMemberByIdModel = async (id) => {
    const newId = parseInt(id)
    const member = await prisma.administration.findUnique({
        where: {id: newId}
    })
    return member
}

const updateAdminImageModel = async ({id, image}) => {
    const parsedId = parseInt(id);
    const updateImage = await prisma.administration.update({
        where: {
            id: parsedId
        },
        data: {
            image: image
        },
        include:{
            contact: true
        }
    })
    return updateImage;
}

const updateAdministrationDataModel = async ({id, data}) => {
    const newId = parseInt(id)
    const adminData = await prisma.administration.update({
        where: {
            id: newId
        },
        data: data
    })
    return adminData;
};

const updateResponsibilitiesModel = async ({id, data}) => {
    const responsibilities = await prisma.administration.update({
        where: {id},
        data:{
            responsibilities: data
        }
    })
    return responsibilities;
};

const updateAdminContactModel = async ({ id, whatsapp, facebook, youtube}) => {
    const contact = await prisma.administration.update({
        where: {id},
        data: {
            contact: {
                upsert:{
                    update:{ whatsapp, facebook, youtube },
                    create: { whatsapp, facebook, youtube  }
                }
            }
        },
        include: {
            contact: true
        }
    })
}

const deleteAdministrationModel = async (id) => {
    const deletedData = await prisma.administration.delete({
        where: {
            id
        }
    })
    return deletedData;
};

module.exports = {
    createAdminMemberModel,
    fetchAllAdminMembersModel,
    fetchAdminMemberByIdModel,
    updateAdminImageModel,
    updateAdministrationDataModel,
    updateResponsibilitiesModel,
    updateAdminContactModel,
    deleteAdministrationModel
}