const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

const newTeacher = async (req, res) => {    
    
    Teacher.create(req.body)
    .then((teacherData)=>{
        return res.status(201).json({
            message: "Teacher Successfully Created",
            data: teacherData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while creating new teacher",
            error: err
        })
    });
};

const getAllTeachers = (req, res) => {
    Teacher.getAll()
    .then((teacheresData)=>{
        return res.status(200).json({
            message: "Success",
            data: teachersData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while getting teachers",
            error: err
        })
    });
}

const getTeacherByID = (req,res) => {
    Teacher.getById(req.params.id)
    .then((data)=>{

        if(data){
            return res.status(200).json({
                message: "Teacher Found Successfull",
                data: data
            })
        }
        else{
            return res.status(200).json({
                message: "Teacher Not Found",
                data: data
            })
        }
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Finding Teacher Data",
            error: err
        })
    }); 
}

const updateTeacherByID = (req, res) => {
    Teacher.updateById(req.params.id, req.body)
    .then((result)=>{
        
        if(result.matchedCount)
            return res.status(200).json({
                message: "Teacher Updated Successfully",
            })
        else
            return res.status(200).json({
                message: "Teacher Not Found with ID: " + req.params.id,
            })
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Teacher",
            error: err
        })
    });    
}
const deleteTeacherByID = (req, res) => {
    Teacher.removeById(req.params.id)
    .then((data)=>{
        if(data)
            return res.status(200).json({
                message: "Teacher Deleted Successfully",
                data: data
            })
        else
            return res.status(200).json({
                message: "Teacher Not Found with ID: " + req.params.id,
                data: data
            })
    }).catch((err)=>{

        return res.status(500).json({
            message: "Error While Deleting Teacher",
            error: err
        })
    });
}
const deleteTeachers = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Teacher.removeMany(filter)
    .then((result)=>{

        if(result.deletedCount)
            return res.status(200).json({
                message: result.deletedCount+" Teacher(s) Deleted Successfully"
            })
        else
            return res.status(200).json({
                message: "Teacher(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Deleting Multiple Teachers",
            error: err
        })
    });
}
const updateTeachers = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Teacher.updateMany(filter, req.body)
    .then((result)=>{
        console.log(result);
        if(result.matchedCount)
            return res.status(200).json({
                message: result.matchedCount+" Teacher(s) Updated Successfully"
            })
        else
            return res.status(200).json({
                message: "Teacher(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Multiple Teachers",
            error: err
        })
    });
}
module.exports = { newTeacher, getAllTeachers, getTeacherByID, updateTeacherByID, deleteTeacherByID, deleteTeachers, updateTeachers };
