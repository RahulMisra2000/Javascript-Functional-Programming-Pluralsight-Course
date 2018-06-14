const { create, env } = require('sanctuary');
const people = require('./people.json');
const S = create({
    checkTypes: true,
    env: env
});
// #region Supporting
console.log('\n'.repeat(250));
let out = 'no output';
// #endregion
const filterEq = (propName, propVal) =>
    S.filter(item => item[propName] === propVal);
const filterNEq = (propName, propVal) =>
    S.filter(item => item[propName] !== propVal);

out = filterEq('married', true)(people);
const married = filterEq('married', true);
const unmarried = filterEq('married', false);
const women = filterEq('gender', 'Female');
const men = filterEq('gender', 'Male');
const withoutDnaTest = filterEq('dnaTestId', '');
const withDnaTest = filterNEq('dnaTestId', '');

out = men(people);
const sortByProp = propName => S.sortBy(S.prop(propName));
const sortByPropDesc = propName =>
    S.compose(S.reverse, S.sortBy(S.prop(propName)));

out = sortByPropDesc('married')(people);

//compose evals R --> L, (binary)
const marriedByAge = S.compose(sortByPropDesc('age'), married);
const menWithDnaTest = S.compose(men, withDnaTest);
const marriedMenWithDnaTestByAge = S.compose(
    S.compose(marriedByAge, withDnaTest),
    men
);

out = marriedMenWithDnaTestByAge(people);

const marriedMenWithDnaTestByAge2 = S.pipe([
    marriedByAge,
    withDnaTest,
    men
]);

out = marriedMenWithDnaTestByAge2(people);

const isAge = age => filterEq('age', age);
const first = S.curry2((pred, data) => S.head(pred(data)));
const is68 = first(isAge(68));
out = is68(people);
out = S.prop(
    'surname',
    S.fromMaybe({ surname: '(none)' }, is68(people))
);

// #region Supporting
console.log(out);
console.log(
    '\r\n\r\nNumRecords: ',
    typeof out === 'string' ? 1 : out.length
);

console.log(' ');
console.log('____________________________');

// #endregion
