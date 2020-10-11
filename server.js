if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('App successfully connected to mongoose...');
});

app.get('/', (req, res, next) => {
    res.send('Hello!');
});

app.listen(port, () => console.log(`Server up and running on port ${port}...`));
