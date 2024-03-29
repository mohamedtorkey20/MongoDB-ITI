//1. Create new database named: FacultySystemV2.
use FacultySystemV2
//Create student collection that has (FirstName, lastName,
//IsFired, FacultyID, array of objects, each object has
//CourseID, grade).
db.createCollection("students")

const students=[{"id":1,"firstName":"Mae","lastName":"Reuble","facultyID":1,"isFired":true,"courses":[{"CourseID":1,"grade":59},{"CourseID":2,"grade":35},{"CourseID":3,"grade":61}]},
{"id":2,"firstName":"Marnie","lastName":"Trimmill","facultyID":2,"isFired":false,"courses":[{"CourseID":1,"grade":25},{"CourseID":2,"grade":64},{"CourseID":3,"grade":69}]},
{"id":3,"firstName":"Darrick","lastName":"Dyment","facultyID":3,"isFired":true,"courses":[{"CourseID":1,"grade":18},{"CourseID":2,"grade":70},{"CourseID":3,"grade":74}]},
{"id":4,"firstName":"Noelani","lastName":"Loughney","facultyID":4,"isFired":false,"courses":[{"CourseID":1,"grade":69},{"CourseID":2,"grade":89},{"CourseID":3,"grade":19}]},
{"id":5,"firstName":"Portie","lastName":"Ebertz","facultyID":5,"isFired":false,"courses":[{"CourseID":1,"grade":79},{"CourseID":2,"grade":56},{"CourseID":3,"grade":96}]},
{"id":6,"firstName":"Chloris","lastName":"Bessey","facultyID":6,"isFired":true,"courses":[{"CourseID":1,"grade":0},{"CourseID":2,"grade":51},{"CourseID":3,"grade":64}]},
{"id":7,"firstName":"Lin","lastName":"Dodgson","facultyID":7,"isFired":true,"courses":[{"CourseID":1,"grade":50},{"CourseID":2,"grade":80},{"CourseID":3,"grade":16}]},
{"id":8,"firstName":"Adlai","lastName":"Pavett","facultyID":8,"isFired":false,"courses":[{"CourseID":1,"grade":12},{"CourseID":2,"grade":31},{"CourseID":3,"grade":73}]},
{"id":9,"firstName":"Clevey","lastName":"Roalfe","facultyID":9,"isFired":true,"courses":[{"CourseID":1,"grade":34},{"CourseID":2,"grade":13},{"CourseID":3,"grade":100}]},
{"id":10,"firstName":"Lucias","lastName":"McMorran","facultyID":10,"isFired":false,"courses":[{"CourseID":1,"grade":15},{"CourseID":2,"grade":87},{"CourseID":3,"grade":43}]}]

db.students.insertMany(students)


//• Create Faculty collection that has (Faculty Name,
//Address).

db.createCollection("faculty")
const faculties=[{"FacultyID":1,"FacultyName":"Celesta Moulton","Address":"58 Hermina Lane"},
{"FacultyID":2,"FacultyName":"Juliana Kilban","Address":"97 Merchant Court"},
{"FacultyID":3,"FacultyName":"Chloris M'cowis","Address":"90364 Lakewood Gardens Center"},
{"FacultyID":4,"FacultyName":"Westbrook Joincey","Address":"9 6th Terrace"},
{"FacultyID":5,"FacultyName":"Lynelle Ovey","Address":"32330 Ryan Terrace"},
{"FacultyID":6,"FacultyName":"Nate Sotham","Address":"8184 Vernon Terrace"},
{"FacultyID":7,"FacultyName":"Zita Fealty","Address":"10608 Harper Trail"},
{"FacultyID":8,"FacultyName":"Alexandre Oglevie","Address":"77 Gateway Junction"},
{"FacultyID":9,"FacultyName":"Herve Christie","Address":"98818 Farwell Avenue"},
{"FacultyID":10,"FacultyName":"Barth Ollerenshaw","Address":"8 Brown Alley"}]

db.Faculty.insertMany(faculties)

//• Create Course collection, which has (Course Name, Final
//Mark).


db.createCollection("courses")

const courses=[{"CourseID":1,"CouresName":"Courtnay Carnier","finalMark":1},
{"CourseID":2,"CouresName":"Felicia Highnam","finalMark":2},
{"CourseID":3,"CouresName":"Gabriello Demer","finalMark":3},
{"CourseID":4,"CouresName":"Gannon Drance","finalMark":4},
{"CourseID":5,"CouresName":"Stanford Buckeridge","finalMark":5},
{"CourseID":6,"CouresName":"Alex Maple","finalMark":6},
{"CourseID":7,"CouresName":"Adelina Coysh","finalMark":7},
{"CourseID":8,"CouresName":"Anestassia Hurn","finalMark":8},
{"CourseID":9,"CouresName":"Jdavie Pellatt","finalMark":9},
{"CourseID":10,"CouresName":"Percival Pyott","finalMark":10}]

db.Course.insertMany(courses)



// 2. Display each student Full Name along with his average
// grade in all courses. $conca
db.students.aggregate([
    {
        $project: {
            FullName: { $concat: ["$FirstName", " ", "$LastName"] },
            AverageGrade: { $avg: "$courses.grade" }
        }
    }
]);


// 3. Using aggregation display the sum of final mark for all
// courses in Course collection.
db.Course.aggregate([
    {
        $group: {
            _id: null,
            TotalFinalMark: { $sum: "$Final Mark" }
        }
    },
    {
        $project: {
            _id: 0,
            TotalFinalMark: 1
        }
    }
]);

//4. Implement (one to many) relation between Student and
//Course, by adding array of Courses IDs in the student object.
//• Select specific student with his name, and then display
//his courses.


let Student = db.students.findOne({ firstName: 'Portie' });

Student.courses.forEach(course => {
    let courseId = course.CourseID;
    let courseDetails = db.Course.findOne({ CourseID: courseId });

    print(`Course ID: ${courseDetails.CourseID}`);
    print(`Course Name: ${courseDetails.CouresName}`);
    print(`Final Mark: ${courseDetails.finalMark}`);
    print("\n");
});

//4.Implement relation between Student and faculty by adding
//the faculty object in the student using _id Relation using
//$Lookup.
//• Select specific student with his name, and then display
//his faculty

db.students.aggregate([
    {
        $match: {
            $and: [
                { firstName: "Marnie"},
                { lastName: "Trimmill" }
            ]
        }
    },
    {
        $lookup: {
            from: "faculty",
            localField: "facultyID",
            foreignField: "FacultyID",
            as: "faculty"
        }
    },
    {
        $project: {
            _id: 1,
            FullName: { $concat: ["$firstName", " ", "$lastName"] },
            Faculty:"$faculty.FacultyName" 
        }
    }
]);

