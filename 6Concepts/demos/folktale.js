const F = require('folktale');
const people = require('./people.json');
// #region Supporting
console.log('\n'.repeat(250));
let out = 'no output';
// #endregion

/* Maybe:
const findFirst = (list, predicate) => {
    const rv = list.find(itm => {
        return predicate(itm);
    });
    return rv ? F.maybe.Just(rv) : F.maybe.Nothing();
};
const getAllGivenNames = item => {
    const rv = item.givenNames;
    return rv ? F.maybe.Just(rv) : F.maybe.Nothing();
};

const getSecondGivenName = item => {
    return item.length > 1 ? F.maybe.Just(item[1]) : F.maybe.Nothing();
};

const getPersonMiddleName = (data, fn) => {
    return findFirst(data, fn)
        .chain(getAllGivenNames)
       .chain(getSecondGivenName)
       .matchWith({
           Just: ({ value }) => value,
          Nothing: () => {
                console.log('No middle name found');
               return '';
           }
       });
};

out = getPersonMiddleName(
    people,
    x => x.surname === 'Dutton' && x.gender === 'Female'
);

*/

/* Result:
let iter = 0;
const mayFail = () => {
    iter++;
    const n = Math.floor(Math.random() * 10 + 1) <= 9;
    return n
        ? F.result.Ok('Made all ' + iter + ' iterations successfully')
        : F.result.Error('failed on iteration: ' + iter);
};

out = mayFail()
    .chain(mayFail)     // only executes on "Ok" result
    .chain(mayFail)
    .chain(mayFail)
    .chain(mayFail)
    .matchWith({
        Ok: ({ value }) => value,
        Error: ({ value }) => {
            console.log(value);
            return '';
        }
    });

    */

/* Validation:
const minLength = (fieldName, minLen, value) =>
    value && value.length && value.length > minLen
        ? F.validation.Success(value)
        : F.validation.Failure([
              `${fieldName} must be more than ${minLen} characters long`
          ]);
const noSpaces = (fieldName, value) =>
    value.indexOf(' ') === -1
        ? F.validation.Success(value)
        : F.validation.Failure([
              `${fieldName} cannot contain a space`
          ]);

const passwordValid = pw =>
    F.validation
        .Success()
        .concat(noSpaces('Password', pw))
        .concat(minLength('Password', 5, pw));

const nameValid = name =>
    F.validation.Success().concat(noSpaces('Name', name));

out = F.validation
    .collect([passwordValid('p@$$word'), nameValid('dave')])
    .matchWith({
        Success: ({ value }) => `Success: ${value}`,
        Failure: ({ value }) => `Failure: ${value}`
    });
*/

// #region Supporting
console.log(out);

console.log(' ');
console.log('____________________________');

// #endregion
