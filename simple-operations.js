console.log("app is loading ...");

class RedisQueue{
  constructor(redisClient , numElement , queueId){
      this.redisClient = redisClient;
      this.numElement = numElement;
      this.queueId = queueId;
  }
}

const redis = require("redis"),
  keyTest = "test";

const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

let oRedisQueue = new RedisQueue(client,3,"xyz123");

function handleMode() {
  const mode = process.argv[2];

  switch (mode) {
    case "get":
      client.get(keyTest, function (err, reply) {
        if (err) {
          throw err;
        }

        console.log(reply);
      });
      break;

    case "set":
      client.set(keyTest, new Date().toString(), function (err, reply) {
        if (err) {
          throw err;
        }

        console.log(reply);
      });
      break;

    case "setex":
      // --- this will expired in 60 seconds
      client.setex(keyTest, 60, new Date().toString(), function (err, reply) {
        if (err) {
          throw err;
        }

        console.log(reply);
      });
      break;

    case "del":
      client.del(keyTest, function (err, reply) {
        if (err) {
          throw err;
        }

        console.log(reply);
      });
      break;

    case "exist":
      client.exists(keyTest, function (err, reply) {
        if (err) {
          throw err;
        }

        console.log(reply);
      });
      break;

    
    default:
      throw `unexpected mode ${mode}`;
  }
}

handleMode();
