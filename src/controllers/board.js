const boardModel = require('../models');
const requestError = require('../util/errorHandler');
//TOD:
/**
* find board by date of last update
*/

/**
* find lists of a board
*/

/**
* find by users
*/

/**
* find public board 
*/

const boardControler = {
    create: function (data)  {
        try{
            const board = new Board(
                data.description,
                data.name,
                data.idMembers,
                data.idTeams,
                data.isPublic,
                data.owners,
                data.isClosed);
            board.save;
                return board;
            }
            catch (err) {
                //check if error of field or server error
                if(err.status){
                    throw err;
                }
                throw new requestError(500, 'Internal server error');
                
            }
        }, 



    }