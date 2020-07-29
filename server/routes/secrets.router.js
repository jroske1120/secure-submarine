const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('req.user:', req.user);
        let query = `SELECT * FROM secret WHERE secrecy_level < $1;`;
    pool.query(query, [req.user.clearance_level])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else {
            res.sendStatus(403);

        }
});

module.exports = router;