console.log("app is loading ...");

const redis = require("redis");

const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.get("test", function(err,reply){
    if(err){
        throw err;
    }

    console.log(reply);
});
