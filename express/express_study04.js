const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

// client.on('error', (err) => {
//   console.log('Error ' + err);
// });

// client.on('connect', () => {
//   console.log('Redis is ready');
// });
// client.get('myKey', (err, value) => {
//     console.log('value: ', value);
// });
async function run() {

  await client.connect();

  const result = await client.get("myKey", (err, value) => {
    // console.log(value);
  });

  console.log(result);

  await client.disconnect();
};

run();

// client.on('end', () => {
//   console.log('Client disconnected');
// });


// client.connect();
// client.get('myKey', (err, value) => {
//     console.log('value: ', value);
// });