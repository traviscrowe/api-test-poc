const Nedb = require('nedb')
    , db = new Nedb({ filename: 'data/cars.db', autoload: true });
const uuid = require('uuid/v1');

function list(req, res) {
    db.find({}, (err, docs) => {
        res.json(docs);
    });
}

function get(req, res) {
    const id = req.swagger.params.id.value;
    db.findOne({ _id: id }, (err, doc) => {
        if (!doc) {
            res.sendStatus(404);
        }
        res.json(doc);
    });
}

function create(req, res) {
    const car = req.body;
    if (!car._id) car._id = uuid();
    db.insert(car, (err, newDoc) => {
        if (!newDoc) {
            res.sendStatus(404);
        }
        res.json(newDoc);
    });
}

function put(req, res) {
    const car = req.body;
    const id = req.swagger.params.id.value;
    db.update({ _id: id }, car, (err, number) => {
        if (number === 0) {
            res.sendStatus(404);
        }
        res.send({ updated: true });
    });
}

function remove(req, res) {
    const id = req.swagger.params.id.value;
    db.remove({ _id: id }, (err, number) => {
        if (number === 0) {
            res.sendStatus(404);
        }
        res.json({ deleted: true });
    });
}

module.exports = {
    get: get,
    list: list,
    create: create,
    put: put,
    delete: remove
  };