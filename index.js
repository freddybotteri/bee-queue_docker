require('dotenv').config();
const express = require('express');
const http = require('http');
require('./kitchen');
const { placeOrder } = require('./waiter');

// Inits
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send("😋 We are serving freshly cooked food 🍲");
});

app.post('/order', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty,
        orderNo: Date.now().toString(36)
    }

    if (order.dish && order.qty) {
        placeOrder(order)
            .then(() => res.json({ done: true, message: "Your order will be ready in a while" }))
            .catch(() => res.json({ done: false, message: "Your order could not be placed" }));
    } else {
        res.status(422);
    }
})


// Create and start the server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Restaurant open at:${PORT}`);
});