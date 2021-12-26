const { taskSchema, getTask, getTasks, createTask, deleteTask, updateTask, deleteProjectTasks } = require('./tasks');
const { getMetrics } = require('./metrics');
const { getReadiness } = require('./ready');
const { getHealth, simulateHealth } = require('./health');

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'ManageBlue Tasks microservice',
        description: 'ManageBlue Tasks REST API',
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
        contact: {
            name: "ManageBlue Inc.",
            url: "https://www.manageblue.com", //TODO
            email: "info@savegreen.com"
        },
        servers: [
            { url: "http://localhost:5000/api" },
            { url: "https://manageblue.com/api" } //TODO
        ]
    },
    servers: [
        { url: "http://localhost:5000" },
        { url: "https://manageblue.com" } //TODO
    ],
    tags: [
        {
            name: 'Tasks',
        },
        {
            name: 'Health',
        },
        {
            name: 'Readiness',
        },
        {
            name: 'Metrics',
        },
    ],
    paths: {
        "/health": {
            get: getHealth,
        },
        "/health/simulate": {
            post: simulateHealth,
        },
        "/ready": {
            get: getReadiness,
        },
        "/metrics": {
            get: getMetrics,
        },
        "/tasks/api/v1": {
            get: getTasks,
            post: createTask,
        },
        "/tasks/api/v1/{id}": {
            get: getTask,
            put: updateTask,
            delete: deleteTask,
        },
        "/tasks/api/v1/deleteProject/{id}": {
            delete: deleteProjectTasks,
        }


    },
    components: {
        schemas: {
            taskSchema,
        },
    },
};

module.exports = apiDocumentation;