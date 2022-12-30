const gridcont = document.querySelector('.btn-grid');
const buttons = gridcont.querySelectorAll('button');
const displaytop = document.getElementById('top');
const displaybottom = document.getElementById('bottom');

const check = {
    checkNumber: /^[\d]{1,}$/,
    checkCalc: /^$/,
};

buttons.forEach(button => {
    button.classList.add('btn');
    if (parseInt(button.textContent) > 0) {
        button.classList.add('number');
    }
});

let opIsClicked = false;
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.className === "btn number") {
            if (opIsClicked) {
                number = displaybottom.textContent;
                opIsClicked = false;
                displaybottom.textContent = "";
            }
            displaybottom.textContent = displaybottom.textContent + `${e.target.textContent}`;
        } else if (e.target.className === "btn operator") {
            opIsClicked = true;
            if (check.checkNumber.test(displaybottom.textContent)) {
                displaytop.textContent = displaybottom.textContent.concat(" ", `${e.target.textContent}`);
            }
        }
    });
});

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
    if (operator === "+") {
        return add(number, anNumber);
    } else if (operator === "-") {
        return substract(number, anNumber);
    } else if (operator === "÷" || operator === "/") {
        if (anNumber === 0) {
            alert('Division by zero');
            return NaN;
        }
        return divide(number, anNumber);
    } else if(operator === "*" || operator === "x") {
        return multiply(number, anNumber);
    } else {
        return null;
    }
}