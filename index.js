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

let result;
let content = [];

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.className === "btn number" || e.target.id === "last") {
            setNumbers(e.target);
        } else if (e.target.className === "btn operator") {
           getPartResult(e.target);
        } else if (e.target.id === "dot") {
            appendPoint();
        } else if (e.target.className === "btn del") {
            removeLast();
        } else if (e.target.className === "btn ac") {
            displaytop.textContent = "";
            displaybottom.textContent = "";
        } 
        else if (e.target.id === "equal") {
            completeResult();
        }
    });
});

document.addEventListener('keyup', (e) => {
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        getPartResult(e);
    } else if (e.key >= 0 && e.key <= 9) {
        setNumbers(e);
    } else if (e.key === ".") {
        appendPoint();
    } else if (e.key === "Backspace") {
        removeLast();
    } else if (e.key === "Enter" || e.key === "=") {
        completeResult();
    }
});

function setNumbers(e) {
    if (displaytop.textContent.includes("=")) {
        displaytop.textContent = "";
    }
    return e.key >= 0 && e.key <= 9 ? displaybottom.textContent += `${e.key}` : displaybottom.textContent += `${e.textContent}`;
}

function checkForNums() {
    let operation = [];
    let withNum;
    if (displaytop.textContent !== "" && displaybottom.textContent !== "") {
        operation = displaytop.textContent.split(" ");
        withNum = displaybottom.textContent;
        return operate(operation[1], operation[0], withNum);
    }
}

function getPartResult(e) {
    let type;
    let keyPress;
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        type = "keyboard"
        if (e.key === "*") {
            keyPress = "x";
        } else if (e.key === "/") {
            keyPress = "÷";
        } else {
            keyPress = e.key;
        }
    } else {
        type = "button";
    }

    result = checkForNums();
    if (result === null && parseInt(displaytop.textContent) === "0" && (keyPress === "÷" || e.textContent === "÷")) {
        alert("Hey, you! You can't divide by zero!");    
    } else if (displaytop.textContent.includes("=")) {
        content = displaytop.textContent.split(" ");
        displaytop.textContent = type === "button" ? `${content[content.length - 1]} ${e.textContent}` : `${content[content.length - 1]} ${keyPress}`;
        displaybottom.textContent = "";
    } else if (result !== null && result !== undefined) {
        displaytop.textContent = `${result} ${e.textContent}`;
        displaybottom.textContent = "";
    } 
    else if (displaybottom.textContent !== "") {
        displaytop.textContent = type === "button" ? `${displaybottom.textContent} ${e.textContent}` : `${displaybottom.textContent} ${keyPress}`;
        displaybottom.textContent = "";
    }  else {
        content = displaytop.textContent.split(" ");
        content[1] = type === "button" ? e.textContent : keyPress;
        displaytop.textContent = content.join(" ");
    }
}

function appendPoint() {
    if (!(displaybottom.textContent.includes("."))) {
        displaybottom.textContent += ".";
    }
}

function removeLast() {
    if (displaybottom.textContent !== "") {
        content = displaybottom.textContent.split("");
        content.pop();
        displaybottom.textContent = content.join("");
    }
}

function completeResult() {
    if (displaybottom.textContent !== "") {
        result = checkForNums();
        if (result !== null) {
            content = displaytop.textContent.split(" ");
            content.push(displaybottom.textContent, "=", result);
            displaybottom.textContent = "";
            displaytop.textContent = content.join(" ");
        } else {
            alert("Hey, you! You can't divide by zero!");
        }
    }
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
            return null;
        }
        return Math.round((divide(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else if(operator === "*" || operator === "x") {
        return Math.round((multiply(number, anNumber) + Number.EPSILON) * 100) / 100;
    } else {
        return null;
    }
}