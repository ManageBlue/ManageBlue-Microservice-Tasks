const mongoose = require('mongoose');
const Task = mongoose.model('Task');


// Return task with requested id
exports.returnByID = (req, res) => {
    Task.findById(req.params.id)
        //.populate([{path: "contributor", select: "firstName lastName"}, {path: "project", select: "title"}])
        .then(task => {
            if (!task) {
                return res.status(404).json({
                    message: "No task with selected ID!"
                });
            }
            res.status(200).json(task);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching task!"
            });
        });
};
//----------------------------------------------------------------


// Return task with requested parameters
exports.return = (req, res) => {

    // Create filter object
    let filterObject = {}
    // Add query parameters to filter object todo: verjetno problem completed in paid
    req.query.project && (filterObject["project"] = req.query.project)
    req.query.contributor && (filterObject["contributor"] = req.query.contributor)
    req.query.completed && (filterObject["completed"] = req.query.completed)
    req.query.paid && (filterObject["paid"] = req.query.paid)

    // TODO: Make query more efficient (should have)

    Task.countDocuments(filterObject).then(count => {

        Task.find(filterObject, 'title note hours hourlyRate project date contributor completed paid createdAt updatedAt')
            .sort({date: -1, _id: -1})
            .skip(16 * (req.query.page || 0))
            .limit(16)
            //.populate([{path: "contributor", select: "firstName lastName"}, {path: "project", select: "title"}])
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).json({
                        message: "No task with selected parameters!"
                    });
                }

                let response = {
                    'tasks': tasks,
                    'count': count
                }
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "An error occurred while fetching tasks!"
                });
            });
    })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching properties!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Create new task
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title || !req.body.note || !req.body.hours || !req.body.hourlyRate || !req.body.project || !req.body.date || !req.body.contributor) {
        return res.status(400).json({message: "Required data must be present"});
    }

    // Check title
    if (typeof (req.body.title) !== "string" || req.body.title.length > 64) {
        return res.status(400).json({
            message: "Invalid title."
        });
    }

    // Check note
    if (typeof (req.body.note) !== "string" || req.body.note.length > 1024) {
        return res.status(400).json({
            message: "Invalid note."
        });
    }

    // Check hours
    if (typeof (req.body.hours) !== "number" || req.body.hours < 0.5 || req.body.hours > 1000000) {
        return res.status(400).json({
            message: "Invalid hours."
        });
    }

    // Check hourlyRate
    if (typeof (req.body.hourlyRate) !== "number" || req.body.hourlyRate < 0.01 || req.body.hourlyRate > 1000000) {
        return res.status(400).json({
            message: "Invalid hourlyRate."
        });
    }

    // Check note
    if (typeof (req.body.note) !== "string" || req.body.note.length > 1024) {
        return res.status(400).json({
            message: "Invalid note."
        });
    }

    // Check date
    if (req.body.date instanceof Date) {
        return res.status(400).json({
            message: "Invalid date."
        });
    }

    // Check completed status
    if (typeof (req.body.completed) !== "boolean") {
        return res.status(400).json({
            message: "Invalid completed status."
        });
    }

    // Check paid status
    if (typeof (req.body.paid) !== "boolean") {
        return res.status(400).json({
            message: "Invalid paid status."
        });
    }

    // TODO: Check contributor & project

    // Create new task
    let newTask = new Task({
        title: req.body.title,
        note: req.body.note,
        hours: req.body.hours,
        hourlyRate: req.body.hourlyRate,
        project: req.body.project,
        date: req.body.date,
        contributor: req.body.contributor,
        completed: req.body.completed,
        paid: req.body.paid
    });

    // Save new task in the database
    newTask
        .save(newTask)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating new task!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Delete project
exports.delete = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(async task => {
            if (!task) {
                return res.status(404).send({
                    message: `No task with selected ID!`
                });
            }
            res.send({message: "Task deleted!"});

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while deleting task!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Update task
exports.update = (req, res) => {

    // Validate request
    if (!req.body.title || !req.body.note || !req.body.hours || !req.body.hourlyRate || !req.body.project || !req.body.date || !req.body.contributor) {
        return res.status(400).json({message: "Required data must be present"});
    }

    // Check title
    if (typeof (req.body.title) !== "string" || req.body.title.length > 64) {
        return res.status(400).json({
            message: "Invalid title."
        });
    }

    // Check note
    if (typeof (req.body.note) !== "string" || req.body.note.length > 1024) {
        return res.status(400).json({
            message: "Invalid note."
        });
    }

    // Check hours
    if (typeof (req.body.hours) !== "number" || req.body.hours < 0.5 || req.body.hours > 1000000) {
        return res.status(400).json({
            message: "Invalid hours."
        });
    }

    // Check hourlyRate
    if (typeof (req.body.hourlyRate) !== "number" || req.body.hourlyRate < 0.01 || req.body.hourlyRate > 1000000) {
        return res.status(400).json({
            message: "Invalid hourlyRate."
        });
    }

    // Check note
    if (typeof (req.body.note) !== "string" || req.body.note.length > 1024) {
        return res.status(400).json({
            message: "Invalid note."
        });
    }

    // Check date
    if (req.body.date instanceof Date) {
        return res.status(400).json({
            message: "Invalid date."
        });
    }

    // Check completed status
    if (typeof (req.body.completed) !== "boolean") {
        return res.status(400).json({
            message: "Invalid completed status."
        });
    }

    // Check paid status
    if (typeof (req.body.paid) !== "boolean") {
        return res.status(400).json({
            message: "Invalid paid status."
        });
    }

    // TODO: Check contributor & project

    Task.findById(req.params.id)
        .then(task => {

            if (!task) {
                return res.status(404).json({
                    message: "No task with selected ID!"
                });
            }

            // Update existing task
            task.title = req.body.title;
            task.note = req.body.note;
            task.hours = req.body.hours;
            task.hourlyRate = req.body.hourlyRate;
            task.project = req.body.project;
            task.date = req.body.date;
            task.contributor = req.body.contributor;
            task.completed = req.body.completed;
            task.paid = req.body.paid;

            // Save updated task data
            task.save()
                .then(() => {
                    res.status(200).json({message: "Task updated"})
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message || "An error occurred while updating task!"
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while updating task!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Delete all tasks that belong to the project with the requested id
exports.deleteProjectTasks = (req, res) => {
    Task.deleteMany({project: req.params.id})
        .then(tasks => {
            if (tasks.deletedCount === 0) {
                return res.status(404).send({
                    message: `No tasks with selected project ID!`
                });
            }
            else {
                res.send({message: "Tasks deleted!"});
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while deleting project tasks!"
            });
        })

}
