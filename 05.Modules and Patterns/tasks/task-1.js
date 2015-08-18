/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
    var Course = {
        init: function(title, presentations) {
            this.title = title;
            this.presentations = presentations;
            this._students = [],
            this._homeworks = [],
            this._scores = [];
            return this;
        },

        addStudent: function(name) {
            var currentId = this._students.length + 1;

            if (!isValidStudentName(name)) {
                throw 'Invalid student name!';
            }
            this._students.push({
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1],
                id: currentId
            });
            return currentId;
        },

        getAllStudents: function() {
            return this._students.slice();
        },

        submitHomework: function(studentID, homeworkID) {
            if (!isValidStudentId(studentID, this._students)) {
                throw 'Invalid sudent ID!';
            }
            if (homeworkID % 1 !== 0 || homeworkID < 1 || homeworkID > this.presentations.length) {
                throw 'There is no presentation with this ID! Wrong homework ID!';
            }
            var studentHomeworks = this._homeworks.filter(function(element){return element.id === studentID});
            for(i in studentHomeworks) {
                if (studentHomeworks[i].homeworkID === homeworkID) {
                    throw 'The student has already submitted homework for this presentation';
                }
            }
            this._homeworks.push({
                studentID: studentID,
                homeworkID: homeworkID
            })
        },
        
        pushExamResults: function(results) {
            var i;
            if (!Array.isArray(results)) {
                throw 'The results must be given as array!';
            }
            for (i = 0; i < this._students.length; i += 1) {
                this._scores[i].StudentID = this._students[i].id;
                this._scores[i].Score = 0;
            }
            for (i = 0; i < results.length; i += 1) {
                if (!isValidStudentId(results[i].StudentID, this._students)) {
                    throw 'The list of results contains invalid student ID!';
                }
                if (this._scores.indexOf(results[i].StudentID) !== -1) {
                    throw 'The student with ID ' + results[i].StudentID + 'have two given scores!';
                }
                if (isNaN(results[i].Score) || results[i].Score === '') {
                    throw 'Invalid score!'
                }
                this._scores[this._scores.indexOf(results[i].StudentID)].Score = results[i].Score;
            }
        },

        getTopStudents: function() {
            var i,
                submittedHomeworks,
                sortedByFinalScore = [],
                topTen = [];
            for (i = 0; i < this._scores.length; i += 1) {
                submittedHomeworks = this._homeworks.filter(function(element) {return element.studentID === this._scores[i].StudentID});
                this._scores[i].FinalScore = (this._scores[i].Score * 75) / 100;
                this._scores[i].FinalScore += ((submittedHomeworks / this._presentations.length) * 25) / 100;
            }
            if (this._scores.length < 11) {
                return this._scores.sort(function(a, b) {return a.FinalScore - b.FinalScore});
            } else {
                sortedByFinalScore = this._scores.sort(function(a, b) {return a.FinalScore - b.FinalScore});
                for (i = 0; i < 10; i += 1) {
                    topTen.push({
                        firstname: this._students[this._students.indexOf(sortedByFinalScore[i].StudentID)].firstname,
                        lastname: this._students[this._students.indexOf(sortedByFinalScore[i].StudentID)].lastname,
                        finalScore: sortedByFinalScore[i]
                    });
                }
                return topTen.slice();
            }
        }
    };

    Object.defineProperty(Course, 'title', {
        get: function() {
            return this._title;
    },
        set: function(title) {
            if (!isValidTitle(title)) {
                throw 'Invalid title of course!';
            }
            this._title = title;
        }
    });

    Object.defineProperty(Course, 'presentations', {
        get: function() {
            return this._presentations;
        },
        set: function(presentations) {
            if (!presentations || presentations.length === 0) {
                throw 'Invalid set of presentations!';
            }
            for (var i = 0; i < presentations.length; i += 1) {
                if (!isValidTitle(presentations[i])) {
                    throw 'Invalid title of presentation!';
                }
            }
            this._presentations = presentations;
        }
    });

    function isValidTitle(title) {
        if (!title || title !== title.trim() || title.match(/\s{2,}/)) {
            return false;
        }
        return true;
    }

    function isValidStudentName(name) {
        if (typeof(name) !== 'string') {
            return false;
        }
        var namesSplited = name.split(' ');
        if (namesSplited.length !== 2) {
            return false;
        }
        for (var i = 0; i < namesSplited.length; i += 1) {
            if (namesSplited[i].charCodeAt(0) < 65 || namesSplited[i].charCodeAt(0) > 90) {
            return false;
            }
            for (var j = 1; j < namesSplited[i].length; j += 1) {
                if (namesSplited[i].charCodeAt(j) > 64 && namesSplited[i].charCodeAt(j) < 91) {
                    return false;
                }
            }
        }
        return true;
    }

    function isValidStudentId(studentID, students) {
        return (students.some(function(element){return element.id === studentID}));
    }

    return Course;

  /*var jsoop = Object.create(Course);
  jsoop.init('Modules and Patterns', ['presentation1']);
  var student = {
    firstname: 'Pesho',
    lastname: 'Goshev',
  };
  var id = jsoop.addStudent(student.firstname + ' ' + student.lastname);
  jsoop.submitHomework(id, 1);
  
  console.log(jsoop);*/
}

//solve();

module.exports = solve;
