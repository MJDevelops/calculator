const gridcont = document.querySelector('.btn-grid');
const buttons = gridcont.querySelectorAll('button');
const displaytop = document.getElementById('top');
const displaybottom = document.getElementById('bottom');

buttons.forEach(button => {
    button.classList.add('btn');
    if (parseInt(button.textContent) > 0) {
        button.classList.add('number');
    }
});

let opIsClicked = false;
let result;
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.className === "btn number" || e.target.id === "last") {
            displaybottom.textContent = displaybottom.textContent + `${e.target.textContent}`;
        } else if (e.target.className === "btn operator") {
            opIsClicked = true;
            result = checkForNums();
            if (result !== null) {
                displaytop.textContent = `${result} ${e.target.textContent}`;
                result = null;
                return;
            }
            displaytop.textContent += `${displaybottom.textContent} ${e.target.textContent}`;
            displaybottom.textContent = "";
        } else if (e.target.id === "dot") {
            displaybottom.textContent += ".";
        }
    });
});



function checkForNums() {
    let operation = [];
    let withNum;
    if (displaytop.textContent !== "" && displaybottom.textContent !== "") {
        operation = displaytop.textContent.split(" ");
        withNum = displaybottom.textContent;
        return operate(operation[1], operation[0], withNum);
    }
    return null;
}

function add(number, anNumber) {
    return number + anNumber;
}

function substract(number, anNumber) {
    return number - anNumber;
}

function multiply(number, anNumber) {
    return number * anNumber;
}

function divide(number, anNumber) {
    return number / anNumber;
}

function operate(operator, number, anNumber) {
    if (String(number).includes(".") || String(anNumber).includes(".")) {
        number = parseFloat(number);
        anNumber = parseFloat(anNumber);
    } else {
        number = parseInt(number);
        anNumber = parseInt(anNumber);
    }

    if (operator === "+") {
        return Math.round((add(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else if (operator === "-") {
        return Math.round((substract(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else if (operator === "÷" || operator === "/") {
        if (anNumber === 0) {
            return NaN;
        }
        return Math.round((divide(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else if(operator === "*" || operator === "x") {
        return Math.round((multiply(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else {
        return null;
    }
}