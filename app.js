class Calculator {
    constructor(currentScr, previousScr) { //by passing screen elements as parameters we can EASILY change whats on the screen
        this.currentScr = currentScr;
        this.previousScr = previousScr;
        this.operationClicked = false; //to check when 
        this.equalsClicked = false;
        this.clear();
    }

    clear() {
        this.currentText = '';
        this.previousText = '';
        this.operation = undefined;
    }

    appendNumber(num) {
        if (num==="." && this.currentText.includes(".")) { //just to make sure we can't put multiple decimals
            return;
        }
        if (this.operationClicked === true) {
            this.currentText = '';
        }
        this.currentText += num;
    }

    operandClicked(op) {
        if (this.operation !== undefined && this.currentText==='') {
            return;
        }
        if (this.previousText !== '') {
            this.equalsButton();
        }
        this.operation = op;
        this.operationClicked = true;
        this.previousText = this.currentText + " " + op;
        //this.currentText = '';
    }

    equalsButton() {
        //this.previousText += " " + this.currentText;
        //this.currentText = eval(this.previousText);
        let answer;
        const prev = parseFloat(this.previousText);
        const curr = parseFloat(this.currentText);
        if (this.operation === '+') {
            answer = prev+curr;
        }
        else if (this.operation === '*') {
            answer = prev*curr;
        }
        else if (this.operation === '-') {
            answer = prev-curr;
        }
        else if (this.operation === '÷') {
            answer = prev/curr;
        }
        else return;
        this.previousText += ' ' + this.currentText + ' =';
        this.currentText = answer;
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousScr.textContent = this.previousText;
        this.currentScr.textContent = this.currentText;
    }
} 

let currentScr = document.querySelector(".current");
let previousScr = document.querySelector(".previous");
let operations = document.querySelectorAll(".operation");
let numbers = document.querySelectorAll(".number");
let DEL = document.querySelector(".DEL");
let AC = document.querySelector(".AC");
let equals = document.querySelector(".equals");

numbers.forEach((btn) => { //for each button in list of buttons "numbers",
    btn.addEventListener("click", () => { //add click event listener
        calc.appendNumber(btn.textContent);
        calc.updateDisplay();
    })
})

operations.forEach((btn) => { //for each button in list of buttons "operations",
    btn.addEventListener("click", () => { //add click event listener
        calc.operandClicked(btn.textContent);
        calc.updateDisplay();
    })
})

AC.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
})

equals.addEventListener("click", () => {
    calc.equalsButton();
    calc.updateDisplay();
})

const calc = new Calculator(currentScr, previousScr);
