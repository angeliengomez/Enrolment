const koa = require('koa');
const cors = require('@koa/cors');
const {koaBody} = require('koa-body');
const bodyParser = require('koa-bodyparser');


const app = new koa();

let stud = require('./studdata.js');

app.use(koaBody());
app.use(cors());
app.use(stud.routes()).use(stud.allowedMethods());

app.listen(3001, function() {
    console.log("Server Started At : http://localhost:3001/students");
});

const mongo = new koa();

mongo.use(bodyParser());
mongo.use(cors());

const mongorouter = require('./MongoRouter');
mongo.use(mongorouter.routes()).use(mongorouter.allowedMethods);

mongo.listen(3002, function(){console.log("http://localhost:3002/users")});