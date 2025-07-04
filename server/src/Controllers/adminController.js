const { findUniqueUsernameModel, createNewAdminAccountModel, updateAdminDataModel, fetchAllAdminsModel, deleteAdminModel } = require("../models/AdminModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const createAdminAccount = async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const userExist = await findUniqueUsernameModel(username);

        if (username === '' || password === '') {
            return res.status(400).json("No value inputed in request");
        }

        if(userExist) res.status(400).json("Username already registered");

        const hashPassword = bcrypt.hashSync(password, 10);

        const newAccount = await createNewAdminAccountModel({username, password: hashPassword});

        res.status(201).json({
            message: "Created account successfully",
            data: username
        })
    } catch (error) {
        next(error);
    }
};

const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const userExist = await findUniqueUsernameModel(username);
        const correctPassword = bcrypt.compareSync(password, userExist.password);

        if(!userExist || !correctPassword) res.status(404).json("Incorrect Credentials");

        const token = jwt.sign({userExist}, process.env.JWT_ACCESS_SECRET_TOKEN, { expiresIn: '1h' });

        res
        .status(200)
        .cookie("authToken", token, { httpOnly: false })
        .json("Login Successfully");
    } catch (error) {
        next(error);
    }
};

const fetchAllAdmins = async (req, res, next) => {
    try {
        const allAdminAccounts = await fetchAllAdminsModel();

        for(const account of allAdminAccounts) {
            const passLength = account.password.length;
            account.password = '#'.repeat(passLength);
        }

        res.status(200).json({
            message: "Fetched all admin accounts",
            data: allAdminAccounts
        })
    } catch (error) {
        next(error)
    }
}

const updateAdminDetails = async (req, res, next) => {
    const { username, password } = req.body;
    const { id } = req.params;

    try {
        const data = {};

        if(username) data.username = username;
        if (password) data.password = bcrypt.hashSync(password, 10);
        if(Object.keys(data).length === 0) res.status(400).json('No data to update');
        const updatedAccount = await updateAdminDataModel({id, data: data});

        res.status(200).json({
            message: "Updated details successfully",
            data: username
        })
    } catch (error) {
        next(error);
    }
};

const deleteAdminDetails = async (req, res, next) => {
    const { id } = req.params;

    const deletedAccount = await deleteAdminModel(id);

    res.status(200).json({
        message: "Deleted Account Sucessfully",
        data: deletedAccount.username
    })
}

module.exports = {
    createAdminAccount,
    loginAdmin,
    fetchAllAdmins,
    updateAdminDetails,
    deleteAdminDetails
}