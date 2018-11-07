// Modules
const router = require('express').Router();

// Controllers
const teamController = require('../controllers/team');

/**
* @desc get one Team
* @param idTeam
* @code 401 if team is private and user logged out
* @code 403 if team is private and user isn't member
* @code 404 if team doesn't exist
*/
router.get('/:idTeam', (req, res) => {
    const idTeam = req.params.idTeam ;
    const user = req.user ;
    
    // Delegate to controller;
    teamController.findOne({ idTeam }, user)
    .then( team => res.json( team ))
    .catch(error => error === teamController.IS_PRIVATE && user ? res.status(401).json({error}) : Promise.reject(error))
    .catch(error => error === teamController.IS_PRIVATE && !user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === teamController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
    .catch(error => console.error( error ) || res.sendStatus(500));
});



router.get('/:idTeam/:field');
router.get('/:idTeam/boards');
router.get('/:idTeam/members');
router.get('/:idTeam/members/:filter');
router.get('/:idTeam/membersInvited');
router.get('/:idTeam/memberships');
router.get('/:idTeam/memberships/:idMembership');
router.get('/:idTeam/pluginData');
router.get('/:idTeam/tags');


router.put('/:idTeam');
router.put('/:idTeam/members');
router.put('/:idTeam/members/:idMember');
router.put('/:idTeam/members/:idMember/deactivated');


router.post('/');
router.post('/:idTeam/logo');
router.post('/:idTeam/tags');

router.delete('/:idTeam');
router.delete('/:idTeam/logo');
router.delete('/:idTeam/members/:idMember');
router.delete('/:idTeam/members/:idMember/all');
router.delete('/:idTeam/pref/orgInviteRestrict');
router.delete('/:idTeam/tags/:idTag');


///organizations/{id}/prefs/associatedDomain
///organizations/{id}/newBillableGuests/{idBoard}
