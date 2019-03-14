const db = require('./index');

module.exports.findReview = function(req, res) {
  db
    .then(conn => {
      conn.query(`SELECT * FROM reviews WHERE itemId = ${req.params.itemId}`)
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
    })
};

module.exports.findItem = function(req, res) {
  db.then(conn => {
    conn.query(`SELECT * FROM products WHERE itemId = ${req.params.itemId}`)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  }) 
};

module.exports.markHelpful = function(req, res) {
  db.then(conn => {
    conn.query(`UPDATE reviews SET helpful = helpful + 1 WHERE reviewId = ${req.params.reviewId}`)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  }) 
}
;
module.exports.markUnhelpful = function(req, res) {
  db.then(conn => {
    conn.query(`UPDATE reviews SET helpful = helpful - 1 WHERE reviewId = ${req.params.reviewId}`)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  }) 
};

module.exports.flag = function(req, res) {
  db.then(conn => {
    conn.query(`UPDATE reviews SET flag = true WHERE reviewId = ${req.params.reviewId}`)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  }) 
};

module.exports.createReview = function(req, res) {
  console.log(res.body)
  db.then(conn => {
    conn.query(`INSERT INTO reviews (rating, title, text, recommend, name, fit, itemId, createdAt) VALUES (${req.body.rating}, '${req.body.title}', '${req.body.text}', ${req.body.recommend}, '${req.body.name}', ${req.body.fit}, ${req.body.itemId}, '${Date().toString()}')`)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  })
};

// Unused in client
module.exports.delete = function(req, res) {
  db.then(conn => {
    conn.query(`DELETE FROM reviews where reviewId = ${req.body.reviewId};`)
    .catch(err => console.log(err))
  }) 
};


