const express = require('express');
const cors = require('cors');
const boeken = require('./routes/boeken');
const auteurs = require('./routes/auteurs');

// Mongoose
const mongoose = require("mongoose");

// Maak verbinding met de MongoDB database
// Het tweede argument bevat opties voor de connectie
mongoose.connect("mongodb://127.0.0.1:27017/cvo_boeken", {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    // de connect() methode geeft een promise terug
    .then(() => {
        console.log("Verbonden met Mongodb");        
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);        
    });

const app = express();

const port = process.env.PORT || 7000;

app.use(cors());

// Als een JSON object met request wordt meegestuurd
// Steek het object in req.body
app.use(express.json());

// Routes
app.use("/boeken", boeken);
app.use("/auteurs", auteurs);

app.listen(port, () => {
    console.log(`Server luistert op poort ${port}`);    
});