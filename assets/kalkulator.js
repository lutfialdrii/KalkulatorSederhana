const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCaculator() {
    calculator.displayNumber = '0';
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
}
function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari nol
        calculator.displayNumber = '0';
    } else {
        alert('operator sudah ditetapkan')
    }
}
function performCalculation(){
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result =parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

function inputDigit(digit) {
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        //mendapatkan objek elemen yang diklik
        const target = event.target;

        if(target.classList.contains('clear')) {
            clearCaculator();
            updateDisplay();
            return;
        }
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
  
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}