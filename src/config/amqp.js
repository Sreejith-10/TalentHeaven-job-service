import amqp from "amqplib/callback_api.js";
import dotenv from "dotenv";

dotenv.config();

let queue = "job_service_queue";
export let channel = null;
let q = null;

const routingKeys = ["USER_PREFERENCES_REPLY", "USER_DATA", "USER_DATA_REPLY"];

export const createConnectionMQ = () => {
  amqp.connect(process.env.AMQP_URL, async (err0, connection) => {
    if (err0) {
      throw new Error(err0);
    }
    channel = await connection.createChannel();
    await channel.assertExchange(queue, "direct", { durable: false });
    q = await channel.assertQueue("", { exclusive: true });

    routingKeys.forEach((route) => {
      channel.bindQueue(q.queue, queue, route);
    });
  });
};

export const sendToQueue = async (key, data) => {
  let msg = JSON.stringify(data);
  await channel.publish(queue, key, Buffer.from(msg));
  console.log(`Sent : ${data} to queue:${queue}`);
  // setTimeout(() => {
  // 	connection.close();
  // 	process.exit(0);
  // }, 500);
  return;
};

export const listenToQueue = (route) => {
  return new Promise((resolve) => {
    channel.consume(
      q.queue,
      (msg) => {
        const key = msg.fields.routingKey;

        if (key === route) {
          const data = JSON.parse(msg.content.toString());
          resolve(data);
        }
      },
      { noAck: true },
    );
  });
};
