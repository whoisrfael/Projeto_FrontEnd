const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('tasks.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    completed INTEGER
  )`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY id', (err, rows) => {
    res.render('index', { tasks: rows });
  });
});

app.post('/add', (req, res) => {
  const description = req.body.description;
  db.run('INSERT INTO tasks (description, completed) VALUES (?, ?)', description, 0, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', id, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

app.post('/complete/:id', (req, res) => {
  const id = req.params.id;
  db.run('UPDATE tasks SET completed = 1 WHERE id = ?', id, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
