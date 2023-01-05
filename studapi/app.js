const koa = require('koa');
const cors = require('@koa/cors');
const {koaBody} = require('koa-body');


const app = new koa();

let stud = require('./studdata.js');

app.use(koaBody());
app.use(cors());
app.use(stud.routes()).use(stud.allowedMethods());

app.listen(3001, function() {
    console.log("Server Started At : http://localhost:30001/students");
});

const mongo = new koa();

const mongostud = require('./mongorouter');

mongo.use(cors());
mongo.use(mongostud.routes()).use(mongostud.allowedMethods);
mongo.listen(3002, () => console.log('http://localhost:3002/students'));