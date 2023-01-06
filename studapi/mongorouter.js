const Router = require('koa-router');
<<<<<<< HEAD
const { getAllStudents, insertStudent, updateStudent, deleteStudent } = require('./Mongo/MongoDatabase');
=======
const {GetUsers, insertAccount, updateAccount, deleteAccount} = require('./mongo/MongoDatabase');
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87

const router = new Router({
    prefix: "/students"
});

router.get('/', async (ctx, next) => {
    ctx.body = await GetUsers();
    console.log(ctx.body);
})
//Insert New Document
router.post('/insert', async (ctx, next) =>{
    console.log(ctx.request.body);
    if(!ctx.request.body.id || !ctx.request.body.FirstName || !ctx.request.body.LastName || !ctx.request.body.Course)
    {
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
        var res = await insertAccount(ctx.request.body.id, ctx.request.body.FirstName, ctx.request.body.LastName,  ctx.request.body.Course);
        if(res)
        {
            console.log("Success Insert");
            ctx.body = "Successfully Added Account";
            ctx.response.status = 201;
        }
    }
    next();
});

<<<<<<< HEAD
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
=======
//Update Document
router.post('/update', async (ctx, next) => {
    console.log(ctx.request.body);
    if(!ctx.request.body.id || !ctx.request.body.FirstName || !ctx.request.body.LastName || !ctx.request.body.Course)
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87
    {
        console.log("Missing Fields");
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
<<<<<<< HEAD
        var res = await updateStudent(ctx.request.body.Lastname, ctx.request.body.Firstname, ctx.request.body.Course);
=======
        var res = await updateAccount(ctx.request.body.id, ctx.request.body.FirstName, ctx.request.body.LastName,  ctx.request.body.Course);
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Successful Update";
            console.log("Success Update");
        }

    }
    next();
});

<<<<<<< HEAD
//delete

=======
//Delete a Document
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87
router.post('/delete', async (ctx, next) =>{
    if(!ctx.request.body.id)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
    }
    else
    {
        console.log(ctx.request.body.id);
<<<<<<< HEAD
        var res = await deleteStudent(ctx.request.body.id);
=======
        var res = await deleteAccount(ctx.request.body.id);
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Account Deleted";
            console.log("Account Deleted");
        }
    }
    next();
})

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 431b696b4e85d03e753b13adbd88d1f9eda7cd87
