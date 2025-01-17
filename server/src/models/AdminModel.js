const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createNewAdminAccountModel = async ({username, password}) => {
    const newAccount = await prisma.admin.create({
        data:{
            username, password
        }
    });
    return newAccount;
};

const fetchAllAdminsModel = async ()=> {
    const admins = await prisma.admin.findMany();
    return admins;
}

const findUniqueUsernameModel = async (username) => {
    const user = await prisma.admin.findUnique({
        where: {
            username
        }
    });
    return user;
};

const updateAdminDataModel = async ({id, data}) => {
    const updatedData = await prisma.admin.update({
        where:{
            id: id
        },
        data: data
    });
    return updatedData;
};

const deleteAdminModel = async (id) => {
    const deletedAdmin = await prisma.admin.delete({
        where: {
            id: id
        }
    });
    return deletedAdmin;
}

module.exports = {
    createNewAdminAccountModel,
    fetchAllAdminsModel,
    findUniqueUsernameModel,
    updateAdminDataModel,
    deleteAdminModel
}