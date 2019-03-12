const db = require('./cassandra-index');
const fs = require('file-system');

db.connect(function (err) {
  if (err) {
    console.log(err);
  };
});

const exec = (query) => {
  db.execute(query, function (err) {
    if (err) {
      console.log(err);
    };
  });
}



async function writeAll() {

  // const dropReviews = 'DROP TABLE IF EXISTS bearei_db.reviews',
  //     dropProducts = 'DROP TABLE IF EXISTS bearei_db.products';

  // await exec(dropReviews);
  // await exec(dropProducts);

  // const createProducts = 'CREATE TABLE bearei_db.products ("itemId" int PRIMARY KEY, "companyName" varchar, "productName" varchar);'
  // const createReviews = 'CREATE TABLE bearei_db.reviews (rating tinyint, title varchar, text varchar, recommend boolean, name varchar, fit tinyint, "itemId" int, helpful tinyint, "notHelpful" tinyint, flag boolean, "createdAt" date, productID UUID PRIMARY KEY);'

  // await exec(createProducts);
  // await exec(createReviews);

  function listFiles(directory) {
    return new Promise((resolve) => {
      resolve(fs.readdirSync(__dirname + directory));
    })
  }
  
  let productList = await listFiles('/data/products'),
      reviewList = await listFiles('/data/reviews'),
      productPath = __dirname + '/data/products/',
      reviewPath = __dirname + '/data/reviews/';

  for (let i = 0; i < productList.length; i++) {
    let writeProduct = `COPY bearei_db.products ("itemId", "companyName", "productName") FROM '${productPath + productList[i]}' WITH HEADER = TRUE`;
    await exec(writeProduct);
  }
  
  // for (let i = 0; i < reviewList.length; i++) {
  //   let writeReview = ``;
  //   await exec(writeReview);
  // }
}

writeAll();
