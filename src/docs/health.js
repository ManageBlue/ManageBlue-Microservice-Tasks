const security = [
    {
        bearerAuth: [],
    },
];

const healthSucc = {
    outcome: {
        type: 'string',
        example: 'UP'
    },
    checks: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                outcome: {
                    type: 'string',
                },
                reason: {
                    type: 'string',
                },
            },
            example: [
                {
                    name: "MongoDB connection",
                    outcome: "UP",
                    reason: ""
                },
                {
                    name: "Simulation",
                    outcome: "UP",
                    reason: ""
                }
            ]
        }
    }
}

const healthFail = {
    outcome: {
        type: 'string',
        example: 'DOWN'
    },
    checks: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                outcome: {
                    type: 'string',
                },
                reason: {
                    type: 'string',
                },
            }
        },
        example: [
            {
                name: "MongoDB connection",
                outcome: "DOWN",
                reason: "Not connected"
            },
            {
                name: "Simulation",
                outcome: "DOWN",
                reason: "Simulating health problem"
            }
        ]
    },
}


const getHealth = {
    tags: ['Health'],
    description: 'Retrieve healthcheck status',
    operationId: 'getHealth',
    security: security,
    responses: {
        '200': {
            description: 'Returned list of all healthcheck statuses - SUCCESS',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: healthSucc
                    },
                },
            },
        },
        '503': {
            description: 'Returned list of all healthcheck statuses - FAILURE',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: healthFail
                    },
                },
            },
        },

    },
};

const simulateHealth = {
    tags: ['Health'],
    description: 'Simulate sick microservice',
    operationId: 'simulateHealth',
    security: security,
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        simulate: {
                            type: 'boolean',
                            example: 'true'
                        }
                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successfully simulated sickness',
        },
    }
}

module.exports = {getHealth, simulateHealth}