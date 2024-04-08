const addRefreshToken =`UPDATE customer 
                        SET refresh_token = $1
                        WHERE email=$2 RETURNING *`;

const removeRefreshToken = `UPDATE customer
                            SET refresh_token = $1
                            WHERE id = $2 RETURNING *`;

module.exports = { addRefreshToken,removeRefreshToken };