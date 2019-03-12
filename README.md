# HRR36 SDC Team 3 beaREI - Reviews Module

This repo includes the Reviews service of Team 3's System Design Capstone project.

## Related Projects

  - https://github.com/bearei

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

1. Ensure that mariaDB is installed and running on your computer.
2. [Install the project's dependencies](#installing-dependencies).
3. To generate seed data, open /server/db/data/generate.js and modify the last line with the number of seeds you want.  Then run `npm run makeData` to generate CSVs.
4. Once CSVs are generated, run `npm run seed` to write to database.
5. To update client URL, navigate to /client/index.jsx and update URL in component's `this.url`.
6. Navigate to `http://localhost:3003` to view the service.
7. For stress test, run `npm run stresstest`.  This will write reviews to for itemId = 2 (endpoint `/2`).  To clear test rows in mariadb, run from shell: "DELETE FROM reviews where itemId = 2;"

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

