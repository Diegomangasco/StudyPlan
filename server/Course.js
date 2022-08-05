
/**
 * Constructor function for new Exam objects
 * @param {string} code course code (e.g., '02GOLOV')
 * @param {string} name course name
 * @param {number} cfu number of credits (e.g. 6)
 * @param {number} maxStudents maximum number of students that can attend the course
 * @param {number} enrolledStudents number of students that already follow the course 
 * @param {Array} incompatibilities exams that cannot be in the study plan with the current one
 * @param {Array} preparatoryCourses exams that must be in the study plan with the current one
 */

function Course(code, name, cfu, maxStudents, enrolledStudents, incompatibilities, preparatoryCourse) {
    this.code = code;
    this.name = name;
    this.cfu = cfu;
    this.maxStudents = maxStudents;
    this.enrolledStudents = enrolledStudents;
    this.incompatibilities = incompatibilities;
    this.preparatoryCourse = preparatoryCourse;

}


/**
 * All checks for the manipulation of the courses in dao file will be done here
 */
/*function CheckConstraints() {

    this.pTime = [20, 40];
    this.fTime = [60, 80];*/

   
    /*this.find = (courses, code) => {
        const result = courses.filter((course) => course.code === code);
        return result.length ? result[0] : undefined;
    };*/

   
    /*this.maxCFU = (courses) => {
        let sum = 0;
        let i = 0;
        for(; i<courses.length; i++){
            sum += courses[i].cfu;
        }
        return sum;
    }*/

    
    /*this.addControlMaxPT = (partTime, courses, course) => {
        if(partTime === 1){
            if(this.maxCFU(courses) + course.cfu <= this.pTime[1])
                return true;
            else
                return false;
        }
        else{
            if(this.maxCFU(courses) + course.cfu <= this.fTime[1])
                return true;
            else
                return false;
        }
    }*/

    
     /*this.addControlMinPT = (partTime, courses, course) => {
        if(partTime === 1){
            if(this.maxCFU(courses) + course.cfu >= this.pTime[0])
                return true;
            else
                return false;
        }
        else{
            if(this.maxCFU(courses) + course.cfu >= this.fTime[0])
                return true;
            else
                return false;
        }
    }*/

    
      /*this.deleteControlMinPT = (partTime, courses, course) => {
        if(partTime === 1){
            if(this.maxCFU(courses) - course.cfu >= this.pTime[0])
                return true;
            else
                return false;
        }
        else{
            if(this.maxCFU(courses) - course.cfu >= this.fTime[0])
                return true;
            else
                return false;
        }
    }*/


   
    /*this.checkPreparatory = (courses, course) => {
        let flag = true;
        if(course.preparatoryCourse !== undefined && course.preparatoryCourse !== null)
            courses.map(c => c.code).includes(course.preparatoryCourse) === true
            ? flag=true
            : flag=false;
        return flag;
    }*/

    
    /*this.checkmaxStudents = (course) => {
        let flag = true
        if(course.maxStudents !== undefined)
            course.maxStudents === course.enrolledStudents
            ? flag=false
            : flag=true;
        return flag;
    }*/

    
    /*this.checkIncompatibilities = (courses, course) => {
        let flag = true;
        if(course.incompatibilities !== undefined && course.incompatibilities.length !== 0)
            courses.map(c => c.code).includes(course.incompatibilities) === true
            ? flag=false
            : flag=true;
        return flag;
    }*/

   
    /*this.isPreparatory = (courses, course) => {
        const list = courses.filter(c => c.preparatoryCourse === course.code);
        if(list.length === 0)
            return false;
        return true;
    }*/



module.exports = { Course };
