const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  };

  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  const url = "https://us17.api.mailchimp.com/3.0/lists/63277e5c06/members";
  const apiKey = "d2848a139554dcc1a64fc471a1eda879-us17";

  axios({
    method: "POST",
    json: true,
    url: url,
    data: jsonData,
    auth: {
      username: "tolu",
      password: "90179c090d9e91f9e865896bcc2d0774-us17"
    }
  })
    .then(function(results) {
      console.log(results);
      res.sendFile(__dirname + "/success.html");
    })
    .catch(function(err) {
      console.log(err);
      res.sendFile(__dirname + "/failed.html");
    });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000");
});

// API KEY  d2848a139554dcc1a64fc471a1eda879-us17
// List ID 63277e5c06
