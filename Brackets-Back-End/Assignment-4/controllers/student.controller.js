
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
    Student.getAll()
    .then((studentsData)=>{
        return res.status(200).json({
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

const getStudentByID = (req,res) => {
    Student.getById(req.params.id)
    .then((data)=>{

        if(data){
            return res.status(200).json({
                message: "Student Found Successfull",
                data: data
            })
        }
        else{
            return res.status(200).json({
                message: "Student Not Found",
                data: data
            })
        }
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Finding Student Data",
            error: err
        })
    }); 
}

const updateStudentByID = (req, res) => {
    Student.updateById(req.params.id, req.body)
    .then((result)=>{
        
        if(result.matchedCount)
            return res.status(200).json({
                message: "Student Updated Successfully",
            })
        else
            return res.status(200).json({
                message: "Student Not Found with ID: " + req.params.id,
            })
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Student",
            error: err
        })
    });    
}
const deleteStudentByID = (req, res) => {
    Student.removeById(req.params.id)
    .then((data)=>{
        if(data)
            return res.status(200).json({
                message: "Student Deleted Successfully",
                data: data
            })
        else
            return res.status(200).json({
                message: "Student Not Found with ID: " + req.params.id,
                data: data
            })
    }).catch((err)=>{

        return res.status(500).json({
            message: "Error While Deleting Student",
            error: err
        })
    });
}
const deleteStudents = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Student.removeMany(filter)
    .then((result)=>{

        if(result.deletedCount)
            return res.status(200).json({
                message: result.deletedCount+" Student(s) Deleted Successfully"
            })
        else
            return res.status(200).json({
                message: "Student(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Deleting Multiple Students",
            error: err
        })
    });
}
const updateStudents = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Student.updateMany(filter, req.body)
    .then((result)=>{
        console.log(result);
        if(result.matchedCount)
            return res.status(200).json({
                message: result.matchedCount+" Student(s) Updated Successfully"
            })
        else
            return res.status(200).json({
                message: "Student(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Multiple Students",
            error: err
        })
    });
}
module.exports = { newStudent, getAllStudents, getStudentByID, updateStudentByID, deleteStudentByID, deleteStudents, updateStudents };
