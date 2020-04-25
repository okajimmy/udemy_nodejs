//this is my first js app
const express = require("express");
const body = require("body-parser");
const requests = require("request");
const https = require("https");


var app = express();
app.use(body.urlencoded({ extended: true }));
app.use(express.static("public"))

app.listen(process.env.PORT || 3000, function () {
    console.log("server runing on port 3000");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    console.log(req.body);
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var email = req.body.email;
    
    const list_id = "dfa8784e69";
    const url = "https://us4.api.mailchimp.com/3.0/lists/"+ list_id;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }

            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const options = {
        method : "POST",
        auth : "abdellah:2aed939417972cf6c005e144fe244f31-us4"
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
            response.on("data", function (data) {
                console.log(JSON.parse(data));
            });
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

    });
    request.write(jsonData);
    request.end();


});
// API Key
// 2aed939417972cf6c005e144fe244f31-us4

// audience ID
// dfa8784e69
