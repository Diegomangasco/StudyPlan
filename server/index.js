'use strict';

const PORT = 3001;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { validationResult, body, param } = require('express-validator');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const userDao = require('./dao/userDao');
const courseDao = require('./dao/courseDao');

const app = express();
app.use(morgan('common'));
app.use(express.json());

const PREFIX = '/api';


// set up and enable cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

  
// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await userDao.getUser(username, password)
    if(!user)
        return cb(null, false, 'Incorrect username or password.');
        
    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
});
  
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({error: 'Not authorized'});
}
  
app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


/*** User APIs ***/

// POST /api/sessions
// app.post(PREFIX+'/sessions', passport.authenticate('local'), (req, res) => {
//     res.status(201).json(req.user);
// });

//POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
        return next(err);
    if (!user) {
        return res.status(401).send(info);
    }
    req.login(user, (err) => {
        if (err)
        return next(err);
        
        return res.status(201).json(req.user);
    });
  })(req, res, next);
});
  
// GET /api/sessions/current
app.get(PREFIX+'/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);
    }
    else
        res.status(401).json({error: 'Not authenticated'});
});
  
// DELETE /api/session/current
app.delete(PREFIX+'/sessions/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});


/*** Courses APIs ***/
  
// GET /api/courses
app.get(PREFIX+'/courses',
    (request, response) => {
        courseDao.getAllCourses().then(
            (value) => response.status(200).json(value)
        ).catch(err => response.status(500).send({error: err}));
});

// GET /api/course/:cid
app.get(PREFIX+'/course/:cid', [
    param('cid').isNumeric(),
    param('cid').isLength({min:7, max:7})
    ],
    (request, response) => {
        console.log(request.params.cid);
        courseDao.getACourseById(request.params.cid).then(
            (value) => {
                response.status(200).json(value[0]);
            }
        ).catch(err => response.status(503).send({error: err}));
    }
);

// GET /api/user/courses
app.get(PREFIX+'/user/courses', isLoggedIn,
    (request, response) => {
        userDao.getUser()
        courseDao.getStudentCourses(request.user.id).then(
            (value) => response.status(200).json(value)
        ).catch(err => {
            console.log(err);
            response.status(500).send({error: err});
        });
});

// POST /api/user/studyPlan/:partTime
app.post(PREFIX+'/user/studyPlan/:partTime', isLoggedIn, 
    (request, response) => {
        courseDao.addNewStudyPlan(request.user.id, request.params.partTime).then(
            (value) => response.status(201).end()
        ).catch((err) => response.status(503).send({error: err}));
});

// DELETE /api/user/studyPlan
app.delete(PREFIX+'/user/studyPlan', isLoggedIn, 
    (request, response) => {
        courseDao.deleteStudyPlan(request.user.id, request.body).then(
            (value) => response.status(204).end()
        ).catch((err) => response.status(503).send({error: err}));
    }
)

// POST /api/user/update
app.post(PREFIX+'/user/update', isLoggedIn,
    (request, response) => {
        courseDao.updateStudyPlan(request.user.id, request.body[0], request.body[1]).then(
            (value) => response.status(201).end()
        ).catch((err) => response.status(503).send({error: err}));
    }
);

// RUN SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

module.exports = app;

