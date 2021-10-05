const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const tasks = require('../services/tasks');


// Return project with requested id
exports.returnByID = (req, res) => {
    Project.findById(req.params.id)
        .populate("members", "firstName lastName")
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "No project with selected ID!"
                });
            }
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching project!"
            });
        });
};
//----------------------------------------------------------------


// Return projects with requested parameters
exports.return = (req, res) => {

    // Create filter object
    let filterObject = {}
    // Add query parameters to filter object todo: verjetno problem
    req.query.active && (filterObject["active"] = req.query.active)
    req.query.members && (filterObject["members"] = req.query.members)

    // TODO: Make query more efficient (should have)

    Project.find(filterObject, 'title description active members createdAt updatedAt')
        .sort({updatedAt: -1, _id: -1})
        .skip(16 * (req.query.page || 0))
        .limit(16)
        .populate("members", "firstName lastName")
        .then(projects => {
            if (!projects) {
                return res.status(404).json({
                    message: "No project with selected parameters!"
                });
            }

            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching projects!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Create new project
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title || !req.body.description || !req.body.members) {
        return res.status(400).json({message: "Required data must be present"});
    }

    // Check title
    if (typeof (req.body.title) !== "string" || req.body.title.length > 64) {
        return res.status(400).json({
            message: "Invalid title."
        });
    }

    // Check description
    if (typeof (req.body.description) !== "string" || req.body.description.length > 1024) {
        return res.status(400).json({
            message: "Invalid description."
        });
    }

    // Check status
    if (typeof (req.body.active) !== "boolean") {
        return res.status(400).json({
            message: "Invalid project status."
        });
    }

    // TODO: Check memebers

    // Create new project
    let newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        active : req.body.active,
        members : req.body.members
    });

    // Save new Project in the database
    newProject
        .save(newProject)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating a new property!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Delete project
exports.delete = (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(async project => {
            if (!project) {
                return res.status(404).send({
                    message: `No project with selected ID!`
                });
            }
            // Delete tasks
            try {
                await tasks.deleteProjectTasks(req.params.id);
            }
            catch (error){
                return res.status(500).send({
                    message: error.message || "An error occurred while deleting project tasks!"
                });

            }

            res.send({message: "Project deleted!"});

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while deleting project!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------

// Update project
exports.update = (req, res) => {

    // Validate request
    if (!req.body.title || !req.body.description || !req.body.members) {
        return res.status(400).json({message: "Required data must be present"});
    }

    // Check title
    if (typeof (req.body.title) !== "string" || req.body.title.length > 64) {
        return res.status(400).json({
            message: "Invalid title."
        });
    }

    // Check description
    if (typeof (req.body.description) !== "string" || req.body.description.length > 1024) {
        return res.status(400).json({
            message: "Invalid description."
        });
    }

    // Check status
    if (typeof (req.body.active) !== "boolean") {
        return res.status(400).json({
            message: "Invalid project status."
        });
    }

    // TODO: Check memebers

    Project.findById(req.params.id)
        .then(project => {

            if (!project) {
                return res.status(404).json({
                    message: "No project with selected ID!"
                });
            }

            // Update existing project
            project.title = req.body.title;
            project.description = req.body.description;
            project.active = req.body.active;
            project.members = req.body.members;

            // Save updated project data
            project.save()
                .then(() => {
                    res.status(200).json({message: "Project updated"})
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message || "An error occurred while updating project!"
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while updating project!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------
