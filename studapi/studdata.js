const Router = require('koa-router');

let id = 1;

let students = [
    { id: id++, LastName: 'Gomez', FirstName: 'Angelien', Course: 'BSIT', edit: false },
    { id: id++, LastName: 'Gomez', FirstName: 'Hatdog', Course: 'BSIT', edit: false },
    { id: id++, LastName: 'Gomez', FirstName: 'Sample', Course: 'BSIT', edit: false }
];

const router = new Router({
    prefix: '/students'
});

router.get('/', (ctx, next) => {
    ctx.body = students;
    console.log(ctx.body);
    next();
});

//POst for CRUD of CRUD

router.post('/create', (ctx, next) => {
    if(!ctx.request.body.LastName || !ctx.request.body.FirstName || !ctx.request.body.Course)
    {
        //404 Error : 201 Success
        ctx.response.status = 404;
        console.log("Missing Fields");
    }
    else
    {
        students.push({ id: id++, LastName: ctx.request.body.LastName, FirstName: ctx.request.body.FirstName, Course: ctx.request.body.Course, edit:false });
        ctx.response.status = 201;
        console.log("Successful Insert");
    }
    next();
});
router.post('/delete', (ctx, next) => {
    console.log(ctx.request.body);
    if(!ctx.request.body.id)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
        console.log("Missing Fields");
    }
    else
    {
        var index = students.findIndex(x => x.id == ctx.request.body.id);
        console.log(index)
        students.splice(index, 1);
        ctx.response.status = 201;
        ctx.body = "student Deleted";
        console.log("Student Deleted");
    }
    next();
});
    router.post('/update', (ctx, next) => {
        if(!ctx.request.body.LastName || !ctx.request.body.FirstName || !ctx.request.body.Course || !ctx.request.body.id)
        {
            ctx.response.status = 404;
            ctx.body = "Missing Fields";
            console.log("Missing Fields");
        }
        else
        {
            ctx.response.status = 201;
            ctx.body = "Student Updated";
            var index = students.findIndex(x => x.id == ctx.request.body.id);
            students[index].LastName = ctx.request.body.LastName;
            students[index].FirstName =ctx.request.body.FirstName;
            students[index].Course = ctx.request.body.Course;
            console.log("Student Updated");
        }
        next();
});

module.exports = router;