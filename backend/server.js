import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import Game from './models/Game';
import { stringify } from 'querystring';

const app = express();
const router = express.Router();

app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


app.use(bodyParser.json());
mongoose.connect('mongodb://larpatin:lol0802@ds119258.mlab.com:19258/lassebase')

const connection = mongoose.connection;

var ObjectID = require('mongodb').ObjectID;
var game = {
    _id: new ObjectID(),
    title: 'Metal Gare',
    price: 70,  
    status: 'Finished' 
}

connection.once('open', () => {
    console.log('MongoDB database established succesfully');
});


app.get('/', (req,res) => {
    res.send('Hello!');
});


app.get('/api/games', (
    (req,res) => {
        Game.find((err, games)  =>
         {
             if(err)
                console.log(err);
            else
                res.json(games);
    });
    }));

app.get('/api/game/:id',(req, res) => {
        Game.findById(req.params.id, (err, issue) => {
            if (err)
                console.log(err);
            else
                res.json(issue);
        })
});



app.post('/games/new', ((req, res) => {
    let game = new Game(req.body);

    game.title = req.body.title;
    game.price = req.body.price;
    game.status = 'Unfinished';

    game.save()
        .then(issue => {
            res.status(200).json({'game': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
}))


app.post('/storegames', ((req, res) => {
    
    Game.collection.insertMany(req.body);
    console.log("inserting");
    res.send("inserted");
 
}));

app.get('/api/getappname', (req,res) => {

    setTimeout(() => {
        res.json('The Lasse App');   
    },2000);

});





app.listen(4000, () => {console.log("express running")});