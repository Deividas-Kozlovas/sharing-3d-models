// redisClient.js
const { createClient } = require('redis');

// Create a Redis client
const client = createClient({
    url: 'redis://localhost:6379' // Specify the URL for the Redis server
});

// Connect to Redis server
client.connect();

// Handle Redis connection events
client.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = client;
