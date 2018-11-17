// Modules
module.exports = router = require('express').Router();

// Controllers
const organizationController = require('../controllers/organization');
const boardController = require('../controllers/board');

/**
* @desc get one Organization
* @param idOrganization
* @code 401 if organization is private and user logged out
* @code 403 if organization is private and user isn't member
* @code 404 if organization doesn't exist
*/
router.get('/:idOrganization([0-9a-fA-F]{24})', (req, res) => {
  const idOrganization = req.params.idOrganization ;
  const user = req.user ;
  // Delegate to controller;
  organizationController.findOne({ idOrganization }, user)
    .then( organization => res.json( organization ))
    .catch(error => error === organizationController.IS_PRIVATE && user ? res.status(401).json({error}) : Promise.reject(error))
    .catch(error => error === organizationController.IS_PRIVATE && !user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
    .catch(error => console.error( error ) || res.sendStatus(500));
});


router.get('/:idOrganization([0-9a-fA-F]{24})/boards', (req, res) => {
    const idOrganization = req.params.idOrganization ;
    const user = req.user ;
    boardController.findByOrganization({ idOrganization }, user)
      .then(boards => res.json(boards))
      .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * 
 */
router.put('/:idOrganization([0-9a-fA-F]{24})', (req, res) => {
  let idOrganization = req.params.idOrganization;
  let upsertOrganization = { ...req.body, _id: idOrganization };
  let user = req.user;
  organizationController.upsert({ idOrganization, upsertOrganization }, user)
    .then(organization => res.json(organization))
    .catch(error => error === organizationController.NOT_ADMIN && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === organizationController.NOT_ADMIN && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});


router.put('/:idOrganization([0-9a-fA-F]{24})/members/:idMember', (req, res) => {
    let idOrganization = req.params.idOrganization;
    let idMember = req.params.idMember;
    let user = req.user;
    if (!user) {
      res.sendStatus(401);
    } else {
      organizationController.addMember({ idOrganization, idMember }, user)
        .then(organization => res.status(204))
        .catch(error => error === organizationController.NOT_ADMIN && !user ? res.status(401).json({ error }) : Promise.reject(error))
        .catch(error => error === organizationController.NOT_ADMIN && user ? res.status(403).json({ error }) : Promise.reject(error))
        .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
        .catch(error => console.error(error) || res.sendStatus(500));
    }
});




router.post('/', (req, res) => {
    let idOrganization = req.params.idOrganization;
    let createdOrganization = req.body;
    let user = req.user;
    organizationController.create({ idOrganization, createdOrganization }, user)
      .then(organization => res.json(organization))
      .catch(error => error === organizationController.NOT_ADMIN && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === organizationController.NOT_ADMIN && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => error === organizationController.INCOMPLETE_BODY ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  });

router.delete('/:idOrganization([0-9a-fA-F]{24})', (req, res) => {
    let idOrganization = req.params.idOrganization;
    let user = req.user;
    organizationController.disable({ idOrganization }, user)
      .then(organization => res.sendStatus(204))
      .catch(error => error === organizationController.NOT_ADMIN && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === organizationController.NOT_ADMIN && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
});
router.delete('/:idOrganization([0-9a-fA-F]{24})/members/:idMember', (req, res) => {
    let idOrganization = req.params.idOrganization;
    let idMember = req.params.idMember;
    let user = req.user;
    if(!user) {
      res.sendStatus(401);
    } else {
      organizationController.removeMember({idOrganization, idMember}, user)
        .then(organization => res.status(204))
        .catch(error => error === organizationController.NOT_ADMIN && !user ? res.status(401).json({ error }) : Promise.reject(error))
        .catch(error => error === organizationController.NOT_ADMIN && user ? res.status(403).json({ error }) : Promise.reject(error))
        .catch(error => error === organizationController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
        .catch(error => console.error(error) || res.sendStatus(500));
    }
});

router.delete('/:idOrganization([0-9a-fA-F]{24})/members/:idMember/all');

