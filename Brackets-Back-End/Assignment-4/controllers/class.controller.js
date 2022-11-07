const Class = require("../models/class.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

const newClass = async (req, res) => {    
    let classData = req.body;
    try{
        //to randomly assign teacher to class
        const teachers = await Teacher.getAll();
        const teacherIDs = teachers.map((teacher)=>teacher._id);
        let randIndex = Math.floor(Math.random() * teacherIDs.length);
        classData.teacher_id = teacherIDs[randIndex];

        //to assign all students to class
        const students = await Student.getAll();
        const studentIDs = students.map((student)=>student._id);
        classData.student_ids = studentIDs;

    }
    catch(err){
        return res.status(500).json({
            message: "Error collecting data",
            error: err
        })
    }
    
    Class.create(classData)
    .then((classData)=>{
        return res.status(201).json({
            message: "Class Successfully Created",
            data: classData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while creating new class",
            error: err
        })
    });
};

const getAllClasses = (req, res) => {
    Class.getAll()
    .then((classesData)=>{
        return res.status(200).json({
            message: "Success",
            data: classesData
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error while getting classes",
            error: err
        })
    });
}

const getClassByID = (req,res) => {
    Class.getById(req.params.id)
    .then((data)=>{

        if(data){
            return res.status(200).json({
                message: "Class Found Successfull",
                data: data
            })
        }
        else{
            return res.status(200).json({
                message: "Class Not Found",
                data: data
            })
        }
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Finding Class Data",
            error: err
        })
    }); 
}

const updateClassByID = (req, res) => {
    Class.updateById(req.params.id, req.body)
    .then((result)=>{
        
        if(result.matchedCount)
            return res.status(200).json({
                message: "Class Updated Successfully",
            })
        else
            return res.status(200).json({
                message: "Class Not Found with ID: " + req.params.id,
            })
        
    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Class",
            error: err
        })
    });    
}
const deleteClassByID = (req, res) => {
    Class.removeById(req.params.id)
    .then((data)=>{
        if(data)
            return res.status(200).json({
                message: "Class Deleted Successfully",
                data: data
            })
        else
            return res.status(200).json({
                message: "Class Not Found with ID: " + req.params.id,
                data: data
            })
    }).catch((err)=>{

        return res.status(500).json({
            message: "Error While Deleting Class",
            error: err
        })
    });
}
const deleteClasses = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Class.removeMany(filter)
    .then((result)=>{

        if(result.deletedCount)
            return res.status(200).json({
                message: result.deletedCount+" Class(s) Deleted Successfully"
            })
        else
            return res.status(200).json({
                message: "Class(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Deleting Multiple Classes",
            error: err
        })
    });
}
const updateClasses = (req, res) => {
    let type = req.params.type;
    let val = req.params.value;
    let filter = {[type]: val};

    Class.updateMany(filter, req.body)
    .then((result)=>{
        console.log(result);
        if(result.matchedCount)
            return res.status(200).json({
                message: result.matchedCount+" Class(s) Updated Successfully"
            })
        else
            return res.status(200).json({
                message: "Class(s) Not Found with "+type+" : "+ val
            })

    }).catch((err)=>{
        return res.status(500).json({
            message: "Error While Updating Multiple Classes",
            error: err
        })
    });
}
module.exports = { newClass, getAllClasses, getClassByID, updateClassByID, deleteClassByID, deleteClasses, updateClasses };
