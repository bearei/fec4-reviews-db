const cassandra = require('cassandra-driver');

db = new cassandra.Client({ 
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1'
});

let query = 'SELECT * FROM bearei_db.reviews WHERE "itemId" = 1;';

const exec = (query) => {
  db.execute(query, function (err, success) {
    if (err) {
      console.log(err);
    } else { 
      console.log(success);
    }
  });
}

exec(query);

// CREATE INDEX review_itemId ON bearei_db.reviews ("itemId");