// For creating .sql files

let count = 1;

for (let i = 0; i <= 76; i++) {
  console.log(`COPY bearei_db.products (rating, title, text, recommend, name, fit, "itemId", helpful, "notHelpful", flag, "createdAt") FROM '/Users/thomashsu/Dropbox/HRR36/fec4-reviews/server/db/data/reviews/${count}.csv' WITH HEADER = TRUE;`)
  count++;
}