const express = require('express');
// create router

// Route Dictionary
//====================

const routes = function(Dictionary){
    const dictionaryRouter = express.Router();
    dictionaryRouter.route('/').get(function(req,res){
        var query = {};
        Dictionary.find(query, function(err, items){
            if(err)
                res.status(500).send(err);
            else
                res.json(items);
        });
    });
    // Post data JSON
  /*  app.post('/api/dictionary/post', (req, res) => {
        var items = req.body;
        for(var i=0; i<items.length; i++) {
            var item = items[i];
            var dictionary = new Dictionary(item);
            dictionary.save();
        }
        res.status(201).send('Done');
    });

    // Get data
    app.get('/', (req, res) => {
        var query = {};
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
    });*/
}

module.exports = routes;