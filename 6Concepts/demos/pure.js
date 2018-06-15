let c = 5;

// pure 
const func1 = (a, b) => a + b;

// impure because func2 accesses c which is not an input parameter to the function
const func2 = (a, b) => a + b + c; 

// impure because func3 accesses func1() which is not an input parameter to the function
const func3 = (a, b) => a + b + func1(a, b);

// impure because func4 modifies c which is outside the function
const func4 = (a, b) => {  c = a + b; };

// impure because func5 accesses console.log() function which is not an input parameter to the function
const func5 = (a, b) => { console.log(a + b); };

// impure because func6 accesses func1() which is not an input parameter to the function
const func6 = (a, b) => { func1(a, b); return a + b; };
