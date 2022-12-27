const ServiceProvider = require("../schemas/service_provider.schema")
const mongoose = require("mongoose");
const {SYSTEM_ROLES_ENUM} = require("../../config/constants");
const User = require("../schemas/user.schema");
const addServiceProvider = async (data) => {
    try {
        const service_provider = new ServiceProvider(data)
        return service_provider.save();
    }
    catch (e) {
        throw e;
    }
}

const findServiceProvider = async (keys) => {
    try {
        let sp = {}
        if (keys.businessPhone) {
             sp = await ServiceProvider.findOne({
                $or: [
                    {
                        $and: [
                            {userId: {$eq: keys.userId}},
                            {role: {$eq: keys.role}}
                        ]
                    },
                    {_id: {$eq: keys.id}},
                    {businessPhone: {$eq: keys.businessPhone}}
                ]
            })
        }
        else {
            sp = await ServiceProvider.findOne({
                $or: [
                    {
                        $and: [
                            {userId: {$eq: keys.userId}},
                            {role: {$eq: keys.role}}
                        ]
                    },
                    {_id: {$eq: keys.id}}
                ]
            })
        }
        return sp
    }
    catch (e) {
        throw e;
    }
}
const shouldUpdate = async (id, data) => {
    try {
        const foundSp = await ServiceProvider.findOne({
            $and: [
                {_id: {$ne: id}},
                {businessPhone: {$eq: data.businessPhone}},
            ]
        });
        return foundSp;
    }
    catch (e) {
        throw e;
    }
}
const updateServiceProvider = async (id, data) => {
    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(id, data, {
            new: true
        });
        return updatedServiceProvider;
    }
    catch (e) {
        throw e;
    }
}



module.exports = {addServiceProvider, findServiceProvider, updateServiceProvider, shouldUpdate}