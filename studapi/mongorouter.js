const Router = require('koa-router');
const { getAllStudents } = require('./Mongo/MongoDatabase');

const router = new Router({
    prefix: '/students'
});


router.get('/',(ctx, next) => {
    ctx.body = getAllStudents();
    console.log("Get All Student Data")
    next();
});

module.exports = router;
