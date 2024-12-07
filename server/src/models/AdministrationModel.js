const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

export const createAdminMemberModel = async ({name, designation, image, biography}) => {
    const adminMember = await prisma.administration.create({
        data: {
            name, designation, image, biography
        }
    });
    return adminMember
};

export const fetchAllAdminMembersModel = async () => {
    const adminMembers = await prisma.administration.findMany({
        include: {
            contact: true
        }
    });
    return adminMembers
}

export const fetchAdminMemberByIdModel = async (id) => {
    const member = await prisma.administration.findUnique({
        where: {id}
    })
    return member
}

export const updateAdministrationDataModel = async ({id, data}) => {
    const adminData = await prisma.administration.update({
        where: {
            id
        },
        data: data
    })
    return adminData;
};

export const updateResponsibilitiesModel = async ({id, data}) => {
    const responsibilities = await prisma.administration.update({
        where: {id},
        data:{
            responsibilities: data
        }
    })
    return responsibilities;
};

export const deleteAdministrationModel = async (id) => {
    const deletedData = await prisma.administration.delete({
        where: {
            id
        }
    })
    return deletedData;
};