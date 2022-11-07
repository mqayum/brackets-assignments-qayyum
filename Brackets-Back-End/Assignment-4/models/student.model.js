const { default: mongoose } = require("mongoose");
const Student = require("../schemas/students.schema");


const create = async (data) => {
    const stu = new Student(data);
    return await stu.save();
}
const getAll = async () => {
    return await Student.find({});
}
const removeById = async (id) => {
    return await Student.findByIdAndDelete({_id: id});
}
const updateById = async (id, data) => {
    return await Student.updateOne({_id: id}, data);
}
const removeMany = async (filter) => {
    return await Student.deleteMany(filter);
}
const updateMany = async (filter, data) => {
    return await Student.updateMany(filter, data);
}
module.exports = {create, getAll, removeById, updateById, removeMany, updateMany};

