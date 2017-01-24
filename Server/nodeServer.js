var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/newBase';
var express = require('express');
var async = require('async');
var app = express();
var cors = require('cors');
app.use(cors());

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('Bonjour');
});

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

app.get('/types', function(req, res) {
    var liste = MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var all = db.collection('Produits').find({}, { 'type': 1, '_id': 0 }).toArray(function(err, items) {
            var liste = [];
            //assert(null, err);
            for (val in items) {
                if (!contains(liste, items[val]['type'])) {
                    liste.push(items[val]['type']);
                }
            }
            console.log('liste: ', liste);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(liste));
        });
    });
});

app.get('/marques', function(req, res) {
    var liste = MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var all = db.collection('Produits').find({}, { 'marque': 1, '_id': 0 }).toArray(function(err, items) {
            var liste = [];
            //assert(null, err);
            for (val in items) {
                if (!contains(liste, items[val]['marque'])) {
                    liste.push(items[val]['marque']);
                }
            }
            console.log('liste: ', liste);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(liste));
        });
    });
});

app.get('/produits', function(req, res) {
    var liste = MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var all = db.collection('Produits').find({}, { 'type': 1, 'marque': 1, 'modèle': 1, 'prix': 1, 'stockage': 1, 'appreciation':1, '_id': 0 }).toArray(function(err, items) {
            var liste = [];
            //assert(null, err);
            for (val in items) {
                if (!contains(liste, items[val])) {
                    liste.push(items[val]);
                }
            }
            console.log('liste: ', liste);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(liste));
        });
    });
});

app.get('/produits/marques/:marque', function(req, res) {
    var liste = MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var marqueAChercher = req.params.marque;
        var all = db.collection('Produits').find({ 'marque': marqueAChercher }, { 'type': 1, 'marque': 1, 'modele': 1, 'prix': 1, 'stockage': 1, 'appreciation':1, '_id': 0 }).toArray(function(err, items) {
            var liste = [];
            //assert(null, err);
            for (val in items) {
                if (!contains(liste, items[val])) {
                    liste.push(items[val]);
                }
            }
            console.log('liste: ', liste);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(liste));
        });
    });
});

app.get('/produits/arbre/marques/:marque', function(req, res){
	MongoClient.connect(url, function(err,db){
		assert.equal(null, err);
		var marqueAChercher = req.params.marque;
		db.collection('Produits').find({'marque':marqueAChercher}, {'type':1, 'marque':1, 'modele':1, 'prix':1, 'stockage':1, 'appreciation':1, '_id':0}).toArray(function(err, items){
			var listeTypes = items.map(function(x){return x.type});
			var cache = {};
			listeTypes = listeTypes.filter(function(elem, index, array){
				return cache[elem]?0:cache[elem]=1;
			});
			var liste = [];
			for(i in listeTypes){
				console.log('listeTypes[i]:', listeTypes[i]);
				var listeModeles = [];
				var type = listeTypes[i];
				for(j in items){
					console.log('items[j]:', items[j]);
					if(items[j]['type']==type){
						listeModeles.push(items[j]);
					}
				}
				var obj = {};
				obj['type']=type;
				obj['produits']=listeModeles;
				liste.push(obj);
			}
			res.setHeader('Content-type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(JSON.stringify(liste));
		});
	});
});

app.get('/produits/types/:type', function(req, res) {
    var liste = MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var typeAChercher = req.params.type;
        var all = db.collection('Produits').find({ 'type': typeAChercher }, { 'type': 1, 'marque': 1, 'modele': 1, 'prix': 1, 'stockage': 1, 'appreciation':1, '_id': 0 }).toArray(function(err, items) {
            var liste = [];
            //assert(null, err);
            for (val in items) {
                if (!contains(liste, items[val])) {
                    liste.push(items[val]);
                }
            }
            console.log('liste: ', liste);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(liste));
        });
    });
});

app.get('/panier/initialisation', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Panier').find().toArray(function(err, items) {
            console.log('Panier: ', items);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(items));
        });
    });
});

app.get('/panier/ajout/:modele/:prix', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var modeleAModifier = req.params.modele;
        var prix = parseInt(req.params.prix);

        var modeleExiste = false;
        var result = null;

        db.collection('Produits').find({ 'modele': modeleAModifier, "prix": prix }).toArray(function(err, items) {
            if (items.length == 0) {
                modeleExiste = false;
                console.log('La marchandise n\'existe pas');
            } else {
                modeleExiste = true;
                console.log('La marchandise existe');
            }
            if (modeleExiste) {
                console.log('J\'ajoute la marchandise');
                db.collection('Panier').findAndModify({ 'modele': modeleAModifier, 'prix': prix, 'marque': items[0]['marque'], 'stockage': items[0]['stockage'], 'type': items[0]['type'], 'appreciation':items[0]['appreciation']}, [], {
                        $inc: { 'quantity': 1 },
                    }, { new: true, upsert: true },
                    function(err, result) {
                        assert.equal(null, err);
                        db.collection('Panier').find({}, { '_id': 0, 'modele': 1, 'prix': 1, 'type': 1, 'marque': 1, 'stockage': 1, 'quantity': 1, 'appreciation':1 }).toArray(function(err, items) {

                            console.log('Panier: ', items);
                            res.setHeader('Content-type', 'application/json');
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.end(JSON.stringify(items));
                        });
                    }
                );
            } else {
                console.log('Pad besoin d\'ajouter le modèle');
            }
        });
    });
});

app.get('/panier/suppression/:modele/:prix', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var modeleAModifier = req.params.modele;
        var prix = parseInt(req.params.prix);

        var modeleExiste = false;

        db.collection('Panier').find({ 'modele': modeleAModifier, 'prix': prix }).toArray(function(err, items) {
            for (val in items) {
                modeleExiste = true;
            }

            if (modeleExiste) {
                console.log('J\'enleve une occurence de la marchandise : ', modeleAModifier, ', prix : ', prix);
                db.collection('Panier').findAndModify({ 'modele': modeleAModifier, 'prix': prix }, [], {
                        $inc: { 'quantity': -1 },
                    }, {},
                    function(err, result) {
                        assert.equal(null, err);
                        db.collection('Panier').remove({ 'quantity': 0 }, function(err, result) {
                            assert.equal(null, err);
                            db.collection('Panier').find({}, { '_id': 0, 'modele': 1, 'prix': 1, 'type': 1, 'marque': 1, 'quantity': 1, 'appreciation': 1 }).toArray(function(err, items) {
                                console.log('Panier: ', items);
                                res.setHeader('Content-type', 'application/json');
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.end(JSON.stringify(items));
                            });
                        });

                    }
                );
            } else {
                console.log('Marchandise non présente dans le panier :', modeleAModifier, ', prix : ', prix);
                db.collection('Panier').find({}, { '_id': 0, 'modele': 1, 'quantity': 1 }).toArray(function(err, items) {
                    console.log('Panier: ', items);
                    res.setHeader('Content-type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(JSON.stringify(items));
                });
            }
        });
    });
});

app.get('/panier/vider', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Panier').drop();
        console.log('Le panier a été vidé');
        db.collection('Panier').find({}, { '_id': 0, 'modele': 1, 'quantity': 1 }).toArray(function(err, items) {
            console.log('Panier: ', items);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(items));
        });
    });
});

app.get('/produits/prix/:prixMin/:prixMax', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var prixMin = parseInt(req.params.prixMin);
        var prixMax = parseInt(req.params.prixMax);
        console.log("Prix min :", prixMin, ", prixMax :", prixMax);
        db.collection('Produits').find({ 'prix': { $lte: prixMax, $gte: prixMin } }).toArray(function(err, items) {
            console.log('liste: ', items);
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(items));
        });

    });
});
app.listen(8888);
