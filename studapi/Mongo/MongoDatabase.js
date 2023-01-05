//Data From Mongo
const user = require('./MongoConnect.js').db('MyDatabase').collection('MyDB');


const GetUsers = async () => {
    const cursor = await user.find();
    return cursor.toArray();
};

//Insert new document
const insertAccount = async(id, fn, ln, crs) => {
    return await user.insertOne({id: parseInt(id), FirstName: fn, LastName: ln, Course: crs,  edit: false});
};

//Update Document
const updateAccount = async(id, fn, ln) =>{
    return await user.updateOne({id: parseInt(id)}, {$set:{
        name: fn,
        lastname: ln
    }});
};

//Delete a Document
const deleteAccount = async (id) => {
    return await user.deleteOne({id: parseInt(id)});
};

module.exports = {GetUsers, insertAccount, updateAccount, deleteAccount};