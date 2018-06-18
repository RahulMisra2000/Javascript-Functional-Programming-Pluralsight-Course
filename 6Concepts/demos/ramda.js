
// VERY IMPORTANT --------------------------------------------------------------------------
// If you are using nodejs with pure javascript then you need to do require() as shown below
// If you want to use Ramda.js in a browser environment then 
//      1. you would pull it in using <script tag  OR 
//      2. If you are using Angular then you could do the nice design pattern described in Angular google drive doc for lodash
// 

const R = require('ramda');
const people = require('./people.json');

// #region Supporting
console.log('\n'.repeat(250));
let out = 'no value';
// #endregion


const filterEq  = (propName, propVal) => R.filter(R.propEq(propName, propVal));
const filterNEq = (propName, propVal) => R.filter(R.complement(R.propEq(propName, propVal)));

out = filterEq('married', true)(people);

// LOTS of simple short PURE FUNCTIONS --- Feature of Functional Programmings ****************
const married = filterEq('married', true);
const unmarried = filterEq('married', false);
const women = filterEq('gender', 'Female');
const men = filterEq('gender', 'Male');
const withoutDnaTest = filterEq('dnaTestId', '');
const withDnaTest = filterNEq('dnaTestId', '');

out = withoutDnaTest(people);

//sorts:
const sortByProp = propName => R.sortBy(R.prop(propName));

// We can use the Ramada.js's R.compose() method to do COMPOSITION (another feature of Functional Programming) *************
const sortByPropDesc = propName => R.compose(R.reverse, R.sortBy(R.prop(propName)));

out = sortByPropDesc('married')(people);  // sortByPropDesc is a function ... to execute it we need to do () after it 
                                          // that is why we have (people) after it ....

//Ramda's R.compose() method executes the function name parameters supplied to it from R --> L   *************************
const marriedByAge                  = R.compose(sortByPropDesc('age'), married);
const menWithDnaTest                = R.compose(men, withDnaTest);
const marriedMenWithDnaTestByAge    = R.compose(
                                                    sortByPropDesc('age'),
                                                    withDnaTest,
                                                    married,
                                                    men
                                                );
out = marriedMenWithDnaTestByAge(people);

//Ramda's R.pipe() method executes the function name parameters supplied to it from L --> R   *************************
const marriedMenWithDnaTestByAge2   = R.pipe(
                                                    men,
                                                    married,
                                                    withDnaTest,
                                                    sortByProp('age')
                                                );
out = marriedMenWithDnaTestByAge2(people);


const allBirthPlaces        = R.map(itm => itm.birthplace);
out = allBirthPlaces(people);

allBirthplacesOrDefault     = R.map(val => R.propOr('(not specified)', 'birthplace', val));
out = allBirthplacesOrDefault(people);

//const allMotherIds        = R.map(val => val.family.motherId);
const allMotherIds          = R.map(val => R.path(['family', 'motherId'], val));
out = allMotherIds(people);

allMotherIdsOrDefault       = R.map(val => R.pathOr('(not specified)', ['family', 'motherId'], val));
out = allMotherIdsOrDefault(people);

const uniquePlaces          = R.compose(R.uniq, allBirthplacesOrDefault);
const isSpecified = val => val !== '(not specified)';

const placesList            = R.compose(
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
