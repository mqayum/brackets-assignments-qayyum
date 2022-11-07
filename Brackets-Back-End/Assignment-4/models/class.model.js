const { default: mongoose } = require("mongoose");
const Class = require("../schemas/classes.schema");


const create = async (data) => {
    try{
        const stu = new Class(data);
        return await stu.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async () => {
    try{
        return await Class.find({});
    }
    catch(err){
        return err;
    }
}
const getById = async (id) => {
    try{
        return await Class.findById(id);
    }
    catch(err){
        return err;
    }

}
const removeById = async (id) => {
    try{
        return await Class.findByIdAndDelete({_id: id});
    }
    catch(err){
        return err;
    }
}
const updateById = async (id, data) => {
    try{
        return await Class.updateOne({_id: id}, data);
    }
    catch(err){
        return err;
    }
}
const removeMany = async (filter) => {
    try{
        return await Class.deleteMany(filter);
    }
    catch(err){
        return err;
    }
}
const updateMany = async (filter, data) => {
    try{
        return await Class.updateMany(filter, data);
    }
    catch(err){
        return err;
    }
}
module.exports = {create, getAll, getById, removeById, updateById, removeMany, updateMany};

