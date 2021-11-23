const amqp = require('amqplib');

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:56721');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('jobs');
        channel.consume('jobs', message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input: ${input.number}`);
            if (input.number === 2) {
                channel.ack(message);
            }
        });
        console.log('Waiting for messages...');
    } catch (e) {
        console.error(e);
    }
}

connect();