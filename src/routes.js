var indexRouter = require('../routes/index');
var signUpRouter = require('../routes/signup');
var signInRouter = require('../routes/signin');
var categoryRouter = require('../routes/category');
var dishRouter = require('../routes/dishes');
var userRouter = require('../routes/users');
var Auth = require('../routes/auth');
var authMiddleware = require('../middleware/auth');

module.exports = (app)=>{
    app.use('/signup', signUpRouter);
    app.use('/signin', signInRouter);
    app.use('/users', userRouter);
    app.use(authMiddleware);
    app.use('/', indexRouter);
    app.use('/category', categoryRouter);
    app.use('/dishes', dishRouter);
    app.use('/check-auth', Auth);
}