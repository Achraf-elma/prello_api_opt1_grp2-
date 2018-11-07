const express = require("express");
const router = express.Router();
const listController = require("../controllers/list")

/*************************** GET ***************************/




/*************************** PUT ***************************/


/**
* Update a list given its id
*/
router.put("/{id}", (req, res) => {
    res.send("id");
});

/**
* Archive or unarchive a list given its id
*/
// TODO CHECK 
router.put("/{id}/closed", (req, res) => {
    res.send("id/closed");
});


/**
* Move list to a new board 
*/
router.put("/{id}/{idboard}", (req, res) => {
    res.send("id/idBoard");
});


/**
* rename list 
*/
router.put("/{id}/name", (req, res) => {
    res.send("id/name");
});

/**
* change position of a list
*/
router.put("/{id}/pos", (req, res) => {
    res.send("id/pos");
});

/**
* subscribe or unsubscribe from a list
*/
router.put("/{id}/subscribed", (req, res) => {
    res.send("id/subscribed");
});




/*************************** POST ***************************/

/**
* Create a new list
*/
router.post("/", (req, res) => {
    res.send("create new list");
});

/**
* Archive card of a given list
*/
router.post("/{id}/archiveAllCards", (req, res) => {
    res.send("Archive all cards of a list");
});

/**
* move all cards of a given list
*/
router.post("/{id}/moveAllCards", (req, res) => {
    res.send("Move all cards of a list");
});

module.exports = router;