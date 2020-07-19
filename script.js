// Numbers entered by the user are temporarily stored in the buffer variable,
// until they are transferred in firstOperand / secondOperand. 
let buffer = "";
let firstOperand = "";
let secondOperand = "";
let firstNumber = true;
let operator = "";
let result = "";
let equalsToggle = false;
let resultDisplay = document.getElementById("result");
resultDisplay.innerHTML = "0";
let history = document.getElementById("history");
let numbers = document.getElementsByClassName("numbers");
let operators = document.getElementsByClassName("operators");
let equals = document.getElementById("equals");

disableEquals();
disableOperators();

let add = document.getElementById("add");
add.addEventListener("click", () => {
    clickOperator(add.id, add.innerHTML);
})

let subtract = document.getElementById("subtract");
subtract.addEventListener("click", () => {
    clickOperator(subtract.id, subtract.innerHTML);
})

let multiply = document.getElementById("multiply");
multiply.addEventListener("click", () => {
    clickOperator(multiply.id, multiply.innerHTML);
})

let divide = document.getElementById("divide");
divide.addEventListener("click", () => {
    clickOperator(divide.id, divide.innerHTML);
})

equals.addEventListener("click", () => {
    secondOperand = buffer;
    if (secondOperand !== "") {
        result = operate(firstOperand, secondOperand, operator);
        }
    resultDisplay.innerHTML = thousandSeparator(result);
    firstOperand = result;
    history.innerHTML += secondOperand;
    history.innerHTML += equals.innerHTML;
    buffer = "";
    disableEquals();
    equalsToggle = true;
    dot.disabled = false;
    if (result === "CANNOT DIVIDE BY ZERO, click Clear") {
        zeroDivision();
    }
})


let one = document.getElementById("one");
one.addEventListener("click", () => {
    clickNumber(one.innerHTML);
})

let two = document.getElementById("two");
two.addEventListener("click", () => {
    clickNumber(two.innerHTML);
})

let three = document.getElementById("three");
three.addEventListener("click", () => {
    clickNumber(three.innerHTML);
})

let four = document.getElementById("four");
four.addEventListener("click", () => {
    clickNumber(four.innerHTML);
})

let five = document.getElementById("five");
five.addEventListener("click", () => {
    clickNumber(five.innerHTML);
})

let six = document.getElementById("six");
six.addEventListener("click", () => {
    clickNumber(six.innerHTML);
})

let seven = document.getElementById("seven");
seven.addEventListener("click", () => {
    clickNumber(seven.innerHTML);
})

let eight = document.getElementById("eight");
eight.addEventListener("click", () => {
    clickNumber(eight.innerHTML);
})

let nine = document.getElementById("nine");
nine.addEventListener("click", () => {
    clickNumber(nine.innerHTML);
})

let zero = document.getElementById("zero");
zero.addEventListener("click", () => {
    clickNumber(zero.innerHTML);
})


let dot = document.getElementById("dot");
dot.addEventListener("click", () => {
    buffer += ".";
    resultDisplay.innerHTML += ".";
    dot.disabled = true;
})

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    reset();
})

// Backspace 
let back = document.getElementById("back");
back.addEventListener("click", () => {
    buffer = buffer.slice(0,-1);
        if (buffer !== ""){
            resultDisplay.innerHTML = buffer;
        }else {
            resultDisplay.innerHTML = "0";
        }
           
})

// link calculator buttons to keys
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
        case ".":
            dot.click();
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
                clickNumber(e.key);
            break;                                    
        case "=":
        case "Enter":   
            equals.click();
            break;
        case "+":
            add.click();
            break;
        case "-":
            subtract.click();
            break;
        case "*":
            multiply.click();
            break;
        case "/":
            divide.click();
            break;            
        case "Escape":
            clear.click();
            break;
        case "Backspace":
            back.click();
            break;    
            
    }
}
)

function clickNumber(number) {
    if (buffer.length < 15){
        buffer += number;
    }
    resultDisplay.innerHTML = thousandSeparator(buffer); 
    disableEquals();
    disableOperators();
}

function clickOperator(operation, display) {
    dot.disabled = false;
    check();
    operator = operation;
    history.innerHTML += display;
    firstNumber = false;
    disableEquals();
    disableOperators();
}

function check() {
    if (firstNumber === true){
        firstOperand = buffer;
        history.innerHTML += thousandSeparator(firstOperand);
        buffer = "";
    }else if (firstNumber === false) {
        secondOperand = buffer;
        if (secondOperand !== "") {
        result = operate(firstOperand, secondOperand, operator);
        }
        resultDisplay.innerHTML = thousandSeparator(result);
        firstOperand = result;
        buffer = "";
        history.innerHTML += thousandSeparator(secondOperand);
        secondOperand = "";
        if( equalsToggle === true) {
            history.innerHTML = thousandSeparator(result);
            equalsToggle = false;
        }
        if (result === "CANNOT DIVIDE BY ZERO, click Clear") {
            zeroDivision(); 
        }
    }
}

function disableOperators() {
    for (let oper of operators) {
        if (buffer === "") {
            oper.disabled = true;
        }else {
            oper.disabled = false;
        }
    }    
}

function disableEquals() {
    if (firstNumber === true || firstOperand === "" || buffer === "") {
        equals.disabled = true;
    }else {
        equals.disabled = false;
    }
}

function zeroDivision() {
    for (let number of numbers){
        number.disabled = true;
    }
    for (let oper of operators){
        oper.disabled = true;
    }
    equals.disabled = true;
    dot.disabled = true;
    back.disabled = true;
}

function reset() {
    firstOperand = "";
    secondOperand = "";
    firstNumber = true;
    operator = "";
    result = "";
    buffer = "";
    history.innerHTML = "";
    resultDisplay.innerHTML = "0";
    equalsToggle = false;
    for (let number of numbers){
        number.disabled = false;
    }
    for (let oper of operators){
        oper.disabled = false;
    }
    dot.disabled = false;
    back.disabled = false;
    
}

function operate(firstOperand, secondOperand, operator) {
    numb1 = Number(firstOperand);
    numb2 = Number(secondOperand);
    let decimals = decimalsLength(numb1, numb2);
    switch (operator) {
        case "add":
            if (decimals === 0) {
                decimals = decimalsLength((numb1 + numb2), 0);
            }
            
            return decimalsRound((numb1 + numb2), decimals);
            break;
        case "subtract":
            if (decimals === 0) {
                decimals = decimalsLength((numb1 - numb2), 0);
            }
            return decimalsRound((numb1 - numb2), decimals);
            break;
        case "multiply":
            if (decimals === 0) {
                decimals = decimalsLength((numb1 * numb2), 0);
            }
            return decimalsRound((numb1 * numb2), decimals);
            break;
        case "divide":
            if (decimals === 0) {
                decimals = decimalsLength((numb1 / numb2), 0);
            }
            return numb2 !== 0 ? decimalsRound((numb1 / numb2), decimals) : "CANNOT DIVIDE BY ZERO, click Clear";
            break;    
    }
}

// Calculates which number has the most decimal places
function decimalsLength(number1, number2) {
    number1 = number1.toString();
    let arr1 = number1.split(".");
    let decimalNumber1 = 0;
    if (arr1.length === 1) {
        decimalNumber1 = 0;
    }else {
        decimalNumber1 = arr1[1].length;
    }    
    if (decimalNumber1 > 16) {
        decimalNumber1 = 16;
    }
    
   number2 =number2.toString();
    let arr2 =number2.split(".");
    let decimalNumber2 = 0;
    if (arr2.length === 1) {
        decimalNumber2 = 0;
    }else {
        decimalNumber2 = arr2[1].length;
    }    
    if (decimalNumber2 > 16) {
        decimalNumber2 = 16;
    }    
    return Math.max(decimalNumber1, decimalNumber2);
}

// Corrects floating point rounding errors and converts long numbers 
// to their exponential form
function decimalsRound(calculation, decimals) {
    let result = calculation.toFixed(decimals);
   
    if (result.length > 18){
       return Number(result).toExponential();
   }else {
       return result;
   }
    
} 

function thousandSeparator(number) {
    let arr = number.split(".");
    if (arr.length === 1){
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }else if (arr.length === 2) {
        arr[0] = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return arr.join(".");
    }     
}




