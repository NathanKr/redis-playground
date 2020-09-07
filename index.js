console.log("app is loading ...");
const redis = require("redis"),
  keyTest = "test";

const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

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
