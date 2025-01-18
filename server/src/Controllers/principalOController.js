const deleteFile = require("../helpers/fileSystem");
const { createPrincipalOfficerModel, fetchAllPrincipalOfficersModel, fetchPrincipalOfficerByIdModel, updatePrincipalOfficerDataModel, deletePrincipalOfficcerModel, updatePrincipalOfficerImageModel } = require("../models/principalOModel");

//create principal officers
const createAPrincipalOfficer = async (req, res, next) => {
    const { name, designation, biography } = req.body;
    const image = req.file;
    try {

        const newMmber = await createPrincipalOfficerModel({name, designation, image: image?.filename, biography});

        res.status(201).json({
            message: "Successfully created Principal Officer",
            data: newMmber
        });
    } catch (error) {
        next(error);
    }
};

//fetch principalOfficers
const getPrincipalOfficers = async (req, res) => {
    const officers = await fetchAllPrincipalOfficersModel();

    res.status(200).json({
        message: "Succssfully fetched data",
        data: officers
    })
}
// update principal officer data
const updatePrincipalOData = async (req, res, next) => {
    const { name, designation,biography, responsibilities } = req.body;
    const { id } = req.params;

    const data = {};
    if(name) data.name = name;
    if(designation) data.designation = designation;
    if(biography) data.biography = biography;
    if(responsibilities) {
        const responsibilityData = responsibilities.split("#")
        data.responsibilities = responsibilityData
    };

    try {
        const updatdData = await updatePrincipalOfficerDataModel({id: id, data: data});
        res.status(202).json({
            message: "Updated Succssfully",
            data: updatdData
        })
        
    } catch (error) {
        next(error)
    }
} 

//update principal officer image
const updatePrincipalOfficerImage = async (req, res, next) => {
    const image = req.file;
    const { id } = req.params;

    const prevData = await fetchPrincipalOfficerByIdModel(id);
    const prevImg = prevData.image;
    try{
        const newImage = await updatePrincipalOfficerImageModel({id: id, image: image?.filename})

        image !== null ? deleteFile(`public/uploads/${prevImg}`) : '';
        res.status(200).json({
            message: "Successfully updated image",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
};

// delete principal officers
const deletePrincipal = async (req, res, next) => {
    const { id } = req.params;
     try {
        const prevData = await fetchPrincipalOfficerByIdModel(id);
        const prevImage = prevData.image;

        const deletedData = await deletePrincipalOfficcerModel(id);
        res.status(200).json({
            message: "Successfully deleted data",
            data: deletedData
        })
     } catch (error) {
        next(error);
     }
}

module.exports = {
    createAPrincipalOfficer,
    getPrincipalOfficers,
    updatePrincipalOData,
    updatePrincipalOfficerImage,
    deletePrincipal
}