const security = [
    {
        bearerAuth: [],
    },
];

const getReadiness = {
    tags: ['Readiness'],
    description: 'Report true when microservice is ready',
    operationId: 'getReadiness',
    security: security,
    responses: {
        '200': {
            description: 'Return readiness status',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            ready: {
                                type: 'boolean',
                                example: 'true'
                            },
                        }
                    },
                },
            },
        },
    },
};

module.exports = {getReadiness}