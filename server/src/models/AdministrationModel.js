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
    const member = await prisma.administration.findUnique({
        where: {id: id}
    })
    return member
}

const updateAdminImageModel = async ({id, image}) => {
    const updateImage = await prisma.administration.update({
        where: {
            id: id
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
    const adminData = await prisma.administration.update({
        where: {id},
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