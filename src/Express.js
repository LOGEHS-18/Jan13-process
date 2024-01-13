import express from 'express';
import { json } from 'body-parser';
import { createConnection } from 'mysql';
const app = express();
const port = 3306;

app.use(json());

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Logesh1@',
  database: 'mydatabase',
});

app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, password, allowExtraEmails } = req.body;

  const query = 'INSERT INTO users (first_name, last_name, email, password, receive_emails) VALUES (?, ?, ?, ?, ?)';
  const values = [firstName, lastName, email, password, allowExtraEmails === 'true'];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
