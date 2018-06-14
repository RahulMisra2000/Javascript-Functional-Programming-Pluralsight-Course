let c = 5;

const func1 = (a, b) => a + b; // pure

const func2 = (a, b) => a + b + c; // impure

const func3 = (a, b) => a + b + func1(a, b); // impure

const func4 = (a, b) => {
    // impure
    c = a + b;
};

const func5 = (a, b) => {
    // impure
    console.log(a + b);
};

const func6 = (a, b) => {
    // impure
    func1(a, b);
    return a + b;
};
