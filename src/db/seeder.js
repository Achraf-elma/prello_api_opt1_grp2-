const mockUser = require('../fakeData/user.json');
const mockOrganization = require('../fakeData/organization.json');
const mockBoard = require('../fakeData/board.json');
const mockList = require('../fakeData/list.json');
const mockCheckListItem = require('../fakeData/checkListItem.json');


const Action = require('../models/Action');
const Board = require('../models/Board');
const Card = require('../models/Card');
const CheckList = require('../models/CheckList');
const CheckListItem = require('../models/CheckListItem');
const List = require('../models/List');
const Notification = require('../models/Notification');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Label = require('../models/Label');



module.exports = {

    dropDatabase: async() => {
        console.log("Dropping databases");
        await User.deleteMany()
        .then(() => console.log("Database dropped"))
        .catch(error => console.log(error)); 
    },
    
    initDatabase: async() => {
        console.log("Initializing databases");
        await Promise.all(mockUser.map(
            async data => new User(data).save()
        ))
        .then(() => console.log("Database filled"))
        .catch(error => console.log(error));
    },

    seed: async() => {
        await (async() => {
            console.log("Dropping databases");
            await User.deleteMany()
            .then(() => console.log("User dropped"))
            .catch(error => console.log(error)); 
            await Organization.deleteMany()
            .then(() => console.log("Organization dropped"))
            .catch(error => console.log(error));
            await Board.deleteMany()
            .then(() => console.log("Board dropped"))
            .catch(error => console.log(error));
            /*await List.deleteMany()
            .then(() => console.log("List dropped"))
            .catch(error => console.log(error));
            await CheckListItem.deleteMany()
            .then(() => console.log("CheckListItem dropped"))
            .catch(error => console.log(error));*/
        })().then(console.log("Database dropped"));
        await (async() => {
                console.log("Initializing databases");
                await Promise.all(mockUser.map(
                    async data => User.insertMany(data).then(() => console.log("user saved"))
                                                        .catch(err => console.log(err))
                ))
                .then(() => console.log("User filled"))
                .catch(error => console.log(error));
                await Promise.all(mockOrganization.map(
                    async data => new Organization(data).save().then(() => console.log("organization saved"))
                                                                .catch(err => console.log(err))
                ))
                .then(() => console.log("Organization filled"))
                .catch(error => console.log(error));
                await Promise.all(mockBoard.map(
                    async data => new Board(data).save().then(() => console.log("board saved"))
                                                        .catch(err => console.log(err))
                ))
                .then(() => console.log("Board filled"))
                .catch(error => console.log(error));
                /*await Promise.all(mockList.map(
                    async data => new List(data).save()
                ))
                .then(() => console.log("List filled"))
                .catch(error => console.log(error));
                await Promise.all(mockCheckListItem.map(
                    async data => new CheckListItem(data).save()
                ))
                .then(() => console.log("CheckListItem filled"))
                .catch(error => console.log(error));*/
            })().then("Database filled");
        
    }

}
