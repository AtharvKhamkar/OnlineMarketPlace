const getAllProducts = `SELECT p.id,(SELECT name FROM product_type WHERE id = p.type_id) AS type, p.name, p.supplier, p.description, 
                               i.size, i.color, i.picture, i.price 
                        FROM product p
                        INNER JOIN item i
                        ON p.id = i.product_id
                        ORDER BY p.id ASC;
`

                        
const getProduct = `SELECT p.id,(SELECT name FROM product_type WHERE id = p.type_id) AS type, p.name, p.supplier, p.description, 
                            i.size, i.color, i.picture, i.price 
                    FROM product p
                    INNER JOIN item i
                    ON p.id = i.product_id
                    WHERE p.id = $1
                    ORDER BY p.id ASC;`

module.exports = { getAllProducts, getProduct };


