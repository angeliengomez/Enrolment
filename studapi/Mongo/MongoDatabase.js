const students = require('./MongoConnect').db('MyDatabase').collection('MyDB');

const getAllStudents = async () => {
    const cursor = await students.find();
    return cursor.toArray();
};

module.exports = {getAllStudents};