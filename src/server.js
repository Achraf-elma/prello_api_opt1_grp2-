require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require("./db/mongodb");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/oauth',
    cors({
        allowedHeaders:['Content-Type', 'Authorization'],
    }),
    require("./routes/oauth")
);

app.get('/', function(req, res){
    res.end('Hello World')
});
app.listen(process.env.DOKKU_DOCKERFILE_PORTS||3000, () => console.log("Server is Running !"));
