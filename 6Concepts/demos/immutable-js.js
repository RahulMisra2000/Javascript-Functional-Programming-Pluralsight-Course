const I = require('immutable');
const people = require('./people.json');
// #region Supporting
console.log('\n'.repeat(250));
let out = 'no output';
// #endregion


// Converting a javascript array to Immutable.js's  List data structure
out = I.List(['a', 'b']);

// Converting a javascript object to Immutable.js's  Map data structure
out = I.Map({ a: 'b', c: 123 });
out = I.Map({ a: 'b', c: { d: 123 } });

// const iPeople = I.List(people);
// out = iPeople;
const iPeople = I.fromJS(people);
out = iPeople;
out = iPeople.first();
out = iPeople.first().get('surname', '(none)');
out = iPeople.first().getIn(['family', 'fatherId'], '(none)');

const filterEq = (propName, propVal) => data =>
    data.filter(itm => itm.get(propName) === propVal);

out = filterEq('married', true)(iPeople);

const married = filterEq('married', true);
const withoutDnaTest = filterEq('dnaTestId', '');
out = married(iPeople);

const filterPathEq = (propPath, propVal) => data =>
    data.filter(itm => itm.getIn(propPath) === propVal);

const fatherIdIs = id => filterPathEq(['family', 'fatherId'], id);
const fatherIdIs2 = fatherIdIs(2);
out = fatherIdIs2(iPeople);

const idx = iPeople.findIndex(
    (value, index, object) =>
        value.has('family')
            ? value.getIn(['family', 'fatherId']) === 2
            : false
);
out = idx;

const iPeople2 =
    idx === -1
        ? iPeople
        : //: iPeople.setIn([idx, 'family', 'fatherId'], 321);
          iPeople.updateIn(
              [idx, 'family', 'fatherId'],
              val => val + 319
          );
out = fatherIdIs2(iPeople2);
out = fatherIdIs2(iPeople);
const fatherIdIs321 = fatherIdIs(321);
out = fatherIdIs321(iPeople2);

// #region Supporting
console.log(out);

console.log(' ');
console.log('____________________________');

// #endregion
