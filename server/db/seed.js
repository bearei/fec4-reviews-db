const db = require('./index');
const fs = require('file-system');

async function runSeed() {
  let conn;
  try {
    let start = new Date();

    function timer() {
      let end = (new Date() - start) / 60000;
      console.info('Execution time: %dm', end);
    }

    conn = await db.pool.getConnection();
    await conn.query('DROP TABLE IF EXISTS `products`')
      .catch((err) => console.log('DROP REVIEWS ERROR', err));
    await conn.query('CREATE TABLE `products` (`itemId` INTEGER NOT NULL,`companyName` CHAR(50) NOT NULL,`productName` CHAR(40) NULL, PRIMARY KEY (`itemId`));')
      .catch((err) => console.log('CREATE REVIEWS ERROR', err));
    await conn.query('DROP TABLE IF EXISTS `reviews`;')
      .catch((err) => console.log('DROP PRODUCTS ERROR', err));
    await conn.query('CREATE TABLE `reviews` (`rating` TINYINT NOT NULL,`title` CHAR(50) NOT NULL,`text` TEXT NULL DEFAULT NULL,`recommend` CHAR(5) NOT NULL,`name` CHAR(30) NULL DEFAULT NULL,`fit` TINYINT NULL DEFAULT NULL,`itemId` INTEGER NOT NULL,`helpful` TINYINT NULL DEFAULT 0,`notHelpful` TINYINT NULL DEFAULT 0, `flag` CHAR(5) NOT NULL DEFAULT false, `createdAt` CHAR(70) NULL DEFAULT NULL, `reviewId` INTEGER);')
      .catch((err) => console.log('CREATE PRODUCTS ERROR', err));
    await conn.query('CREATE INDEX review_itemId ON reviews (`itemId`);')
      .catch((err) => console.log('CREATE ITEMID INDEX ERROR', err));
    await conn.query('CREATE INDEX review_reviewId ON reviews (`reviewId`);')
      .catch((err) => console.log('CREATE REVIEWID INDEX ERROR', err));

    // Testing make director if not exists;
    await fs.mkdir('/tmp/data/products/', '-p', (err) => console.log(err));

    let productPath = '/tmp/data/products/',
        reviewPath = '/tmp/data/reviews/',
        productList = await listFiles(productPath),
        reviewList = await listFiles(reviewPath);

    for (let i = 0; i < productList.length; i++) {
      await conn.query(`LOAD DATA INFILE '${productPath + productList[i]}' INTO TABLE products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;`)
        .then((success) => console.log(`Wrote product file ${productPath + productList[i]}...`))
        .catch((err) => console.log(`ERROR WRITING PRODUCT FILES to ${productPath}`,  err));
    }

    for (let i = 0; i < reviewList.length; i++) {
      await conn.query(`LOAD DATA INFILE '${reviewPath + reviewList[i]}' INTO TABLE reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;`)
        .then((success) => console.log(`Wrote review file ${reviewList[i]}...`))
        .catch((err) => console.log(`ERROR WRITING REVIEW FILES TO ${reviewPath}`, err));
    }

  } catch (err) {
    throw err;
  } finally {
    timer();
    if (conn) return conn.end();
  }
}

function listFiles(directory) {
  return new Promise((resolve) => {
    resolve(fs.readdirSync(directory));
  })
}

runSeed();