const mongoose = require('mongoose');
const Task = mongoose.model('Task');


// Delete all tasks that belog to the project with the requested id
exports.deleteProjectTasks = (id) => {

    return new Promise((resolve, reject) => {

        Task.deleteMany({project: id})
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error.message || "An error occurred while deleting project tasks!");

            })
    })
}
