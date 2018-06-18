// --------------------------------------------------------------------------------------------------
// VERY IMPORTANT
// --------------------------------------------------------------------------------------------------
// Pull down ramda.js using npm
// If you want to use Ramda.js in node environment with pure javascript then you need to do require() as shown below
// If you want to use Ramda.js in node environment with typescript then you can bring down the types file as well and use import syntax
// If you want to use Ramda.js in a browser environment using pure javascript then you would pull it in using <script tag 
// If you want to use Ramda.js in a browser environment with typescript (Angular does that for example)
//    then you could do the nice design pattern described in Angular google drive doc for lodash
// 
// --------------------------------------------------------------------------------------------------


const R = require('ramda');
const people = require('./people.json');

let out = 'no value';

// Ramda provides a filter method. It has over 200 methods, check out the documentation  -----------
// --------------------------------------------------------------------------------------------------
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

// Example of executing one of the above pure functions
out = withoutDnaTest(people);

// We can use the Ramada.js's R.compose() method to do COMPOSITION (another feature of Functional Programming) *************
const sortByProp      = propName => R.sortBy(R.prop(propName));
const sortByPropDesc  = propName => R.compose(R.reverse, R.sortBy(R.prop(propName)));

// sortByPropDesc is a function defined above ... to execute it we need to do () after it, ie why we have (people) after it ....
out = sortByPropDesc('married')(people);  
                                          
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

// Ramda.js's map() method returns a new list (think array) of things, returned by the function it is procided, 
// just like how pure javascript's array's map method returns **********
const allBirthPlaces        = R.map(itm => { return itm.birthplace});
out = allBirthPlaces(people);

// R.propOr() returns the value of a prperty specified and if that property does not exist then it returns a specified default
// In this example we want to return (not specified) if the birthplace property is not specified in the top level people array of
// objects.... 
// NOTE:birthplace is A TOP LEVEL property of the array of objects in people.json
// ... Another file in the github is people.json...take a look at it ...
// This is what people.json looks like
//[
//  {
//        "givenNames": ["Henry", "Louis"],
//        "surname": "Jones",
//        "age": 35,
//        "birthplace": "Philadelphia, PA",
//        "gender": "Male",
//        "married": true,
//        "living": true,
//        "dnaTestId": "db19023875c349dcaba2f6fde0bb443e",
//        "family": {
//           "motherId": 1,
//            "fatherId": 2,
//            "siblings": []
//        }
//    },
//    {
//        "givenNames": ["Mary"],
//        "surname": "Smithson",
//        "age": 48,
//        "gender": "Female",
//        "married": false,
//        "living": true,
//        "dnaTestId": "e1ac5265-01a1-4f4d-9afc-e2dcdc4bcfa8",
//       "family": {
//            "motherId": 3,
//            "fatherId": 4,
//            "siblings": [5, 6]
//        }
//    }
// ]

allBirthplacesOrDefault     = R.map(val => { return R.propOr('(not specified)', 'birthplace', val)} );
out = allBirthplacesOrDefault(people);

// This will give you an eror if either family is not a property or motherId is not a property of family.
// const allMotherIds        = R.map(val => val.family.motherId);

// So, to avoid the error use R.path(). We tell path the full path to the property whose value we are interested in ....
const allMotherIds          = R.map(val => R.path(['family', 'motherId'], val));
out = allMotherIds(people);

// Again just like R.propOr we have R.pathOr .... just in case we want some default value returned if there is no such property
allMotherIdsOrDefault       = R.map(val => R.pathOr('(not specified)', ['family', 'motherId'], val));
out = allMotherIdsOrDefault(people);

// R.uniq() will remove duplicates from the output of the function to its right ...
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
