// Modules
const router = require('express').Router();

// Controllers
const organizationController = require('../controllers/organization');

/**
* @desc get one Organization
* @param idOrganization
* @code 401 if organization is private and user logged out
* @code 403 if organization is private and user isn't member
* @code 404 if organization doesn't exist
*/
router.get('/:idOrganization', (req, res) => {
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



router.get('/:idOrganization/:field');
router.get('/:idOrganization/boards');
router.get('/:idOrganization/members');
router.get('/:idOrganization/members/:filter');
router.get('/:idOrganization/membersInvited');
router.get('/:idOrganization/memberships');
router.get('/:idOrganization/memberships/:idMembership');
router.get('/:idOrganization/pluginData');
router.get('/:idOrganization/tags');


router.put('/:idOrganization');
router.put('/:idOrganization/members');
router.put('/:idOrganization/members/:idMember');
router.put('/:idOrganization/members/:idMember/deactivated');


router.post('/');
router.post('/:idOrganization/logo');
router.post('/:idOrganization/tags');

router.delete('/:idOrganization');
router.delete('/:idOrganization/logo');
router.delete('/:idOrganization/members/:idMember');
router.delete('/:idOrganization/members/:idMember/all');
router.delete('/:idOrganization/pref/orgInviteRestrict');
router.delete('/:idOrganization/tags/:idTag');


///organizations/{id}/prefs/associatedDomain
///organizations/{id}/newBillableGuests/{idBoard}
