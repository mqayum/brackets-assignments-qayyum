const fs = require("fs");
const {getAllStudents} = require("./student.controller");
const {getTeacherByID} = require("./teacher.controller");

const getAllClasss = () => {
    let data = fs.readFileSync("./storage/classes.data.json","utf-8")
    return JSON.parse(data);
}
const getClassByID = (id) => {
    let data = getAllClasss();
    let foundClass = data.find(cls => cls.id == id);
    if(foundClass)
        return foundClass
    else
        return null;

}
const addClass = (cls) => {
    let data = getAllClasss();
    let lastID = 0;
    if (data.length > 0)
        lastID = data[data.length-1].id;    
    cls.id = ++lastID;
    let students = getAllStudents();
    let teacher = getTeacherByID(1);
    let student_ids = students.map(student => student.id);

    cls.teacher_id = teacher.id;
    cls.student_ids = student_ids;
    data.push(cls);

    data = JSON.stringify(data, null, "\t");
    fs.writeFileSync("./storage/classes.data.json",data,"utf8");
}
const updateClass = (id, newData) => {
    let data = getAllClasss();
    let cls = data.find(cls=> cls.id == id);

    if(cls){
        for (const prop in newData){
            cls[prop] = newData[prop];
        }
        data = JSON.stringify(data, null, "\t");
        fs.writeFileSync("./storage/classes.data.json",data,"utf8");
        
        return "Class Updated Successfully";
    }
    else{
        return  "Class Not Found";
    }
    
}
const deleteClass = (id) => {
    let data = getAllClasss();
    // let foundClass = data.find(cls => cls.id == id);

    let modifiedData = data.filter(cls => cls.id != id);
    
    if(modifiedData.length < data.length ){
        modifiedData = JSON.stringify(modifiedData, null, "\t");
        fs.writeFileSync("./storage/classes.data.json",modifiedData,"utf8");
        return "Class Deleted Sucessfully"
    }
    else{
        return "Class Not Deleted"
    }
}
module.exports = { getAllClasss, addClass, getClassByID, updateClass, deleteClass };
