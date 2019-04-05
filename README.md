# HREI - Reviews Module Database

This repo is the database for the Reviews service for beaREI, a outdoor wear product retail page.  To run, you must separately install and run the front-end for this service at https://github.com/bearei/fec4-reviews.  

This service was seeded with 10 million primary records and 50 million secondary records to determine the best database solution and optimize query times. I optimized this service through reducing middleware - this lead to an average network latency for combined GET and POST requests of 5-7ms as tested using Loader.io and New Relic by reducing middleware; data generation and insertion was also reduced from ~4 hours to 15 minutes. The backend was created with Express and MariaDB and the service is currently deployed on AWS EC2. The tech stack tested but not used in final product include Sequelize and Apache Cassandra. The legacy front end code was created using React. This page was originally served on a proxy page which included product description/checkout and related products services.

This project is currently deployed at http://3.16.21.170:3003/shopping/1/.  To view additional product reviews, visit endpoints up to /10000000.

## Related Projects

  - https://github.com/bearei/fec4-reviews - For the required front-end service
  - https://github.com/bearei - For proxy server and additional services

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)

## Usage

1. Ensure that mariaDB is installed and running on your computer.
2. [Install the project's dependencies](#installing-dependencies).
3. Install and run the front-end service at https://github.com/bearei/fec4-reviews.
4. To generate seed data, open /server/db/data/generate.js and modify the last line with the number of seeds you want.  Then run `npm run makeData` to generate CSVs.
5. Once CSVs are generated, run `npm run seed` to write to database.
6. Navigate to `http://localhost:3004` to view the service.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

