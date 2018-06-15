const people = require('./people.json');

const filterEq  = (prop, value, arr) => { return arr.filter((elem) => { return elem[prop] === value; });  };
const filterNEq = (prop, value, arr) => { return arr.filter((elem) => { return elem[prop] !== value; });  };

const compose = (...funcs) => {
        // Calling compose() returns a function
        return (data) => { return funcs.reduceRight((value, func) => { return func(value); }, data);
    };
};

const filterMarried = (arr) => filterEq('married', true, arr);
const filterSingle = (arr) => filterEq('married', false, arr);
const filterWomen = (arr) => filterEq('gender', 'Female', arr);
const filterMen = (arr) => filterNEq('gender', 'Female', arr);

const marriedWomen = compose(filterWomen, filterMarried);
const marriedMen = compose(filterMen, filterMarried);
const singleWomen = compose(filterWomen, filterSingle);
const singleMen = compose(filterMen, filterSingle);

const out = singleMen(people);

console.log(out);
