const getAllProducts = `SELECT pt.name AS type, p.name, p.supplier, p.description
                        FROM product AS p
                        INNER JOIN product_type AS pt
                        ON p.type_id = pt.id`;

                        
const getProduct = `SELECT pt.name AS type, p.name, p.supplier, p.description
                    FROM product AS p
                    INNER JOIN product_type AS pt
                    ON p.type_id = pt.id 
                    WHERE p.id = $1`;

module.exports = { getAllProducts,getProduct };