const addRefreshToken = `UPDATE sales_person
                   SET refresh_token = $1
                   WHERE id = $2 RETURNING *`;


const updateRefreshToken = `UPDATE sales_person
                      SET refresh_token = $1
                      WHERE id = $2 RETURNING *`;


const updatePassword = `UPDATE sales_person
                  SET password = $1 
                  WHERE id = $2 RETURNING *`;


module.exports = {
    addRefreshToken,
    updateRefreshToken,
    updatePassword
}

