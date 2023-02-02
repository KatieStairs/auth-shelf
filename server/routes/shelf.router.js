const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); 
// Not sure if I need this 
/**
 * Get all of the items on the shelf
 */

// router.get('/', rejectUnauthenticated, (req, res) => {
//   let clearance_level = req.user.clearance_level;
//   // what is the value of req.user????
//   console.log('req.user:', req.user);
//   if(req.user.clearance_level < 3 ){
//     console.log('you got it adam!');
//   }

//   const sqlQuery =`
//   SELECT * FROM "secret"
//   WHERE "secrecy_level"<=$1
//   ORDER BY "id";
//   `

//   const sqlValues = [clearance_level];

//   pool.query(sqlQuery, sqlValues)

//   // pool
//     // .query(`SELECT * FROM "secret"
//     // WHERE "clearance_level"=$1
//     // ORDER BY "id";`)

//     // const sqlValues = [currentUserId];

//     .then((results) => res.send(results.rows))
//     .catch((error) => {
//       console.log('Error making SELECT for secrets:', error);
//       res.sendStatus(500);
//     });
// });

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  const sqlQuery =`
  SELECT * FROM "item";
  `
  pool.query(sqlQuery)

  .then((results) => res.send(results.rows))
  .catch((error => {
    console.log('Error making GET for item:', error);
    res.sendStatus(500);
  }))
});


// router.post('/', (req, res) => {
//   const newPlant = req.body;
//   const queryText = `
//     INSERT INTO plant
//       ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
//       VALUES
//       ($1, $2, $3, $4, $5, $6, $7)
//     `;
//   const queryValues = [
//     newPlant.name,
//     newPlant.kingdom,
//     newPlant.clade,
//     newPlant.order,
//     newPlant.family,
//     newPlant.subfamily,
//     newPlant.genus,
//   ];
//   pool.query(queryText, queryValues)
//     .then(() => { res.sendStatus(201); })
//     .catch((err) => {
//       console.log('Error completing SELECT plant query', err);
//       res.sendStatus(500);
//     });
// });

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const newItem = req.body;
  const queryText =`
  INSERT INTO item
  ("description", "image_url", "user_id")
  VALUES
  ($1, $2, $3)
  `
  const queryValues = [
    newItem.description,
    newItem.image_url,
    newItem.user_id
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error', err)
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('Req.params: ', req.params.id);

  const sqlQuery = `
    DELETE FROM "item"
    WHERE "id" = $1;
    `;
  pool.query(sqlQuery, [req.params.id])
  .then((response) => {
    console.log('NAILED IT!!!!!', response.body);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error: ', error);
    res.sendStatus(500);
  })


  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
