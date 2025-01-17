const deleteFile = require("../helpers/fileSystem");
const { createAdminMemberModel, fetchAllAdminMembersModel, fetchAdminMemberByIdModel, updateAdministrationDataModel, updateAdminContactModel, deleteAdministrationModel, updateAdminImageModel, updateResponsibilitiesModel } = require("../models/AdministrationModel");


const createMember = async (req, res, next) => {
    const { name, designation, biography } = req.body;
    const image = req.file;
    try {
        const member = await createAdminMemberModel({name, designation, image: image.filename, biography})

        res.status(201).json({
            message: "Successfully created Administration data",
            data: member
        })

    } catch (error) {
        next(error);
    }
};

 const fetchAllMembers = async (req, res) => {
    const members = await fetchAllAdminMembersModel()

    res.status(200).json({
        message: "Fetched all administration members",
        data: members
    })
};

 const updateAdminImage = async (req, res, next) => {
    const reqImage =  req.file;
    const {id} = req.params;
    try {
        const prevData = await fetchAdminMemberByIdModel(id);

        const updatedImage = await updateAdminImageModel({id, image: reqImage.filename});
        deleteFile(`public/uploads/${prevData.image}`);
        res.status(200).json({
            message: "Updated image successfully",
            data: updatedImage
        })
    } catch (error) {
        next(error)
    }
}

 const updateAdminData = async (req, res, next) => {
    const { name, designation, biography, resposibilities } = req.body;
    const { id } = req.params;
    try {
        let responsibilitiesData;
        resposibilities ? responsibilitiesData = resposibilities.split('#') : responsibilitiesData = null

        const data = {};
        if (name) data.name = name;
        if (designation) data.designation = designation;
        if (biography) data.biography = biography;
        if (resposibilities) data.resposibilities = responsibilitiesData;
        if (Object.keys(data).length === 0) res.status(400).json("No data to update")

        const updatedData = await updateAdministrationDataModel({ id, data });
        res.status(200).json({
            message: "Successfully updated data",
            data: updatedData
        })
    } catch (error) {
        next(error);
    }
};

 const updateAdminContact = async (req, res, next) => {
    const { whatsapp, facebook, youtube } = req.body;
    const { id } = req.params;

    let data = {};
    if(whatsapp) data.whatsapp =  whatsapp;
    if(facebook) data.facebook =  facebook;
    if(youtube) data.youtube =  youtube;
    if(Object.keys(data).length === 0) res.status(200).json("No data to send")
    try {
        const updatedData = await updateAdminContactModel({ id, whatsapp: data.whatsapp, facebook: data.facebook , youtube: data.youtube});
        res.status(200).json({
            message: "Successfully updated contact",
            data: updatedData
        });
    } catch (error) {
        next(error);
    }
};

const updateAdminResponsibilities = async (req, res, next) => {
    const { id } = req.params;
    const { responsibilities } = req.body;
    const responsibilityArray = responsibilities.split("#");

    try {
        const updatedData = await updateResponsibilitiesModel({id, data: responsibilityArray});

        res.status(200).json({
            message: "Successfully update data",
            data: updatedData
        })
    } catch (error) {
        next
    }
}

 const deleteAdminMember = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const prevData = await fetchAdminMemberByIdModel(id);
        const { image } = prevData;
        
        const deletedData = await deleteAdministrationModel(id);
        image !== null ? deleteFile(`public/uploads/${image}`) : '';
        res.status(200).json({
            message: "Successfully deleted",
            data: deletedData
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMember,
    fetchAllMembers,
    updateAdminImage,
    updateAdminData,
    updateAdminResponsibilities,
    updateAdminContact,
    deleteAdminMember

}