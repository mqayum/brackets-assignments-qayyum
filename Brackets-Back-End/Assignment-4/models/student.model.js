const { default: mongoose } = require("mongoose");
const Student = require("../schemas/students.schema");


const create = async (data) => {
    try{
        const stu = new Student(data);
        return await stu.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async () => {
    try{
        return await Student.find({});
    }
    catch(err){
        return err;
    }
}
const getById = async (id) => {
    try{
        return await Student.findById(id);
    }
    catch(err){
        return err;
    }

}
const removeById = async (id) => {
    try{
        return await Student.findByIdAndDelete({_id: id});
    }
    catch(err){
        return err;
    }
}
const updateById = async (id, data) => {
    try{
        return await Student.updateOne({_id: id}, data);
    }
    catch(err){
        return err;
    }
}
const removeMany = async (filter) => {
    try{
        return await Student.deleteMany(filter);
    }
    catch(err){
        return err;
    }
}
const updateMany = async (filter, data) => {
    try{
        return await Student.updateMany(filter, data);
    }
    catch(err){
        return err;
    }
}
module.exports = {create, getAll, getById, removeById, updateById, removeMany, updateMany};

