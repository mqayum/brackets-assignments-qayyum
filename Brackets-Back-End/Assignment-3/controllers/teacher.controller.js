const fs = require("fs");

const getAllTeachers = () => {
    let data = fs.readFileSync("./storage/teachers.data.json","utf-8")
    return JSON.parse(data);
}
const getTeacherByID = (id) => {
    let data = getAllTeachers();
    let foundTeacher = data.find(teacher => teacher.id == id);
    if(foundTeacher)
        return foundTeacher
    else
        return null;

}
const addTeacher = (teacher) => {
    let data = getAllTeachers();
    let lastID = 0;
    if (data.length > 0)
        lastID = data[data.length-1].id;

    teacher.id = ++lastID;
    data.push(teacher);

    data = JSON.stringify(data, null, "\t");
    fs.writeFileSync("./storage/teachers.data.json",data,"utf8");
}
const updateTeacher = (id, newData) => {
    let data = getAllTeachers();
    let teacher = data.find(teacher=> teacher.id == id);

    if(teacher){
        for (const prop in newData){
            teacher[prop] = newData[prop];
        }
        data = JSON.stringify(data, null, "\t");
        fs.writeFileSync("./storage/teachers.data.json",data,"utf8");
        
        return "Teacher Updated Successfully";
    }
    else{
        return  "Teacher Not Found";
    }
    
}
const deleteTeacher = (id) => {
    let data = getAllTeachers();
    // let foundTeacher = data.find(teacher => teacher.id == id);

    let modifiedData = data.filter(teacher => teacher.id !== id);
    
    if(modifiedData.length < data.length ){
        modifiedData = JSON.stringify(modifiedData, null, "\t");
        fs.writeFileSync("./storage/teachers.data.json",modifiedData,"utf8");
        return "Teacher Deleted Sucessfully"
    }
    else{
        return "Teacher Not Deleted"
    }
}
module.exports = { getAllTeachers, addTeacher, getTeacherByID, updateTeacher, deleteTeacher };
