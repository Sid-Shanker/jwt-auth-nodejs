const redis = require('redis');

// connect to redis
const redis_client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis_client.on('connect', function () {
    console.log('redis client connected');
});

module.exports = redis_client;