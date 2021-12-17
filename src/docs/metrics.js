const security = [
    {
        bearerAuth: [],
    },
];

const metricExample = "# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.\n" +
    "# TYPE process_cpu_user_seconds_total counter\n" +
    "process_cpu_user_seconds_total 0.094\n" +
    "\n" +
    "# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.\n" +
    "# TYPE process_cpu_system_seconds_total counter\n" +
    "process_cpu_system_seconds_total 0.016\n" +
    "\n" +
    "# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.\n" +
    "# TYPE process_cpu_seconds_total counter\n" +
    "process_cpu_seconds_total 0.11\n" +
    "\n" +
    "# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.\n" +
    "# TYPE process_start_time_seconds gauge\n" +
    "process_start_time_seconds 1639748216\n" +
    "\n" +
    "# HELP process_resident_memory_bytes Resident memory size in bytes.\n" +
    "# TYPE process_resident_memory_bytes gauge\n" +
    "process_resident_memory_bytes 57774080\n" +
    "#..."

const getMetrics = {
    tags: ['Metrics'],
    description: 'Retrieve default Prometheus metrics',
    operationId: 'getMetrics',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'List of all returned metrics',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: metricExample
                    },
                },
            },
        },
    },
};

module.exports = {getMetrics}