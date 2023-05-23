const { createClient } = require("redis");
const redisClient = createClient();

(async () => {
    await redisClient.connect();
})();

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));

module.exports = redisClient;