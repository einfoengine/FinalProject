const
    express = require ('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose');

var path = require('path');

// Fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// getting-started.js
mongoose.connect('mongodb://localhost/test');

// data structure
var Dictionary = require('./model/dictionaryModel');
app.use((req, res, next) => {
    const origin = req.get('origin');

    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.get('/api/try', (req, res) => {
    var query = {};
    query.word = 'doing';
    Dictionary.find(query, function(err, ebooks) {
    if(err)
        res.status(500).send(err);
    else
        res.json(ebooks);
    });
    // res.send(result);
});

app.get('/api/check', (req, res) => {
    var data = req.query.data;
    var pos = data.split(" ");
    var result = [];
    for (var i = 0; i < pos.length; i++) {
        console.log(pos[i]);
        var item = {};
        item.word = pos[i];
        // result[i]=[];
        // result[i][] = pos[i];
        // var query = {};
        // query.word = pos[i];

        // var find = Dictionary.find(query, function(err, ebooks) {
        //     if(err)
        //         // res.status(500).send(err);
        //     else
        //         return ebooks;
        // });

        item.find = fetch('http://localhost:4000/api/dictionary?word='+pos[i], {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
            .then(res => res);

        // item.find = find;
        // console.log(item);

        result[i] = item;

    }
    res.status(200).json(result);
});


// Dictionary Routs =============================
// Post data JSON
app.post('/api/dictionary/post', (req, res) => {
    var items = req.body;
    for(var i=0; i<items.length; i++) {
        var item = items[i];
        var dictionary = new Dictionary(item);
        dictionary.save();
    }
    res.status(201).send('Done');
});

// Get data
app.get('/api/dictionary', (req, res) => {
    var query = {};
    if(req.query.word){
        query.word = req.query.word;
    }
    if(req.query.wordType){
        query.wordType = req.query.wordType;
    }
    Dictionary.find(query, function(err, items){
        if(err)
            res.status(500).send(err);
        else
            res.json(items);
    });
});

// Del data
app.delete('/api/dictionary/dlt', (req, res) => {
    var query = {};
    Dictionary.remove(query, function(err, items){
        if(err)
            res.status(500).send(err);
        else
            res.send('Done');
    });
});
// Ends Dictionary routs ===========================

// Analysis sentence =============================

app.get('/api/maruf', (req, res) => {
    var data ="I love you";
    data = data.split(" ");
    for(var check = 0; check < data.length; check++){
        fetch('http://localhost:4000/api/dictionary?word='+data[check])
            .then(function(response){
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(stories){
                console.log(stories);
            });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});
//
// app.listen(port, () => console.log(`Server started on port: + ${port}`));
app.listen(
    port,
    function(){
        console.log('Server started on port:' + port);
    }
);