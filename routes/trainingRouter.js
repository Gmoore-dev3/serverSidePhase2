const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const training = require('../models/training');
const trainingRouter = express.Router();

trainingRouter.route('/')
.get((req,res,next) => {
    res.render('index');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /');
});

trainingRouter.route('/add')
.get((req,res,next) => {
    res.render('add.ejs');   
})
.post((req, res, next) => {
    console.log(req.body);
    // Extract and trim input data 
    const { name, surname, ID, date, time, cardNum, cardExp, cardSec } = req.body;

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
    console.log(trainingData);

    training.create(trainingData)
    .then((trainingCreated) => {
        console.log('Training added successfully.');

        // Fetch the training records after the new training is added
        return training.find(); // Return the promise
    })
    .then((records) => {
        // Render the trainingList EJS file with the fetched records
        res.render('trainingList', { "reservation" : records });
    })
    .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while adding training.' });
        next(err); // Call next with the error to handle it elsewhere if needed
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /add');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /add');
});

trainingRouter.route('/remove')
.get((req,res,next) => {
    res.render('remove.ejs');   
})
.post((req, res, next) => {
    console.log(req.body);
    // Extract and trim input data 
    const { name, surname, ID, date, time} = req.body;

    const trainingData = {
        $and: [
            {name: name.trim()},
            {surname: surname.trim()},
            {ID: ID.trim()},
            {date: date.trim()},
            {time: time.trim()},
            ]
    };
        
    console.log(trainingData);

    training.findOneAndDelete(trainingData)
    .then((trainingDeleted) => {
        if(trainingDeleted == null){console.log('No training record to remove.'); res.render("remove")}
        else{console.log('Training removed successfully.'); res.render("index")}
    })
    .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while removing training.' });
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /remove');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /remove');
});

trainingRouter.route('/view')
.get((req,res,next) => {
    training.find()
    .then(records => {
        res.render('trainingList', { "reservation": records });
    })
    .catch(err => {
        console.error('Error fetching training records:', err);
        res.status(500).send('An error occurred while fetching training records.');
    });
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /');
});

trainingRouter.route('/edit')
.get((req,res,next) => {
    res.render('edit.ejs');   
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
        console.log('Training editted successfully.');
        res.render("index");
    })
    .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while editting training.' });
        next(err); // Call next with the error to handle it elsewhere if needed
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /edit');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /edit');
});

module.exports = trainingRouter;