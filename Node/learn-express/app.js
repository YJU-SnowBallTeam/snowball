const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname,'public')));

console.log(__dirname)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));
app.set('view engine','html')
app.use('/', indexRouter);
app.use('/user', userRouter);

app.get('/login',(req,res)=>{
  return res.render('login/login')
})
app.get('/Community',(req,res)=>{
  return res.render('Community/Community')
})
app.get('/Schedule',(req,res)=>{
  return res.render('Schedule/Schedule')
})
app.get('/register',(req,res)=>{
  return res.render('Register/signup')
})
app.get('/schedule',(req,res)=>{
  return res.render('Schedule/schedule')
})
app.get('/map',(req,res)=>{
  return res.render('MapFile/MapPage')
})


app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
