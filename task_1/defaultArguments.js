//Author: Nathan Javier Galarza Bonilla
//Date: 22/01/2022
//TASK:
// Write a function defaultArguments. It takes a function as an argument, along with an 
// object containing default values for that function's arguments, and returns another 
// function which defaults to the right values. 
// Requirements
// • You cannot assume that the function's arguments have any particular names.
// • You should be able to call defaultArguments repeatedly to change the defaults.


const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function add(a, b) {
    console.log(a + b);
    return a + b;
}
/**
 * Receives a function to convert it to a dynamic argument function eg: func = add(a,b) with args (a, b =10)
 * should return a dynamic funcion with default argument b to default to 9.
 * @param {func<function>, args<any>} function that will be used as a return function; args will
 * have default values of args eg: args.b could contain a value or an undefined.
 * @return {function} the constructed dynamic function with default arguments
 */

function defaultArguments(func, args) {

    let stringFunction = func.toString();
    let paramBuilder = stringFunction.match(/\(.+\)/)[0].replace("(", "").replace(")", "").split(",")
    let argumentFunction = getParamNames(func);

    for (i = 0; i < paramBuilder.length; i++) {
        paramBuilder[i] = "" + paramBuilder[i] + " = " + paramBuilder[i] + " || " + args[argumentFunction[i]] + ";"
    }
    for (i = 0; i < paramBuilder.length; i++) {
        stringFunction = stringFunction.replace("{", "{ " + paramBuilder[i] + "")
    }

    let newFunction = "var newFunc = " + stringFunction;
    eval(newFunction);
    return newFunc;
}


const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19); //true
console.assert(add2(10, 7) === 17); //true
console.assert(isNaN(add2())); //true

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13); //true
console.assert(add3() === 5); //true
console.assert(add3(undefined, 10) === 12); //true

const add4 = defaultArguments(add, { c: 3 });
console.assert(isNaN(add4(10))) //true;
console.assert(add4(10, 10) === 20); //true