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
