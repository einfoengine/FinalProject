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


app.get('/api/check', (req, res) => {
    const data = req.query.data;
    // res.json(data);
    const result = [];
    const pos = data.split(" ");

    for(var check = 0; check < pos.length; check++){
        var word = pos[check];
        var query = {};
        query.word=word;
        var dictionary = new Dictionary.find(query, function(err, items){
            if(err)
                return err;
            else
                return items;
        });
        console.log(dictionary);
        // res.send(dictionary);
    }
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