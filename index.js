const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs"); //app.set sets the value for the key as (view engine:ejs)
app.set("views", path.join(__dirname, "views"));


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
  return res.render("home", {
    title: "Contact List",
    contact_list: contactList,
  });
});



//creating the server
app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on the port::", port);
});
