const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// CSV Writer Setup

const createProducts = function(fileName) {
  return createCsvWriter({  
    // path: __dirname + `/products/${fileName}.csv`,
    path: `/tmp/data/products/${fileName}.csv`,
    header: [
      {id: 'itemId', title: 'itemId'},
      {id: 'companyName', title: 'companyName'},
      {id: 'productName', title: 'productName'}
    ]
  });
}

const createReviews = function(fileName) {
  return createCsvWriter({  
    path: `/tmp/data/reviews/${fileName}.csv`,
    header: [
      {id: 'rating', title: 'rating'},
      {id: 'title', title: 'title'},
      {id: 'text', title: 'text'},
      {id: 'recommend', title: 'recommend'},
      {id: 'name', title: 'name'},
      {id: 'fit', title: 'fit'},
      {id: 'itemId', title: 'itemId'},
      {id: 'helpful', title: 'helpful'},
      {id: 'notHelpful', title: 'notHelpful'},
      {id: 'flag', title: 'flag'},
      {id: 'createdAt', title: 'createdAt'},
      {id: 'reviewId', title: 'reviewId'}
    ]
  });
}

// Generator

const generateData = (numOfProducts, maxReviews) => {
  
  fs.mkdirSync('/tmp/data/products/', {recursive: true});
  fs.mkdirSync('/tmp/data/reviews/', {recursive: true});

  const clearFiles = async function(directory) {
    await fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  }

  let fileName = 1,
      idStart = 1,
      idEnd = numOfProducts < 1000000 ? numOfProducts : 1000000;
  
  const runProducts = async function() {
    while (idEnd <= numOfProducts) {
      await createProducts(fileName).writeRecords(generateProducts(idStart,idEnd))
        .then(() => console.log(`Wrote ${idEnd} products...`));
      
      if (idEnd === numOfProducts) {
        idStart = 1;
        idEnd = numOfProducts < Math.floor(1000000 * 2 / maxReviews) ? numOfProducts : Math.floor(1000000 * 2 / maxReviews);
        fileName = 1;
        break;
      } else {
        fileName++;
        idStart = idEnd + 1;``
        idEnd = idEnd + 1000000 < numOfProducts ? idEnd + 1000000 : numOfProducts
      }
    }
  }

  const runReviews = async function() {
    while (idEnd <= numOfProducts) {
      await createReviews(fileName).writeRecords(generateReviews(idStart, idEnd, maxReviews))
        .then(() => console.log(`Wrote reviews for ${idEnd} products...`));
      
      if (idEnd === numOfProducts) {
        break;
      } else {
        fileName++;
        idStart = idEnd + 1;
        idEnd = idEnd + Math.floor(1000000 * 2 / maxReviews) < numOfProducts ? Math.floor(idEnd + 1000000 * 2 / maxReviews) : numOfProducts
      }
    }
  }

  let start;

  function timer() {
    let end = (new Date() - start) / 60000;
    console.info('Execution time: %dm', end);
  }
    
  clearFiles(__dirname + '/products')
    .then(() => clearFiles(__dirname + '/reviews'))
    .then(() => start = new Date())
    .then(() => runProducts())
    .then(() => timer())
    .then(() => start = new Date())
    .then(() => runReviews())
    .then(() => timer());
}

// Helper functions

const generateProducts = (itemIdStart, itemIdEnd) => {
  const products = [];
  for (let i = itemIdStart; i <= itemIdEnd; i++) {
    products.push(generateSampleItems(i))
  }
  return products;
}

let reviewId = 1;

const generateReviews = (itemIdStart, itemIdEnd, maxReviews) => {
  const reviews = [];
  for (let i = itemIdStart; i <= itemIdEnd; i++) {
    let randomAmt = generateNum(0, maxReviews),
        count = 0;
    while (count < randomAmt) {
      reviews.push(generateReview(i, reviewId));
      count++;
      reviewId++;
    }
  }
  return reviews;
}

const generateNum = function(low, high) {
  return low + Math.floor(Math.random() * (high + 1 - low));
}

const generateBoolean = () => {
  if (generateNum(0, 1) === 0) {
    return false;
  }
  return true;
}

const generateReview = (itemId, reviewId) => {
  return {
    rating: generateNum(1, 5),
    title: faker.lorem.words(),
    text: faker.lorem.sentence(),
    recommend: generateBoolean(),
    name: faker.name.firstName(),
    fit: generateNum(0, 5),
    itemId,
    helpful: generateNum(0, 30),
    notHelpful: generateNum(0, 30),
    flag: false,
    createdAt: faker.date.past(),
    reviewId
  }
}

const generateSampleItems = (itemId) => {
  return {
    itemId,
    companyName: faker.lorem.words(), //changed temporarily to avoid commas
    productName: faker.commerce.productName()
  }
}

// Parameter 1: Total primary records
// Parameter 2: Max reviews per item
generateData(1000, 15);