// db/migrate.js
// Run: node db/migrate.js
// Applies schema.sql to your PostgreSQL database

require('dotenv').config()
const { Pool } = require('pg')
const fs       = require('fs')
const path     = require('path')

const ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl })

async function migrate() {
  console.log('Running migrations...')
  try {
    await pool.query(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'))
    console.log('✓ schema.sql')
    await pool.query(fs.readFileSync(path.join(__dirname, 'intelligence.sql'), 'utf8'))
    console.log('✓ intelligence.sql')
    console.log('✓ Migration complete')
  } catch (err) {
    console.error('✗ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
