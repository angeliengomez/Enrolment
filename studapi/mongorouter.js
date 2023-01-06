const Router = require('koa-router');
const { getAllStudents, insertStudent, updateStudent, deleteStudent } = require('./Mongo/MongoDatabase');

const router = new Router({
    prefix: '/students'
});


router.get('/',(ctx, next) => {
    ctx.body = getAllStudents();
    console.log("Get All Student Data")
    next();
});

//insert
router.post('/insert', async (ctx, next)=>{
    console.log("Router Data : " + ctx.request.body);
    if(!ctx.request.body.Lastname || !ctx.request.body.Firstname || !ctx.request.body.Course)
    {
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
        var res = await insertStudent(ctx.request.body.Lastname, ctx.request.body.Firstname, ctx.request.body.Course);
        if(res)
        {
            console.log("Success Insert");
            ctx.body = "Successfully Added Student";
            ctx.response.status = 201;
        }
    }
    next();
});

//update

router.post('/update', async (ctx, next) => {
    if(!ctx.request.body.Lastname || !ctx.request.body.Firstname || !ctx.request.body.Course)
    {
        console.log("Missing Fields");
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
        var res = await updateStudent(ctx.request.body.Lastname, ctx.request.body.Firstname, ctx.request.body.Course);
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Successful Update";
            console.log("Success Update");
        }

    }
    next();
});

//delete

router.post('/delete', async (ctx, next) =>{
    if(!ctx.request.body.id)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
    }
    else
    {
        console.log(ctx.request.body.id);
        var res = await deleteStudent(ctx.request.body.id);
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Account Deleted";
            console.log("Account Deleted");
        }
    }
    next();
})

module.exports = router;
