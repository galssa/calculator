
//              ----- PROBLEMS ------       //
// 1) negate and square root are not being applied on Overflow

// input
const result = document.getElementById('result');
const smallResult = document.getElementById('small-result');
// buttons
const nums = document.querySelectorAll('.num');
const percent = document.getElementById('percent');
const clearEntry = document.getElementById('clear-entry');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const oneByX = document.getElementById('one-by-x');
const xSquare = document.getElementById('x-square');
const sqRtX = document.getElementById('sq-rt-x')
const negate = document.getElementById('negate');
// operators ( +, -, *, /)
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const equalto = document.getElementById('equalto');


// General Functions
function resultIntReplace(toReplaceWith) {
    result.innerHTML = BigInt(parseFloat(toReplaceWith))
}
function resultIntIncrement(toReplaceWith) {
    result.innerHTML += BigInt(parseFloat(toReplaceWith))
}
function resultIntDecimal(toReplaceWith) {
    result.innerHTML += toReplaceWith
}
function resultIntSq(toReplaceWith) {
    console.log(toReplaceWith);

    if (isNaN(toReplaceWith)) {
        result.innerHTML = 'Overflow'
    }
    else if (toReplaceWith ** 2 != 'Infinity' && toReplaceWith ** 2 != 'Overflow') {
        if (result.innerHTML.slice(-1) == '%') {
            console.log('it ends with % sign')
            smallResult.innerHTML = '(' + parseFloat(result.innerHTML) / 100 + ')²'
            result.innerHTML = (toReplaceWith / 100) ** 2
        } else {
            console.log('it does not ends with % sign')
            smallResult.innerHTML = '(' + parseFloat(result.innerHTML) + ')²'
            result.innerHTML = parseFloat(toReplaceWith) ** 2
        }
    } else if (toReplaceWith ** 2 == 'Overflow' || toReplaceWith ** 2 == 'Infinity') {
        result.innerHTML = 'Overflow'
        toReplaceWith = 'Overflow'
    }

}

// Percent function
percent.addEventListener('click', () => {
    if (result.innerHTML != 'Can not Divide by Zero!') {
        if (result.innerHTML.includes('.') && result.innerHTML.slice(-1) != '.') {
            smallResult.innerHTML = result.innerHTML
            result.innerHTML = result.innerHTML * 100 + '%'
        } else if (smallResult.innerHTML.slice(-1) == '/' && result.innerHTML != 0) {
            smallResult.innerHTML = smallResult.innerHTML.slice(0, -1) / result.innerHTML
            result.innerHTML = parseFloat(smallResult.innerHTML) * 100 + '%'
        }
    }
})

// Clear Entry function
clearEntry.addEventListener('click', () => {
    result.innerHTML = 0;
})

// Clear function
clear.addEventListener('click', () => {
    result.innerHTML = 0;
    smallResult.innerHTML = '';
})

// Backspace function
backspace.addEventListener('click', () => {
    if (result.innerHTML != 0 && result.innerHTML.length != 1) {
        result.innerHTML = result.innerHTML.slice(0, -1)
    } else if (result.innerHTML.length == 1) {
        result.innerHTML = 0;
    }
})

// 1/x function
oneByX.addEventListener('click', () => {
    if (isNaN(parseFloat(result.innerHTML)) == false) {
        if (result.innerHTML != 0) {
            if (result.innerHTML.slice(-1) == '%') {
                smallResult.innerHTML = `1/(${parseFloat(result.innerHTML) / 100})`
                result.innerHTML = eval(smallResult.innerHTML);
            } else {
                if (result.innerHTML != 'Overflow') {
                    smallResult.innerHTML = `1/(${parseFloat(result.innerHTML)})`
                    result.innerHTML = 1 / result.innerHTML
                } else {

                }
            }
        } else {
            result.innerHTML = 'Can not Divide by Zero!'
        }
    }
})

// x² function

xSquare.addEventListener('click', () => {
    if (result.innerHTML != 'Can not Divide by Zero!') {
        resultIntSq(parseFloat(result.innerHTML))
    }
})

// ²√x function

sqRtX.addEventListener('click', () => {
    if (result.innerHTML != 'Can not Divide by Zero!') {
        if (result.innerHTML.slice(-1) == '%') {
            smallResult.innerHTML = ''
        } else {
            smallResult.innerHTML = `√(${parseFloat(result.innerHTML)})`
            result.innerHTML = result.innerHTML ** (1 / 2)
        }
    }
})

// nums function
for (const num of nums) {
    num.addEventListener('click', () => {
        if (result.innerHTML.slice(-1) != '%') {

            if (smallResult.innerHTML.slice(-1) == '=') {
                smallResult.innerHTML = ''
            }
            if (result.innerHTML != 'Can not Divide by Zero!') {
                if (result.textContent.includes('.') == false || num.innerHTML != '.') {
                    if (num.innerHTML != '.') {
                        result.innerHTML == '0' ? resultIntReplace(num.innerHTML) : resultIntIncrement(num.innerHTML)
                    }
                    else if (num.innerHTML == '.') {
                        resultIntDecimal(num.innerHTML)
                    }
                }
            } else {
                result.innerHTML = num.innerHTML
            }
        }
    })
}

// negate
negate.addEventListener('click', () => {
    smallResult.innerHTML = `negate(${parseFloat(result.innerHTML)})`;
    result.innerHTML = -(result.innerHTML)
})

// operations
/**
 * @param {string} sybmol
 */
const operator = (sybmol) => {
    if (smallResult.innerHTML.slice(0, 7) == 'negate(') {
        console.log(smallResult.innerHTML.slice(7, -1).slice(-1))
        switch (smallResult.innerHTML.slice(7, -1).slice(-1)) {
            case '+':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) + parseFloat(result.innerHTML) + sybmol
                break;
            case '-':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) - parseFloat(result.innerHTML) + sybmol
                break;
            case '*':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) * parseFloat(result.innerHTML) + sybmol
                break;
            case '/':
                if (result.innerHTML == '0') {
                    smallResult.innerHTML = 'Math Error'
                    setTimeout(() => {
                        smallResult.innerHTML = ''
                    }, 1000);
                } else {

                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) / parseFloat(result.innerHTML) + sybmol
                }
                break;
            default:
                smallResult.innerHTML = result.innerHTML + sybmol
                break;
        }
        result.innerHTML = 0
    } else if (smallResult.innerHTML.slice(-2) == ')²') {
        switch (smallResult.innerHTML.slice(1, -2).slice(-1)) {
            case '+':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) + parseFloat(result.innerHTML) + sybmol
                break;
            case '-':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) - parseFloat(result.innerHTML) + sybmol
                break;
            case '*':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) * parseFloat(result.innerHTML) + sybmol
                break;
            case '/':
                if (result.innerHTML == '0') {
                    smallResult.innerHTML = 'Math Error'
                    setTimeout(() => {
                        smallResult.innerHTML = ''
                    }, 1000);
                } else {

                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) / parseFloat(result.innerHTML) + sybmol
                }
                break;
            default:
                smallResult.innerHTML = result.innerHTML + sybmol
                break;
        }
        result.innerHTML = 0
    } else if (smallResult.innerHTML.slice(0, 2) == '√(') {
        switch (smallResult.innerHTML.slice(1, -2).slice(-1)) {
            case '+':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) + parseFloat(result.innerHTML) + sybmol
                break;
            case '-':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) - parseFloat(result.innerHTML) + sybmol
                break;
            case '*':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) * parseFloat(result.innerHTML) + sybmol
                break;
            case '/':
                if (result.innerHTML == '0') {
                    smallResult.innerHTML = 'Math Error'
                    setTimeout(() => {
                        smallResult.innerHTML = ''
                    }, 1000);
                } else {

                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) / parseFloat(result.innerHTML) + sybmol
                }
                break;
            default:
                smallResult.innerHTML = result.innerHTML + sybmol
                break;
        }
        result.innerHTML = 0
    } else if (smallResult.innerHTML.slice(0, 3) == '1/(') {
        switch (smallResult.innerHTML.slice(1, -2).slice(-1)) {
            case '+':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) + parseFloat(result.innerHTML) + sybmol
                break;
            case '-':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) - parseFloat(result.innerHTML) + sybmol
                break;
            case '*':
                smallResult.innerHTML = parseFloat(smallResult.innerHTML) * parseFloat(result.innerHTML) + sybmol
                break;
            case '/':
                if (result.innerHTML == '0') {
                    smallResult.innerHTML = 'Math Error'
                    setTimeout(() => {
                        smallResult.innerHTML = ''
                    }, 1000);
                } else {

                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) / parseFloat(result.innerHTML) + sybmol
                }
                break;
            default:
                smallResult.innerHTML = result.innerHTML + sybmol
                break;
        }
        result.innerHTML = 0
    } else {

        if (smallResult.innerHTML.slice(-1) == '=') {
            smallResult.innerHTML = ''
        }
        if (smallResult.innerHTML.slice(-1) == '') {
            console.log('enterd in IF statement')
            smallResult.innerHTML = result.innerHTML + sybmol
        } else if (smallResult.innerHTML.slice(-1) == '+' || smallResult.innerHTML.slice(-1) == '-' || smallResult.innerHTML.slice(-1) == '*' || smallResult.innerHTML.slice(-1) == '/') {
            console.log('enterd in 1st ELSE IF statement')
            switch (smallResult.innerHTML.slice(-1)) {
                case '+':
                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) + parseFloat(result.innerHTML) + sybmol
                    break;
                case '-':
                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) - parseFloat(result.innerHTML) + sybmol
                    break;
                case '*':
                    smallResult.innerHTML = parseFloat(smallResult.innerHTML) * parseFloat(result.innerHTML) + sybmol
                    break;
                case '/':
                    if (result.innerHTML == '0') {
                        smallResult.innerHTML = 'Math Error'
                        setTimeout(() => {
                            smallResult.innerHTML = ''
                        }, 1000);
                    } else {

                        smallResult.innerHTML = parseFloat(smallResult.innerHTML) / parseFloat(result.innerHTML) + sybmol
                    }
                    break;
                default:
                    smallResult.innerHTML = result.innerHTML + sybmol
                    break;
            }
        }
        result.innerHTML = '0'
    }
}
plus.addEventListener('click', () => {
    operator('+')
})

minus.addEventListener('click', () => {
    operator('-')
})
multiply.addEventListener('click', () => {
    operator('*')
})
divide.addEventListener('click', () => {
    operator('/')
})


//      -- EQUAL TO --      //
equalto.addEventListener('click', () => {
    if (smallResult.innerHTML.slice(-1) == '+' || smallResult.innerHTML.slice(-1) == '-' || smallResult.innerHTML.slice(-1) == '*' || smallResult.innerHTML.slice(-1) == '/') {
        smallResult.innerHTML = smallResult.innerHTML + result.innerHTML + '='
        if (eval(smallResult.innerHTML.slice(0, -1)) != 'Infinity') {
            result.innerHTML = eval(smallResult.innerHTML.slice(0, -1))
        } else {
            smallResult.innerHTML = 'Math Error'
            setTimeout(() => {
                smallResult.innerHTML = ''
            }, 1000);
        }
    }
})

//               ..;;;$$$$
//             ....;;;;;$$$$$$
//          ......;;;;;;$$$$$$$$
//        ......;;;;;;;;;;;$$$$$$$
//      ....;;;;;;;;;;;;;;;;;$$$$$$$$
//    .....;;;;;;;        ;;;;;;$$$$$$$
//   .....;;;;;;            ;;;;;$$$$$$$
//  .....;;;;;                ;;;;$$$$$$$
//   .....;;;;;              ;;;;$$$$$$$
//    .....;;;;;;           ;;;;$$$$$$$
//     .....;;;;;;;       ;;;;;;$$$$$$
//      .....;;;;;;;    ;;;;;;$$$$$$$
//        .....;;;;;; ;;;;;;;$$$$$$
//          ......;;;;;;;;;;;$$$$
//            .....;;;;;;;;;$$$$
//              ...........$$$$
