const express = require("express");
const cors = require("cors");

const app = express();

const axios = require('axios')

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

let compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
];

let fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A faithful friend is a strong defense.", "A friend asks only for your time not your money.",
"A gambler not only will lose what he has, but also will lose what he doesn’t have.", "A light heart carries you through all the hard times."];

app.get("/api/compliment", (req, res) => {

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.post("/api/compliment", (req, res) => {
  compliments.push(req.body.compliment);
  res.status(200).send("Compliment added!")
})

app.get("/api/fortune", (req, res) => {
  

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
});

app.post("/api/fortune", (req,res) => {
  fortunes.push(req.body.fortune);
  res.status(200).send("Success")
})

app.get("/api/getQuotes", (req,res) => {
  // we need to do the axios request from here otherwise we get an access-control-allow-origin cors error
  axios("https://zenquotes.io/api/random")
    .then(response => {
      // the 'h' here in the object contains preformatted html data of the quote for easier addition to our website
      res.status(200).send(response.data[0].h)
    })
    .catch(error => {
      console.log(error)
    })

})

app.listen(4000, () => console.log("Server running on 4000"));
