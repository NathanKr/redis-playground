console.log("app is loading ...");
const redis = require("redis"),
  keyTest = "test";

const client = redis.createClient();

class RedisList {
  constructor(redisClient, key) {
    this.redisClient = redisClient;
    this.key = key;
  }

  pushLeft (stringValue){
    return new Promise((resolve, reject) => {
      client.lpush(this.key,stringValue,(err, result) => {
        if (err) {
          return reject(err);
        }

        //Integer reply: the length of the list after the push operation
        return resolve(result); 
      });
    });
  }

  getQueue (){
    return new Promise((resolve, reject) => {
      client.lrange(this.key,0,-1,(err, result) => {
        if (err) {
          return reject(err);
        }

        // Array reply: list of elements in the specified range.
        return resolve(result); 
      });
    });
  }
}

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

let oRedisQueue = new RedisList(client, "xyz123");

async function run(){
  console.log(await oRedisQueue.pushLeft("1"));
  console.log(await oRedisQueue.pushLeft("2"));
  console.log(await oRedisQueue.pushLeft("3"));
  console.log((await oRedisQueue.getQueue()).length);
}

run();