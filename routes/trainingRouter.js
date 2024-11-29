const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const training = require("../models/training");
const trainingRouter = express.Router();

trainingRouter.route("/")
.get((req,res,next) => {
    res.render("index");
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /");
});

trainingRouter.route("/add")
.get((req,res,next) => {
    res.render("add");   
})
.post((req, res, next) => {
    // Extract each heading from the body
    const { name, surname, ID, date, time, cardNum, cardExp, cardSec } = req.body;

    // trim the input data to avoid unnecessary white spaces while adding it record data
    currentDate = new Date();
    const trainingData = {
        name: name.trim(),
        surname: surname.trim(),
        ID: ID.trim(),
        date: date.trim(),
        time: time.trim(),
        cardNum: cardNum.trim(),
        cardExp: cardExp.trim(),
        cardSec: cardSec.trim(),
        currentDate: currentDate,
    };

    // create the record from the information given above
    training.create(trainingData)

    // if the record is created, display the success message on the next page
    .then((trainingCreated) => {
            res.render("summary", { Message: "Successfully added training record" });
        })
    // otherwise, throw an error
    .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while adding training." });
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /add");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /add");
});

trainingRouter.route("/remove")
.get((req,res,next) => {
    res.render("remove");   
})
.post((req, res, next) => {
    // delete a record by using the _id passed through the hidden input
    training.findByIdAndDelete(req.body._id)

    // if the record is deleted, display the success on the next page
    .then((trainingDeleted) => {
        console.log("Training removed successfully."); 
        res.render("summary", { Message: "Successfully removed training record" });
    })
    // otherwise, throw an error
    .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while removing training." });
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /remove");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /remove");
});

trainingRouter.route("/view")
.get((req,res,next) => {
    res.render("summary.ejs", { Message: "" })
})
.post((req, res, next) => {
    const {name, surname, ID, startDate, endDate} = req.body;
    // make an empty filter
    let trainingData = {};
    // if information is submitted, add it to the AND filter
    if (name){trainingData = {
        $and: [
            {name: name.trim()},
            {surname: surname.trim()},
            {ID: ID.trim()},
            {date: {$lte: endDate, $gte: startDate}}
            ]
        }}
    // find the records that match the filter
    training.find(trainingData)
    .then(records => {
        // display the records found using traininglist
        res.render("trainingList", { "reservation": records });
    })
    .catch(err => {
        console.error("Error fetching training records:", err);
        res.status(500).send("An error occurred while fetching training records.");
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /view");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /view");
});

trainingRouter.route("/editID")
.get((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /editID");
})
.post((req, res, next) => {
    // display the edit file with _id as an ejs variable
    res.render("edit", { _id: req.body._id })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /editID");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /editID");
});


trainingRouter.route("/edit")
.get((req,res,next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /edit");
})
.post((req, res, next) => {
    // retrieve all forum information and parse it
    const {_id, newName, newSurname, newId, newDate, newTime, newCardNum, newCardExp, newCardSec} = req.body;

    const trainingUpdate = {};

    // for any field that was given an input, add that information to the updated information
    if (newName) {trainingUpdate.name = newName.trim();}
    if (newSurname) {trainingUpdate.surname = newSurname.trim();}
    if (newId) {trainingUpdate.ID = newId.trim();}
    if (newDate) {trainingUpdate.date = newDate.trim();}
    if (newTime) {trainingUpdate.time = newTime.trim();}
    if (newCardNum) {trainingUpdate.cardNum = newCardNum.trim();}
    if (newCardExp) {trainingUpdate.cardExp = newCardExp.trim();}
    if (newCardSec) {trainingUpdate.cardSec = newCardSec.trim();}

    // find and update the record
    training.findByIdAndUpdate(_id, trainingUpdate)
    .then((trainingUpdated) => {
        console.log("Training updated successfully."); 
        res.render("summary", { Message: "Successfully updated training record" });
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while editting training." });
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /edit");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /edit");
});

trainingRouter.route("/help")
.get((req,res,next) => {
    res.render("help");
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /help");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /help");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /help");
});

trainingRouter.route("/about")
.get((req,res,next) => {
    res.render("about");
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /about");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /about");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /about");
});

module.exports = trainingRouter;