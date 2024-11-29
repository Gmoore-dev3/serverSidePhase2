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
    res.render("add.ejs");   
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

    // if the record is created, display that on the next page
    .then((trainingCreated) => {
            res.render("summary", { Message: "Successfully added training record" });
        })
    // otherwise, throw an error
    .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while adding training." });
        next(err); // Call next with the error to handle it elsewhere if needed
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
    res.render("remove.ejs");   
})
.post((req, res, next) => {
    // Extract each heading from the body 
    const { name, surname, ID, date, time} = req.body;

    // trim the input data to avoid unnecessary white spaces while adding it following the filter
    // using the "$and", we can search for records under specific headings without needing to know everything in the record
    const trainingData = {
        $and: [
            {name: name.trim()},
            {surname: surname.trim()},
            {ID: ID.trim()},
            {date: date.trim()},
            {time: time.trim()},
            ]
    };

    // delete a record from the information given above
    training.findOneAndDelete(trainingData)

    // if the record is deleted, display that on the next page
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
    let trainingData = {};
    if (name){trainingData = {
        $and: [
            {name: name.trim()},
            {surname: surname.trim()},
            {ID: ID.trim()},
            {date: {$lte: endDate, $gte: startDate}}
            ]
        }}
    training.find(trainingData)
    .then(records => {
        res.render("trainingList", { "reservation": records });
    })
    .catch(err => {
        console.error("Error fetching training records:", err);
        res.status(500).send("An error occurred while fetching training records.");
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /");
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /");
});

trainingRouter.route("/edit")
.get((req,res,next) => {
    res.render("edit.ejs");
})
.post((req, res, next) => {
    console.log(req.body);
    // Extract and trim input data 
    const {name, surname, ID, date, time, newDate, newTime} = req.body;

    const trainingData = {
        $and: [
            {name: name.trim()},
            {surname: surname.trim()},
            {ID: ID.trim()},
            {date: date.trim()},
            {time: time.trim()},
            ]
    };
    const trainingUpdate ={
        date: newDate.trim(),
        time: newTime.trim(),
    };
    console.log(trainingData);

    training.findOneAndUpdate(trainingData, trainingUpdate)
    .then((trainingUpdated) => {
        console.log("Training updated successfully."); 
        res.render("summary", { Message: "Successfully updated training record" });
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while editting training." });
        next(err); // Call next with the error to handle it elsewhere if needed
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

trainingRouter.route("/about")
.get((req,res,next) => {
    res.render("about");
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

module.exports = trainingRouter;