'use strict';
const {Course} = require('../Course');

const incompAndPrep = (queryResult) => {
    let courses = [];
    queryResult.forEach(element => {
        let index = 0;
        if(courses.length === 0){
            index = -1;
        }
        else{
            index = courses.findIndex((c) => c.code === element.code);
        }
        if(index === -1){
            let inc1 = [];
            let inc2 = [];
            let inc = [];
            element.inc1 === null ? inc1 = [] : inc1 = [element.inc1];
            element.inc2 === null ? inc2 = [] : inc2 = [element.inc2];
            if(inc1.length !== 0 && inc2.length !== 0){
                inc = inc1.concat(inc2);
            }
            else if(inc1.length !== 0){
                inc = inc1;
            }
            else if(inc2.length !== 0){
                inc = inc2;
            }
            const course = new Course(element.code, element.name, element.cfu, element.max_students, 
                element.enrolled_students, inc, element.prep);
            courses.push(course);
        }
        else{
            let inc1 = [];
            let inc2 = [];
            let inc = [];
            element.inc1 === null ? inc1 = [] : inc1 = [element.inc1];
            element.inc2 === null ? inc2 = [] : inc2 = [element.inc2];
            if(inc1.length !== 0 && inc2.length !== 0){
                inc = inc1.concat(inc2);
            }
            else if(inc1.length !== 0){
                inc = inc1;
            }
            else if(inc2.length !== 0){
                inc = inc2;
            }
            courses[index].incompatibilities = courses[index].incompatibilities.concat(inc);
        }
    });
    return courses.sort((e1, e2) => e1.name.localeCompare(e2.name));
}

module.exports = incompAndPrep;