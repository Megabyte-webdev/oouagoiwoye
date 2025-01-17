const deleteFile = require("../helpers/fileSystem");
const { createCEducationModel, fetchContinuingEducationsModel, updateCEducationDataModel, fetchCEByIdModel, updateCEducationImageModel, deleteCEducationModel } = require("../models/CEducationModel")

const createProgram = async (req, res, next) => {
    const { program, headline, overview } = req.body;
    const reqImage = req.file;

    try {
        const data= {};
        data.program = program;
        data.image = reqImage.filename;
        data.headline = headline;
        data.overview = overview;

        const newProgram = await createCEducationModel(data);

        res.status(201).json({
            message: "Successfully created new Program",
            data: newProgram
        })
    } catch (error) {
        next(error);
    }
};

const fetchAllPrograms = async (req, res, next) => {
    const programs = await fetchContinuingEducationsModel();

    try {
        res.status(200).json({
            message: "Successfully fetched",
            data: programs
        }) 
    } catch (error) {
        next(error)
    }
};

const updateCEdata = async (req, res, next) => {
    const { program, headline, overview, requirements, benefits } = req.body;
    const { id } = req.params;
    const data = {};
    try {

        if(program) data.program = program;
        if(headline) data.headline = headline;
        if(overview) data.overview = overview;
        if(requirements) data.requirements = requirements.split('#');
        if(benefits) data.benefits = benefits.split('#');
        if(Object.keys(data).length === 0) res.status(404).json("Enter a value to update"); 

        const updatedData = await updateCEducationDataModel({id: id, data: data});
        res.status(200).json({
            message: "Successfully updated data",
            data: updatedData
        })
        
    } catch (error) {
        next(error);
    }
}

const updateCEImage = async (req, res, next) => {
    const reqImage = req.file;
    const { id } = req.params;
    
    try {
        const prevdata = await fetchCEByIdModel(id);
        const prevImg = prevdata.image;

        const newImage = await updateCEducationImageModel({id: id, image: reqImage.filename });

        prevImg !== null ? deleteFile(`public/uploads/${prevImg}`) : ''
        res.status(200).json({
            message: "update image successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
}

const deleteCE = async (req, res, next) => {
    const { id } = req.params;
    const { image } = await fetchCEByIdModel(id);
    
    const deletedData = await deleteCEducationModel(id);

    image !== null ? deleteFile(`public/uploads/${image}`) : ''
    res.status(200).json({
        message: "Deleted Successfully",
        data: deletedData
    })

}
module.exports = {
    createProgram,
    fetchAllPrograms,
    updateCEdata,
    updateCEImage,
    deleteCE
}