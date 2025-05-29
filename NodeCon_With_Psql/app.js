// app.js
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    const data = result.rows[0];
    res.json({
        'date': data,
        'endpoints': {
            'student': '/students',
            'staf': '/stafs',
            'professors': '/professors',
            'professorsDetail': '/professorsDetail',
            '/students/:id':'/students/:id'
        }
    })
});

app.get('/students', async (req, res) => {
    const result = await pool.query('select * from people.students')
    res.json(result.rows)
    // console.log(result.rows)
})

app.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT * FROM people.students WHERE id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/stafs', async (req, res) => {
    const result = await pool.query('select * from people.stafs')
    res.json(result.rows)
    // console.log(result.rows)
})

app.get('/professors', async (req, res) => {
    const result = await pool.query('select * from people.professors')
    res.json(result.rows)
    // console.log(result.rows)
})

app.get('/professorsDetail', async (req, res) => {
    const result = await pool.query('select p.id, p."name" as professor_name,d."name" dept_name,d.building from people.professors p left join university.departments d on p.department_id = d.id ;')
    res.json(result.rows)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






