const fs = require("fs");

const getAllUsers = () => {
    let data = fs.readFileSync("data.json","utf-8")
    return JSON.parse(data);
}
const getUserByID = (id) => {
    let data = getAllUsers();
    let foundUser = data.find(user => user.id == id);
    if(foundUser)
        return foundUser
    else
        return null;

}
const addUser = (user) => {
    let data = getAllUsers();    
    data.push(user);

    data = JSON.stringify(data, null, "\t");
    fs.writeFileSync("./data.json",data,"utf8");
}
const updateUser = (id, newData) => {
    let data = getAllUsers();
    let user = data.find(user=> user.id == id);

    if(user){
        for (const prop in newData){
            user[prop] = newData[prop];
        }
        data = JSON.stringify(data, null, "\t");
        fs.writeFileSync("./data.json",data,"utf8");
        
        return "User Updated Successfully";
    }
    else{
        return  "User Not Found";
    }
    
}
const deleteUser = (id) => {
    let data = getAllUsers();
    // let foundUser = data.find(user => user.id == id);

    let modifiedData = data.filter(user => user.id != id);
    
    if(modifiedData.length < data.length ){
        modifiedData = JSON.stringify(modifiedData, null, "\t");
        fs.writeFileSync("./data.json",modifiedData,"utf8");
        return "User Deleted Sucessfully"
    }
    else{
        return "User Not Deleted"
    }
}
module.exports = { getAllUsers, addUser, getUserByID, updateUser, deleteUser };
