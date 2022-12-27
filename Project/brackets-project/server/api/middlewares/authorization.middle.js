const {SYSTEM_ROLES_ENUM} = require("../../config/constants");
const ServiceProvider = require("../models/service_provider.model");
const authorizeTo = (systemRole) => {
    return async (req, res, next) => {
        try {
            const user = req.user;

            if (!(user?.roles.includes(systemRole))) {
                return res.status(401).json({
                    message: "You're unauthorized to do this action",
                });
            }
            const userId = user._id;
            const role = systemRole;

            let sp = await ServiceProvider.findServiceProvider({userId,role})
            if (!sp){
                return res.status(404).json({
                    message: "Service Provider Not Found associated with this user"
                })
            }
            if (sp.role === SYSTEM_ROLES_ENUM.DESIGNER){
                req.designer = {
                    id: sp._id,
                    spName: sp.spName,
                    skills: sp.skills,
                    jobTitle: sp.jobTitle,
                    bio: sp.bio,
                    brandLogo: sp.brandLogo
                }
            }
            if (sp.role === SYSTEM_ROLES_ENUM.VENDOR){
                req.vendor = {
                    id: sp._id,
                    spName: sp.spName,
                    businessPhone: sp.businessPhone,
                    businessAddress: sp.businessAddress,
                    brandLogo: sp.brandLogo
                }
            }
            next();
        } catch (error) {
            console.log(error);

            res.status(500).json({
                error: "INTERNAL SERVER ERROR",
            });
        }
    };
};

module.exports = {authorizeTo};
