//Create database with name ITI → by typing use ITI
use ITI
//start create new collection named Instructors following with inserts
db.createCollection("Instructors");
//Insert your own data
db.Instructors.insertOne({ fname: "mohamed", lname: "torkey", gender: "M" });
//Insert instructor without firstName and LastName (mongo will raise an
//error or not ?) NO
db.Instructors.insertOne({ gender: "M" });
//Using array contained with lab folder instructors.txt file.
let instructorsArray=[{_id:6,firstName:"noha",lastName:"hesham",
                age:21,salary:3500,
                address:{city:"cairo",street:10,building:8},
                courses:["js","mvc","signalR","expressjs"]},
                
                {_id:7,firstName:"mona",lastName:"ahmed",
                age:21,salary:3600,
                address:{city:"cairo",street:20,building:8},
                courses:["es6","mvc","signalR","expressjs"]},
                
                {_id:8,firstName:"mazen",lastName:"mohammed",
                age:21,salary:7040,
                address:{city:"Ismailia",street:10,building:8},
                courses:["asp.net","mvc","EF"]},
                
                {_id:9,firstName:"ebtesam",lastName:"hesham",
                age:21,salary:7500,
                address:{city:"mansoura",street:14,building:3},
                courses:["js","html5","signalR","expressjs","bootstrap"]}
               
		
		];
db.Instructors.insertMany(instructorsArray);
//7 Try the following queries: (all queries should be run using find or findOne)
//a. Display all documents for instructors collection
db.Instructors.find();
//b. Display all instructors with fields firstName, lastName and address
db.Instructors.find({}, { "firstName": 1, "lastName": 1, "address": 1 })
//c. Display firstName and city(not full address) for instructors with age 21.
db.Instructors.find({ age: 21 }, { firstName: 1, "address.city": 1 });
//d. Display firstName and age for instructors live in Mansoura city.
db.Instructors.find({"address.city": "mansoura"}, {firstName: 1, age: 1});
//nothing output because the firstName "ryhab" and lastName "farouq" not exsits in Instructors
db.Instructors.find({firstName:"ryhab"},{lastName:"farouq"},{firstName:
1,lastName:1})
//select firstname and courses where courses mvc
db.Instructors.find({courses:"mvc"},{firstName:1,courses:1})


