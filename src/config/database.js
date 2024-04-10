const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl:true
})



module.exports = pool;