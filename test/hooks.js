let hooks = require('hooks');
let before = hooks.before;
let after = hooks.after;

const CARS_POST = '/cars > POST > 200 > application/json; charset=utf-8';
const CARS_GET = '/cars/{id} > GET > 200 > application/json; charset=utf-8'
const CARS_PUT = '/cars/{id} > PUT > 200 > application/json; charset=utf-8';
const CARS_DELETE = '/cars/{id} > DELETE > 200 > application/json; charset=utf-8';

let stash = {};

hooks.after(CARS_POST, (transaction) => {
    stash[transaction.name] = transaction.real;
});

hooks.before(CARS_PUT, (transaction) => {
    transaction.fullPath = replaceIdFromStash(transaction.fullPath);
});

hooks.before(CARS_GET, (transaction) => {
    transaction.fullPath = replaceIdFromStash(transaction.fullPath);
});

hooks.before(CARS_DELETE, (transaction) => {
    transaction.fullPath = replaceIdFromStash(transaction.fullPath);
});

function replaceIdFromStash(path) {
    let carId = JSON.parse(stash[CARS_POST].body)['_id'];

    return path.replace('id', carId);
}
