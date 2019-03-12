const mariadb = require('mariadb');

module.exports = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user:'root', 
  database: 'bearei_reviews'
});

module.exports.pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user:'root', 
  database: 'bearei_reviews'
});