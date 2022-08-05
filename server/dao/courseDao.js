'use strict';

const db = require('../database');
const {Course} = require('../Course');
const Services = require('./Services');
const incompAndPrep = require('./Services');


const getAllCourses = async () => {
    const sql = `SELECT c.id AS code, c.name AS name, c.CFU AS cfu, c.max_students AS max_students, c.enrolled_students AS enrolled_students, c.preparatory_course AS prep, i.course_B AS inc1, i2.course_A AS inc2
                FROM courses c 
                LEFT JOIN incompatibilities i ON i.course_A=c.id
                LEFT JOIN incompatibilities i2 ON i2.course_B=c.id;`; 

    return new Promise ((resolve, reject) => {
        db.database.all(sql, [], (err, rows) => {
            //console.log(rows);
            if(err)
                reject(err);
            else{
                let courses = [];
                courses = courses.concat(incompAndPrep(rows));
                resolve(courses);
            }
        })
    })
}

const getACourseById = async (cid) => {
    const sql = `SELECT c.id AS code, c.name AS name, c.CFU AS cfu, c.max_students AS max_students, c.enrolled_students AS enrolled_students, c.preparatory_course AS prep, i.course_B AS inc1, i2.course_A AS inc2
                FROM courses c
                LEFT JOIN incompatibilities i ON i.course_A=c.id
                LEFT JOIN incompatibilities i2 ON i2.course_B=c.id
                WHERE c.id=?;`;

    //console.log(sid);
    return new Promise ((resolve, reject) => {
        db.database.all(sql, [cid], (err, rows) => {
            if(err)
                reject(err);
            else{
                let studentCourses = [];
                studentCourses = studentCourses.concat(incompAndPrep(rows));                
                resolve(studentCourses);
            }
        })
    })   
}

const getStudentCourses = async (sid) => {
    const sql = `SELECT c.id AS code, c.name AS name, c.CFU AS cfu, c.max_students AS max_students, c.enrolled_students AS enrolled_students, c.preparatory_course AS prep, i.course_B AS inc1, i2.course_A AS inc2
                FROM courses c
                LEFT JOIN users_courses uc ON c.id=uc.cid 
                LEFT JOIN incompatibilities i ON i.course_A=c.id
                LEFT JOIN incompatibilities i2 ON i2.course_B=c.id
                WHERE uc.sid=?;`;

    //console.log(sid);
    return new Promise ((resolve, reject) => {
        db.database.all(sql, [sid], (err, rows) => {
            if(err)
                reject(err);
            else{
                let studentCourses = [];
                studentCourses = studentCourses.concat(incompAndPrep(rows));                
                resolve(studentCourses);
            }
        })
    })   
}

const addNewStudyPlan = async (sid, pt) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET part_time=? WHERE id=?';
        db.database.run(sql, [pt, sid], (err, row) => {
            if(err)
                reject(err);
            else{
                resolve(1);
            }
        })
    })
}

const deleteStudyPlan = async (sid, courses) => {
    if(courses.length === 0){
        return new Promise((resolve, reject) => {resolve(1)});
    }
    else{
        return new Promise((resolve, reject) => {
            let string = 'id=';
            for(let i = 0; i<courses.length; i++){
                string = string + "'" + courses[i].code + "'" + ' OR ' + 'id=';
            }
            string = string.slice(0, -7);
            string = string + ';';
            const sql1 = 'UPDATE users SET part_time=NULL WHERE id=?';
            const sql2 = 'DELETE FROM users_courses WHERE sid=?';
            const sql3 = 'UPDATE courses SET enrolled_students=enrolled_students-1 WHERE '+string;
            db.database.run(sql1, [sid], (err, row) => {
                if(err)
                    reject(err);
                else{
                    db.database.run(sql2, [sid], (err, row) => {
                        if(err)
                            reject(err);
                        else
                            db.database.run(sql3, [], (err, row) => {
                                if(err)
                                    reject(err);
                                else
                                    resolve(1);
                            })
                    })
                }
            })
        })
    }
}

const updateStudyPlan = async (sid, oldCourses, newCourses) => {
    if(oldCourses.length !== 0){
        return new Promise((resolve, reject) => {
            console.log(oldCourses.length);
            console.log(newCourses.length);
            let string1 = '';
            let string1_id = '';
            let string2 = '';
            let string3 = '';
            let add = [];
            let sub = [];
            let j = 0;
            let t = 0;
            
            for(; j<oldCourses.length; j++){
                if(newCourses.map(c => c.code).includes(oldCourses[j].code) === false)
                    sub.push(oldCourses[j].code);
            }

            for(; t<newCourses.length; t++){
                if(oldCourses.map(c => c.code).includes(newCourses[t].code) === false)
                    add.push(newCourses[t].code);
            }

            for(j=0; j<sub.length; j++){
                string1 = string1 + "'" + sub[j] + "'" + ' OR ' + 'cid=';
                string1_id = string1_id + "'" + sub[j] + "'" + ' OR ' + 'id=';
            }

            string1 = string1.slice(0, -8);
            string1_id = string1_id.slice(0, -7);
            const sql1 = 'DELETE FROM users_courses WHERE sid=? AND (cid='+string1+');';
            const sql2 = 'UPDATE courses SET enrolled_students=enrolled_students-1 WHERE id='+string1_id+';';

            for(t=0; t<add.length; t++){
                string2 = string2 + '(' + sid + ', ' + "'" + add[t] + "'), ";
                string3 = string3 + "'" + add[t] + "'" + ' OR ' + 'id=';
            }
            string2 = string2.slice(0, -2);
            string2 = string2 + ';';
            string3 = string3.slice(0, -7);
            const sql3 = 'INSERT INTO users_courses(sid, cid) VALUES'+string2;
            const sql4 = 'UPDATE courses SET enrolled_students=enrolled_students+1 WHERE id='+string3+';';

            console.log(sql1);
            console.log(sql2);
            console.log(sql3);
            console.log(sql4);

            if(add.length !== 0 && sub.length !== 0){
                db.database.run(sql1, [sid], (err, row) => {
                    if(err){
                        console.log("Error 1", err);
                        reject(err);
                    }
                    else{
                        console.log("Step 1 ok");
                        db.database.run(sql2, [], (err, row) => {
                            if(err){
                                console.log("Error 2", err);
                                reject(err);
                            }
                            else{
                                console.log("Step 2 ok");
                                db.database.run(sql3, [], (err, row) => {
                                    if(err){
                                        console.log("Error 3", err);
                                        reject(err);
                                    }
                                    else{
                                        console.log("Step 3 ok");
                                        db.database.run(sql4, [], (err, row) => {
                                            if(err){
                                                console.log("Error 4", err);
                                                reject(err);
                                            }
                                            else{
                                                console.log("Step 4 ok");
                                                resolve(1);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            else if(add.length === 0 && sub.length !== 0){
                db.database.run(sql1, [sid], (err, row) => {
                    if(err)
                        reject(err);
                    else
                        db.database.run(sql2, [], (err, row) => {
                            if(err)
                                reject(err);
                            else
                                resolve(1);
                        })
                })
            }
            else if(sub.length === 0 && add.length !== 0){
                db.database.run(sql3, [], (err, row) => {
                    if(err)
                        reject(err);
                    else
                        db.database.run(sql4, [], (err, row) => {
                            if(err)
                                reject(err);
                            else
                                resolve(1);
                        })
                })
            }
            else{
                resolve(1);
            }
        })
    }
    else{
        return new Promise((resolve, reject) => {
            console.log(newCourses);
            let string1 = '';
            let string2 = '';
            for(let i = 0; i<newCourses.length; i++){
                string1 = string1 + '(' + sid + ', ' + "'" + newCourses[i].code + "'), ";
                string2 = string2 + "'" + newCourses[i].code + "'" + ' OR ' + 'id=';
            }
            string1 = string1.slice(0, -2);
            string1 = string1 + ';';
            string2 = string2.slice(0, -7);
            const sql1 = 'INSERT INTO users_courses(sid, cid) VALUES'+string1;
            const sql2 = 'UPDATE courses SET enrolled_students=enrolled_students+1 WHERE id='+string2+';';
            console.log(sql1);
            console.log(sql2);
            db.database.run(sql1, [], (err, row) => {
                if(err){
                    console.log("Error 1", err);
                    reject(err);
                }
                else{
                    console.log("Step 1 ok");
                    db.database.run(sql2, [], (err, row) => {
                        if(err){
                            console.log("Error 2", err);
                            reject(err);
                        }
                        else{
                            console.log("Step 2 ok");
                            resolve(1);
                        }
                    })
                }
            })
        })
    }
}

module.exports = {
    getAllCourses,
    getStudentCourses,
    getACourseById,
    addNewStudyPlan,
    deleteStudyPlan,
    updateStudyPlan
}