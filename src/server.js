const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL database connected successfully');
  }
});

app.post('/api/submitFeedback', (req, res) => {
  const {
    name,
    address,
    email,
    identification,
    cardNumber,
    phone,
    checkboxValues,
  } = req.body;

  const sql = `
    INSERT INTO feedback_data (name, address, email, identification, cardNumber, phone, checkboxValues)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, address, email, identification, cardNumber, phone, JSON.stringify(checkboxValues)],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
