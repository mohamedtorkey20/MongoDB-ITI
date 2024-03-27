//a. Display all documents in instructors collection
db.Instructors.find({})
//b. Display all instructors with salaries greater than 4000 (only show
//firstName and salary)
db.Instructors.find({ salary: { $gt: 4000 } }, { firstName: 1, salary: 1 })
//c. Display all instructors with ages less than or equal 25.
db.Instructors.find({age: {$lte: 25}},{})
//d. Display all instructors with city mansoura and sreet number 10 or 14
//only display (firstname,address,salary).
db.Instructors.find({ "address.city": "mansoura", 
    $or: [
        { "address.street": 10 },
        { "address.street": 14 }
    ]
}, { 
    firstName: 1, 
    address: 1, 
    salary: 1 
})
//Display all instructors who have js and jquery in their courses (both of
//them not one of them).
db.Instructors.find({ courses: { $all: ["js", "jquery"] }})
// Display number ofcourses foreach instructor and display first name with number of courses
db.Instructors.find().forEach(function(doc) {
    print("FirstName:", doc.firstName, "Number of Courses:", doc.courses.length);
});

/*Write mongodb query to get all instructors that have firstName and
lastName properties , sort them by firstName ascending then by
lastName descending and finally display their data FullName and age
Note: use mongoDb sort method not javascript array method*/
db.Instructors.find(
    { firstName: { $exists: true }, lastName: { $exists: true } }, 
    { _id: 0, firstName: 1, lastName: 1, age: 1 }
).sort(
    { firstName: 1, lastName: -1 } 
).forEach((i)=>{
    print("FullName:", i.firstName + " " + i.lastName, "Age:", i.age);
});
//h. Find all instructors that have fullName that contains “mohammed”.
db.Instructors.find(
    {
        $or: [
            { firstName: { $regex: /mohammed/i } },
            { lastName: { $regex: /mohammed/i } }
        ]
    }
).forEach(function(doc) {
    print("FullName:", doc.firstName + " " + doc.lastName, "Age:", doc.age);
});

//i. Delete instructor with first name “ebtesam” and has only 5 courses in courses array
db.Instructors.deleteOne({ firstName: "ebtesam", "courses": { $size: 5 } })
//j. Add active property to all instructors and set its value to true.
db.Instructors.updateMany({},{$set:{active:true}})
//k. Change “EF” course to “jquery” for “mazen mohammed” instructor(without knowing EF Index)
db.Instructors.updateOne(
    { firstName: "mazen", lastName: "mohammed", courses: "EF" }, 
    { $set: { "courses.$": "jquery" } } 
)
//l. Add jquery course for “noha hesham”.

db.Instructors.updateOne(
    { firstName: "noha", lastName: "hesham" }, 
    { $addToSet: { courses: "jquery" } } 
)
//m. Remove courses property for “ahmed mohammed ” instructor
db.Instructors.updateOne(
 { firstName: "ahmed", lastName: "mohammed" },
 {$unset:""}
)

//n. Decrease salary by 500 for all instructors that has only 3 courses in their list ($inc)
db.Instructors.updateOne(
  {courses:{$size:3}},
 {$inc:{salary:-500}})
//o. Rename address field for all instructors to fullAddress.
db.Instructors.updateMany({}, { $rename: { "address": "fullAddress" } } )
//p. Change street number for noha hesham to 20
db.Instructors.updateOne({ firstName: "noha", lastName: "hesham" }, { $set: { "address.street": 20 } } )