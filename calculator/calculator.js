/*****/
const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) {return;
    
    }

        const key = e.target;
        const displayedNum = display.textContent;

        //pure function
        const resultString = createResultString(
            key,
            displayedNum,
            calculator.dataset);

        //update states    
        display.textContent = resultString;

        //pass in necesary values
        updateCalculatorState(key, calculator, resultString, displayedNum);

        updateVisualState(key, calculator);
});

const calculate = (n1, operator, n2) => {
    //perform calculation and returrn calculated value
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') { return firstNum + secondNum; }

    if (operator === 'subtract') { return firstNum - secondNum; }

    if (operator === 'multiply') { return firstNum * secondNum; }

    if (operator === 'divide') { return firstNum / secondNum; }
}

const getKeyType = key => {
    const { action } = key.dataset;
    if (!action) {
        return 'number';
    }
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        return 'operator';
    }
    return action;
}

const createResultString = (key, displayedNum, state) => {

    const keyContent = key.textContent;
    const keyType = getKeyType(key);
    //const { action } = key.dataset;
    const { firstValue,
        modValue,
        operator,
        previousKeyType } = state;


    if (keyType === 'number') {
        return displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? keyContent
            : displayedNum + keyContent;
    }

    if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) {
            return displayedNum + '.';
        }
        if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            return '0.';
        }
        return displayedNum;
    }

    if (keyType === 'operator') {
        //const firstValue = calculator.dataset.firstValue;
        //const operator = calculator.dataset.operator;

        return firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? calculate(firstValue, operator, displayedNum)
            : displayedNum;
    }

    if (keyType === 'clear') { return 0; }

    if (keyType === 'calculate') {
        //let firstValue = calculator.dataset.firstValue;
        //const operator = calculator.dataset.operator;
        //let secondValue = displayedNum;

        return firstValue
            ? previousKeyType === 'calculate'
                ? calculate(displayedNum, operator, modValue)
                : calculate(firstValue, operator, displayedNum)
            : displayedNum;
    }
}

const updateCalculatorState = (
    key,
    calculator,
    calculatedValue,
    displayedNum
) => {
    /* Variables & properties needed:
        1. keey
        2. calculator
        3. calculatedValue
        4. displayedNum
        5. modValue
    */
    const keyType = getKeyType(key);
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = calculator.dataset;

    calculator.dataset.previousKeyType = keyType;

    //remove .is-depressed class from all keys

    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue =
            firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
                ? calculatedValue
                : displayedNum
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum
    }

    if (keyType === 'clear' && key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
    }
}

const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k =>
        k.classList.remove('is-depressed')
    )

    if (keyType === 'operator') key.classList.add('is-depressed')

    if (keyType === 'clear' && key.textContent !== 'AC') {
        key.textContent = 'AC'
    }

    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }
}