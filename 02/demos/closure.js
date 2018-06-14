// #region Supporting
console.log('\n'.repeat(250));
// #endregion

function orangeSquare() {
    var triangle = 'hello from inside';
    var blueCircle = function() {
        console.log(triangle);
    };
    return blueCircle;
}
var outsideVar = orangeSquare();
outsideVar();
// console.log(triangle);

// #region Supporting
console.log(' ');
console.log('____________________________');

// #endregion
