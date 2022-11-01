const fs = require("fs");

const getAllStudents = () => {
    let data = fs.readFileSync("./storage/students.data.json","utf-8")
    return JSON.parse(data);
}
const getStudentByID = (id) => {
    let data = getAllStudents();
    let foundStudent = data.find(student => student.id == id);
    if(foundStudent)
        return foundStudent
    else
        return null;

}
const addStudent = (student) => {
    let data = getAllStudents();
    let lastID = data[data.length-1].id;    
    student.id = ++lastID;
    data.push(student);

    data = JSON.stringify(data, null, "\t");
    fs.writeFileSync("./storage/students.data.json",data,"utf8");
}
const updateStudent = (id, newData) => {
    let data = getAllStudents();
    let student = data.find(student=> student.id == id);

    if(student){
        for (const prop in newData){
            student[prop] = newData[prop];
        }
        data = JSON.stringify(data, null, "\t");
        fs.writeFileSync("./storage/students.data.json",data,"utf8");
        
        return "Student Updated Successfully";
    }
    else{
        return  "Student Not Found";
    }
    
}
const deleteStudent = (id) => {
    let data = getAllStudents();
    // let foundStudent = data.find(student => student.id == id);

    let modifiedData = data.filter(student => student.id != id);
    
    if(modifiedData.length < data.length ){
        modifiedData = JSON.stringify(modifiedData, null, "\t");
        fs.writeFileSync("./storage/students.data.json",modifiedData,"utf8");
        return "Student Deleted Sucessfully"
    }
    else{
        return "Student Not Deleted"
    }
}
module.exports = { getAllStudents, addStudent, getStudentByID, updateStudent, deleteStudent };
