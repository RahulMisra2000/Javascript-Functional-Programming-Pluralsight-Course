const R = require('ramda');
const people = require('./people.json');

// #region Supporting
console.log('\n'.repeat(250));
let out = 'no value';
// #endregion
const filterEq = (propName, propVal) =>
    R.filter(R.propEq(propName, propVal));
const filterNEq = (propName, propVal) =>
    R.filter(R.complement(R.propEq(propName, propVal)));

out = filterEq('married', true)(people);
const married = filterEq('married', true);
const unmarried = filterEq('married', false);
const women = filterEq('gender', 'Female');
const men = filterEq('gender', 'Male');
const withoutDnaTest = filterEq('dnaTestId', '');
const withDnaTest = filterNEq('dnaTestId', '');

out = withoutDnaTest(people);

//sorts:
const sortByProp = propName => R.sortBy(R.prop(propName));
const sortByPropDesc = propName =>
    R.compose(R.reverse, R.sortBy(R.prop(propName)));

out = sortByPropDesc('married')(people);

//compose evals R --> L
const marriedByAge = R.compose(sortByPropDesc('age'), married);
const menWithDnaTest = R.compose(men, withDnaTest);
const marriedMenWithDnaTestByAge = R.compose(
    sortByPropDesc('age'),
    withDnaTest,
    married,
    men
);

out = marriedMenWithDnaTestByAge(people);

// pipe evals L --> R
const marriedMenWithDnaTestByAge2 = R.pipe(
    men,
    married,
    withDnaTest,
    sortByProp('age')
);

out = marriedMenWithDnaTestByAge2(people);

const allBirthPlaces = R.map(itm => itm.birthplace);
out = allBirthPlaces(people);

allBirthplacesOrDefault = R.map(val =>
    R.propOr('(not specified)', 'birthplace', val)
);
out = allBirthplacesOrDefault(people);

//const allMotherIds = R.map(val => val.family.motherId);
const allMotherIds = R.map(val => R.path(['family', 'motherId'], val));
out = allMotherIds(people);
allMotherIdsOrDefault = R.map(val =>
    R.pathOr('(not specified)', ['family', 'motherId'], val)
);
out = allMotherIdsOrDefault(people);

const uniquePlaces = R.compose(R.uniq, allBirthplacesOrDefault);
const isSpecified = val => val !== '(not specified)';
const placesList = R.compose(
    R.sort((a, b) => a > b),
    R.filter(isSpecified),
    uniquePlaces
);

out = placesList(people);

// #region Supporting
console.log(out);
console.log(
    '\r\n\r\nNumRecords: ',
    typeof out === 'string' ? 1 : out.length
);

console.log(' ');
console.log('____________________________');

//#endregion
