const taskSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            maxlength: 64,
            required: true,
            example: 'Task title',
        },
        note: {
            type: 'string',
            maxlength: 1024,
            required: true,
            example: 'Task description',
        },
        hours: {
            type: 'number',
            min: 0.5,
            max: 1000000,
            required: true,
            example: 1,
        },
        hourlyRate: {
            type: 'number',
            min: 0.01,
            max: 1000000,
            required: true,
            example: 15,
        },
        project: {
            type: 'Schema.Types.ObjectId',
            ref: 'Project',
            example: '61ab72469a696534a1f7d6d2'
        },
        date: {
            type: 'date',
            default: 'Date.now()',
            example: '2021-03-27T00:00:00.000+00:00'
        },
        contributor: {
            type: 'Schema.Types.ObjectId',
            ref: 'User',
            example: '615d6e3f148db6592a35fe4d'
        },
        completed: {
            type: 'boolean',
            required: true
        },
        paid: {
            type: 'boolean',
            required: true
        }
    },
};

const security = [
    {
        bearerAuth: [],
    },
];

const paramId = {
    name: 'id',
    in: 'path',
    description: 'Task ID',
    required: true,
    type: 'string',
    example: '61bc89032eddb6359b154d42'
}

const paramFilter = {}


const getTask = {
    tags: ['Tasks'],
    description: 'Retrieve task data by id',
    operationId: 'getTask',
    security: security,
    parameters: [paramId],
    responses: {
        '200': {
            description: 'Returned details of task',
            content: {
                'application/json': {
                    schema: taskSchema
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while fetching task!'
                            }
                        }
                    },
                },
            },
        },

    },
}

const getTasks = {
    tags: ['Tasks'],
    description: 'Retrieve task data by id',
    operationId: 'getTask',
    security: security,
    parameters: [
        paramId,
        {
            name: 'project',
            in: 'query',
            description: 'Project id',
            type: 'string',
            example: '61bc89032eddb6359b154d42'
        },
        {
            name: 'contributor',
            in: 'query',
            description: 'User ID',
            type: 'string',
            example: '615d6e3f148db6592a35fe4d'
        },
        {
            name: 'completed',
            in: 'query',
            description: 'Status of completion',
            type: 'boolean',
            example: 'true'
        },
        {
            name: 'paid',
            in: 'query',
            description: 'Status of payment',
            type: 'boolean',
            example: 'true'
        }
    ],
    responses: {
        '200': {
            description: 'Returned details of task',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: taskSchema.properties,
                        },
                    }
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while fetching task!'
                            }
                        }
                    },
                },
            },
        },

    },
}

const createTask = {
    tags: ['Tasks'],
    description: 'Create new task',
    operationId: 'createTask',
    security: security,
    parameters: [paramId],
    requestBody: {
        content: {
            'application/json': {
                schema: taskSchema
            },
        },
    },
    responses: {
        '200': {
            description: 'Returned success message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Task created!'
                            }
                        }
                    },
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while deleting task!'
                            }
                        }
                    },
                },
            },
        },
    },
}

const deleteTask = {
    tags: ['Tasks'],
    description: 'Delete task data by id',
    operationId: 'deleteTask',
    security: security,
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Project ID',
            required: true,
            type: 'string',
            example: '61bc89032eddb6359b154d42'
        }
    ],
    responses: {
        '200': {
            description: 'Returned success message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Tasks deleted!'
                            }
                        }
                    },
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while deleting project tasks!'
                            }
                        }
                    },
                },
            },
        },
    },
}

const updateTask = {
    tags: ['Tasks'],
    description: 'Update task data by id',
    operationId: 'updateTask',
    security: security,
    parameters: [paramId],
    requestBody: {
        content: {
            'application/json': {
                schema: taskSchema
            },
        },
    },
    responses: {
        '200': {
            description: 'Returned success message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Task updated!'
                            }
                        }
                    },
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while deleting task!'
                            }
                        }
                    },
                },
            },
        },
    },
}

const deleteProjectTasks = {
    tags: ['Tasks'],
    description: 'Delete all tasks that belong to the project with the requested id',
    operationId: 'deleteProjectTasks',
    security: security,
    parameters: [paramId],
    responses: {
        '200': {
            description: 'Returned success message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Task deleted!'
                            }
                        }
                    },
                },
            },
        },
        '404': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No task with selected ID!'
                            }
                        }
                    },
                },
            },
        },
        '500': {
            description: 'Returned error message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'An error occurred while deleting task!'
                            }
                        }
                    },
                },
            },
        },
    },
}

module.exports = {taskSchema, getTask, getTasks, createTask, deleteTask, updateTask, deleteProjectTasks}