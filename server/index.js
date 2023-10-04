const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sandeep@2000',
    database: 'signup',
    port: '3306',
    multipleStatements: true
});

// Establish database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(cors());
app.use(express.json());

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.status(200).send(result);
        }
    });
});

app.post('/api/insert', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const sqlInsert = "INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
    
    db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send("Error inserting data into the database");
        } else {
            console.log('Data inserted successfully');
            res.status(200).send("Data inserted successfully");
        }
    });
});


const allData=`SELECT * FROM user`;
db.query(allData,(err,result)=>{
if(err) throw err;
console.log(result);
})


app.listen(3001, () => {
    console.log("App running on port 3001");
});
