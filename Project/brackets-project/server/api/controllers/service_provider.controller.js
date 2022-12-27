const ServiceProvider = require("../models/service_provider.model")
const User = require("../models/user.model")
const {SYSTEM_ROLES_ENUM} = require("../../config/constants");
const fs = require("fs");

const registerVendor = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.VENDOR;
    return await registerServiceProvider(req, res);
}
const registerDesigner = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.DESIGNER;
    return await registerServiceProvider(req, res);
}
const getVendorByUserId = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.VENDOR;
    return await getServiceProviderById(req, res);
}
const getDesignerByUserId = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.DESIGNER;
    return await getServiceProviderById(req, res);
}
const updateVendor = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.VENDOR;
    return await updateServiceProvider(req, res);
}
const updateDesigner = async (req, res) => {
    req.role = SYSTEM_ROLES_ENUM.DESIGNER;
    return await updateServiceProvider(req, res);
}
const getServiceProviderById = async (req, res) => {
    try {
        const role = req.role;
        let sp = {};

        if (role === SYSTEM_ROLES_ENUM.DESIGNER)
            sp = req.designer

        if (role === SYSTEM_ROLES_ENUM.VENDOR)
            sp = req.vendor

        return res.status(200).json({
            message: "SUCCESS: Service Provider Data Retrieved successfully.",
            sp
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR "+e
        })
    }
}
const registerServiceProvider = async (req, res) => {
    try {
        const bodyData = req.body;
        const userId = req.user._id;
        const role = req.role;

        const serviceProviderExist = await ServiceProvider.findServiceProvider({
            businessPhone: bodyData.businessPhone,
            userId,
            role
        })
        if (serviceProviderExist){
            return res.status(409).json({
                message: "Service provider already exist"
            })
        }
        bodyData.userId = userId;
        bodyData.role = role;
        await User.assignRole(userId, role);

        const service_provider = await ServiceProvider.addServiceProvider(bodyData);
        res.status(200).json({
            message: "SUCCESS: Vendor Registered Successfully",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR "+e
        })
    }
}
const updateServiceProvider = async (req, res) => {
    try {
        const {spId} = req.params;
        const newData = req.body;
        const userId = req.user._id;
        const role = req.role;
        const serviceProviderFound = await ServiceProvider.findServiceProvider({
            userId,role,businessPhone: newData.businessPhone, id:spId});

        if (!serviceProviderFound){
            return res.status(400).json({
                message: "Service Provider Not Found"
            })
        }
        if (req.file){
            const existingLogo = serviceProviderFound.brandLogo;

            if (existingLogo){
                fs.unlink(`uploads/${existingLogo}`, (err) => {
                    if (err)
                        throw err;
                })
            }
            newData.brandLogo = req.file.filename;
        }

        const isMatched = await ServiceProvider.shouldUpdate(spId, newData);

        if (isMatched){
            return res.status(409).json({
                message: "Business already exist with same phone number."
            })
        }
        const updateServiceProvider = await ServiceProvider.updateServiceProvider(spId, newData);
        res.status(200).json({
            message: "SUCCESS: Service Provider Info Updated Successfully",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
}


module.exports = {registerVendor, registerDesigner, updateVendor, updateDesigner, getVendorByUserId, getDesignerByUserId}