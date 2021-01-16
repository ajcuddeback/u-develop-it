const sqlite3 = require('sqlite3').verbose();
const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.')
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Default response for any other request(Not Fount) - Catch all
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
});