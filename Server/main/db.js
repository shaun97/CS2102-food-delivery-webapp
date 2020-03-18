const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moodpandadb',
  password: '',
  port: 5432
})

module.exports = pool
