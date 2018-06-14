const people = require('./people.json');

// #region Supporting
console.log('\n'.repeat(250));
// #endregion

const filterEq = (prop, value, arr) => {
    return arr.filter((elem) => {
        return elem[prop] === value;
    });
};
const filterNEq = (prop, value, arr) => {
    return arr.filter((elem) => {
        return elem[prop] !== value;
    });
};

const compose = (...funcs) => {
    return (data) => {
        return funcs.reduceRight((value, func) => {
            return func(value);
        }, data);
    };
};

const isMarried = (value, arr) => filterEq('married', value, arr);

const married = (arr) => isMarried(true, arr);
const single = (arr) => isMarried(false, arr);

const out = single(people);

// #region Supporting
console.log(out);
console.log(
    '\r\n\r\nNumRecords: ',
    typeof out === 'string' ? 1 : out.length
);
console.log(' ');
console.log('____________________________');

// #endregion
