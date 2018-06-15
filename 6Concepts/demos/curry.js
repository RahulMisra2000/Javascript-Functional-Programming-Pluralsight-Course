const people = require('./people.json');

// Returns a filtered array whose every element has prop equal to value
// 3 input variables ------------
const filterEq  = (prop, value, arr)  => { return arr.filter((elem) => { return elem[prop] === value; }); };

// 2 input variables ------------
const isMarried = (value, arr)        => { return filterEq('married', value, arr); }

// 1 input variable ------------
const married   = (arr)               => { return isMarried(true, arr); }

// The above is called currying as we lower the number of input variables.

const out = married(people);
console.log(out);
