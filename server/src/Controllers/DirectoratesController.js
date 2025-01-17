const deleteFile = require("../helpers/fileSystem");
const { CreateDirectoratesModel, FetchDirectoratesModel, FetchDirectoratesByIdModel, UpdateDirectorateImageModel, UpdateDirctoratesDataModel, deleteDirectorateDataModel } = require("../models/DirectoratesModel");

const createDirectorateMember = async (req, res, next) => {
    const { office, headline, message, history } = req.body;
    const reqImage = req.file;

    try {
        const newMember = await CreateDirectoratesModel({office, headline, message, image: reqImage.filename, history});
        
        res.status(201).json({
            message: "Successfully created directorates member",
            data: newMember
        })
        
    } catch (error) {
        next(error);
    }
};
const FetchDirectorates = async (req, res, next) => {
    try {
        const directorates = await FetchDirectoratesModel();
        
        res.status(200).json({
            message: "Successfully fetched",
            data: directorates
        });
         
    } catch (error) {
        next(error);
    }
};

const updateDirectoratesImage = async (req, res, next) => {
    const reqImage = req.file;
    const { id } = req.params;

    try {
        const {image} = await FetchDirectoratesByIdModel(id);

        const newImage = await UpdateDirectorateImageModel({id: id, image: reqImage.filename});

        image !== null ? deleteFile(`public/uploads/${image}`) : '';
        res.status(200).json({
            message: "Succesfully updated image",
            data: newImage
        })
    } catch (error) {
        next(error);
    }
};

const updateDirectoratesData = async (req, res, next) => {
    const { office, headline, message, history, vission, mission, responsibilities } = req.body;
    const {id} = req.params;

    const data = {};
    try {
        if(office) data.office = office;
        if(headline) data.headline = headline;
        if(message) data.message = message;
        if(history) data.history = history;
        if(vission) data.vission = vission;
        if(mission) data.mission = mission;
        if(responsibilities) data.responsibilities = responsibilities.split('#');
        if(Object.keys(data).length < 1) res.status(404).json("No data to update");

        const newData = await UpdateDirctoratesDataModel({id: id, data: data});
        res.status(200).json({
            message: "Successfully changed data",
            data: newData
        })
    } catch (error) {
        next(error);
    }
}

const deleteDirectoratesData = async (req, res, next) => {
    const { id } = req.params;
    
    const {image} = await FetchDirectoratesByIdModel(id);

    const deletedData = await deleteDirectorateDataModel(id);

    res.status(200).json({
        message: "Successfully deleted",
        data: deletedData
    })
}

module.exports = {
    createDirectorateMember,
    FetchDirectorates,
    updateDirectoratesImage,
    updateDirectoratesData,
    deleteDirectoratesData
}