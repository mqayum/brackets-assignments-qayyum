const { default: mongoose } = require("mongoose");
const Teacher = require("../schemas/teachers.schema");


const create = async (data) => {
    try{
        const stu = new Teacher(data);
        return await stu.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async () => {
    try{
        return await Teacher.find({});
    }
    catch(err){
        return err;
    }
}
const getById = async (id) => {
    try{
        return await Teacher.findById(id);
    }
    catch(err){
        return err;
    }

}
const removeById = async (id) => {
    try{
        return await Teacher.findByIdAndDelete({_id: id});
    }
    catch(err){
        return err;
    }
}
const updateById = async (id, data) => {
    try{
        return await Teacher.updateOne({_id: id}, data);
    }
    catch(err){
        return err;
    }
}
const removeMany = async (filter) => {
    try{
        return await Teacher.deleteMany(filter);
    }
    catch(err){
        return err;
    }
}
const updateMany = async (filter, data) => {
    try{
        return await Teacher.updateMany(filter, data);
    }
    catch(err){
        return err;
    }
}
module.exports = {create, getAll, getById, removeById, updateById, removeMany, updateMany};

