const { error } = require("console");
const express = require("express");
require('dotenv').config();
const { rmSync } = require("fs");
const path = require("path");
const db = require('./config/mongoose');
const Contact = require('./models/contact')
const port = process.env.PORT || 8000;

const app = express();

app.set("view engine", "ejs"); //app.set sets the value for the key as (view engine:ejs)
app.set("views", path.join(__dirname, "views"));

// middleware(app.use() is termed as middleware)
app.use(express.urlencoded()); //used to read form's data in decoded form(initialy it is encoded when received from form)
app.use(express.static('assets')); // telling the express to use static files(css,js,images etc) from assets folder


//playing with middleware
// app.use(function(req , res ,next){
//     console.log('middleware called');
//     next();   //the next() will take us to the next route(i.e, home route) if no middleware is remaining  there to execute
// })

//creating contacts list
let contactList = [
  {
    name: "Dhanush Kr.",
    phone: "1111111111",
  },
  {
    name: "Mohan Kr.",
    phone: "1234567890",
  },
  {
    name: "Rohan Kr.",
    phone: "0987654321",
  },
];

//routes
app.get("/", function (req, res) {
Contact.find({} , function(err , allContacts){
  if(err){
    console.log('Error in fetching contacts from db');
    return;
  }

  return res.render("home", {
    title: "Contact List",
    contact_list: allContacts
    }); 
  });
});

app.get("/demo", function (req, res) {
  return res.render("demo", {
    title: "Demo",
  });
});

app.post("/create-contact", function (req, res) {

  //Storing records without database
//   contactList.push({
//     name: req.body.name,
//     phone: req.body.phone,
//   });

// contactList.push(req.body);

// //   return res.redirect("/");
//      return res.redirect("back");
// });


//storing records with database
Contact.create({
  name:req.body.name,
  phone:req.body.phone
} , function(err , newContact){
  if(err){
    console.log(`Error in creating a contact ${err}`);
  }
  console.log('*******' , newContact);
  return res.redirect('back');
  });
});



//deleting a contact
app.get('/delete-contact/', function(req, res){

  //get the id from the url
  let id = req.query.id;
 
  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id , function(err){
    if(err){
      console.log(`Error in deleting the contact from database`);
      return;
    }
    return res.redirect('back');
  });
});


// creating the server using express
app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on the port::", port);
});
