'use strict';

const sqlite = require('sqlite3');

const database = new sqlite.Database('./database/studyPlanDB.sqlite', (err) => {
    if(err){
        console.error(err);
        throw err;
    }
    else{
        console.log("Successfully connected to database");
    }
});

module.exports = { database };