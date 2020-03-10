function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let operations = [];
    let numbers = [];
    let exprArr = String(expr).split("").filter(item => item !== ' ');
    for (let i = 0; i < exprArr.length; i++) {
        if (/\d+/.test(exprArr[i]) && /\d+/.test(exprArr[i + 1])) {
            exprArr[i] += exprArr[i + 1];
            exprArr.splice(i + 1, 1);
            i--;
        }
    }

    let brackets1 = 0;
    let brackets2 = 0;
    for (let i = 0; i < exprArr.length; i++) {
        if (exprArr[i] === '(') {
            brackets1++;
            continue;
        }
        if (exprArr[i] === ')') {
            brackets2++;
        }
    }
    if (brackets1 !== brackets2) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    for (let i = 0; i < exprArr.length; i++) {
        if (/\d+/.test(exprArr[i])) {
            numbers.push(Number(exprArr[i]));
            continue;
        }
        if (exprArr[i] === '(') {
            operations.push(exprArr[i]);
            continue;
        }
        if (exprArr[i] === ')') {
            while (operations[operations.length - 1] !== '(') {
                calc();
            }
            operations.pop();
            continue;
        }
        if (priority[exprArr[i]] > priority[operations[operations.length - 1]]) {
            operations.push(exprArr[i]);
            continue;
        }
        while (priority[exprArr[i]] <= priority[operations[operations.length - 1]]) {
            calc();
        }

        operations.push(exprArr[i]);

    }

    function calc() {
        let act = operations.pop();
        switch (act) {
            case '+': {
                numbers.push(numbers.pop() + numbers.pop());
                break;
            }
            case '-': {
                let second = numbers.pop();
                let first = numbers.pop();
                numbers.push(first - second);
                break;
            }
            case '*': {
                numbers.push(numbers.pop() * numbers.pop());
                break;
            }
            case '/': {
                let second = numbers.pop();
                let first = numbers.pop();
                if (second === 0) throw new Error("TypeError: Division by zero.");
                numbers.push(first / second);
            }

        }
    }

    while (operations.length > 0) {
        calc();
    }

    return numbers.pop();
}

module.exports = {
    expressionCalculator
}