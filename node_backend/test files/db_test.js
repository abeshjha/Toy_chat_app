var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("chat_app");
   /* 
   //--------------------To acreate data object to add manually to the database---------
  var myobj = [
    { _id: 1, username: 'Ram', password: 'Highway 71'},
    { _id: 2,username: 'Sita', password: 'Lowstreet 4'},
    { _id: 3,username: 'Laxman', password: 'Apple st 652'},
    { _id: 4,username: 'Bharat', password: 'Mountain 21'},
  ];

 //-------------------To insert data to the database-----------------------
 dbo.collection("login").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });

  //-------------------Select all from the database.--------------------
  dbo.collection("login").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });

  //-------------------select projection to only which colums are required (projection:1 to show :0 to hide)--------------
  dbo.collection("login").find({},{ projection: { _id: 1,username:1} }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
*/
//----------------select query in the database-------------------
var query = { username: "Ram" };
dbo.collection("login").find(query).toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
  db.close();
});
});





