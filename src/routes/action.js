// Modules
module.exports = router = require('express').Router();

// Controller
const action = require('../controllers/action');

router.get('/types', (req, res) => (
  action.findAllTypes()
  .then( actionTypes => res.json(actionTypes))
  .catch( error => console.error(error) || res.sendStatus(500))
));

