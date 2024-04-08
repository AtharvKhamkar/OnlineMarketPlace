const { Pool } = require("pg")

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '271185',
    port: '5432',
    database:'sales_db2'
})

module.exports = pool;