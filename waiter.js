
const Queue = require('bee-queue');

const options = {
    removeOnSuccess: true,
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}

const cookQueue = new Queue('cook', options);
const serveQueue = new Queue('serve', options);


const placeOrder = (order) => {
    return cookQueue.createJob(order).save();
};

serveQueue.process((job, done) => {
    console.log(`๐งพ ${job.data.qty}x ${job.data.dish} ready to be served ๐`);
    // Notify the client via push notification, web socket or email etc.
    done();
})
// Notify the client via push notification, web socket or email etc.

module.exports.placeOrder = placeOrder;