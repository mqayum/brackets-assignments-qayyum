
const fs = require("fs");
const Student = require("../models/student.model");

const newStudent = (req, res) => {    

    Student.create(req.body)
    .then((studentData)=>{
        return res.status(201).json({
            message: "Student Successfully Created",
            data: studentData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while creating new student",
            error: err
        })
    });
};

const getAllStudents = (req, res) => {
    // return getStudents();
    Student.getAll()
    .then((studentsData)=>{
        return res.status(201).json({
            message: "Success",
            data: studentsData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while getting students",
            error: err
        })
    });
}
const getStudentByID = (id) => {
    // let data = getAllStudents();
    // let foundStudent = data.find(student => student.id == id);
    // if(foundStudent)
    //     return foundStudent
    // else
    //     return null;

}
// const addStudent = (student) => {
//     let data = getAllStudents();
//     let lastID = 0;
//     if (data.length > 0)
//         lastID = data[data.length-1].id;   
//     student.id = ++lastID;
//     data.push(student);

//     data = JSON.stringify(data, null, "\t");
//     fs.writeFileSync("./storage/students.data.json",data,"utf8");
// }
const updateStudentByID = (req, res) => {
    Student.updateById(req.params.id, req.body)
    .then((resolve)=>{
        res.send("Student Updated");
    }).catch((err)=>{
        res.send("Error Updating Record");
    });    
}
const deleteStudentByID = (req, res) => {
    Student.removeById(req.params.id)
    .then((resolve)=>{
        res.send("Student Deleted");
    }).catch((err)=>{
        res.send("Error Deleting Record");
    });
}
const deleteStudents = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};
    Student.removeMany(filter)
    .then((resolve)=>{
        res.send("Multiple Students Deleted");
    }).catch((err)=>{
        res.send("Error Deleting Multiple Records");
    });
}
const updateStudents = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};
    
    Student.updateMany(filter, req.body)
    .then((resolve)=>{
        res.send("Multiple Students Updated");
    }).catch((err)=>{
        res.send("Error Updating Multiple Records");
    });
}
module.exports = { newStudent, getAllStudents, getStudentByID, updateStudentByID, deleteStudentByID, deleteStudents, updateStudents };
