const ui = document.querySelector("#ui");

var equation;
var equationList = [];

var operatorText = "padding: 0px; display: inline-block; margin: 8px; height: 30px; width: 50px;";

var pushedDecimal = false;

const addBtn = document.createElement('button');
addBtn.innerHTML = "+";
addBtn.style.cssText = operatorText;
addBtn.addEventListener('click', addToDisplay);
ui.appendChild(addBtn);

const subBtn = document.createElement('button');
subBtn.innerHTML = "-";
subBtn.style.cssText = operatorText;
subBtn.addEventListener('click', addToDisplay);
ui.appendChild(subBtn);

const mulBtn = document.createElement('button');
mulBtn.innerHTML = "*";
mulBtn.style.cssText = operatorText;
mulBtn.addEventListener('click', addToDisplay);
ui.appendChild(mulBtn);

const divBtn = document.createElement('button');
divBtn.innerHTML = "/";
divBtn.style.cssText = operatorText;
divBtn.addEventListener('click', addToDisplay);
ui.appendChild(divBtn);

for (i = 1; i < 10; i++) {
    const num = document.createElement('button');
    num.innerHTML = i.toString();
    num.style.cssText = "display: inline-block; margin: 8px; height: 40px; width: 60px;";
    num.addEventListener('click', addToDisplay);
    ui.appendChild(num);
}

const clear = document.createElement('button');
clear.innerHTML = 'Clear';
clear.style.cssText = "padding: 0; display: inline-block; margin: 8px; height: 40px; width: 60px;";
clear.addEventListener('click', clearDisplay);
ui.appendChild(clear);

const zero = document.createElement('button');
zero.innerHTML = '0';
zero.style.cssText = "display: inline-block; margin: 8px; height: 40px; width: 60px;";
zero.addEventListener('click', addToDisplay);
ui.appendChild(zero);

const equal = document.createElement('button');
equal.innerHTML = '=';
equal.style.cssText = "display: inline-block; margin: 8px; height: 40px; width: 60px;";
equal.addEventListener('click', calculate);
ui.appendChild(equal);

const backSpace = document.createElement('button');
backSpace.innerHTML = 'Back';
backSpace.style.cssText = "padding: 0; display: inline-block; margin: 8px; height: 40px; width: 60px;";
backSpace.addEventListener('click', () => {
    displayText.innerHTML = displayText.innerHTML.substring(0,  displayText.innerHTML.length-1);
});
ui.appendChild(backSpace);

const deci = document.createElement('button');
deci.innerHTML = '.';
deci.style.cssText = "display: inline-block; margin: 8px; height: 40px; width: 60px;";
deci.addEventListener('click', addToDisplay);
ui.appendChild(deci);

var display = document.querySelector("#display");

const displayText = document.createElement("h1");
displayText.innerHTML = "";
displayText.style.cssText = "padding-top: 1px; padding-bottom: 5px; margin: 5px; font-family: Arial";
display.appendChild(displayText);

function addToDisplay(e) {
    displayText.innerHTML = displayText.innerHTML + e.target.innerHTML;
}

function clearDisplay() {
    displayText.innerHTML = "";
    equationList = [];
}

function calculate() {
    equation = displayText.innerHTML;
    var prev = 'a';
    num = '';
    for (i = 0; i < equation.length; i++) {
        var curr = equation.charAt(i);
	if (curr == '-' && (i == 0 || isNaN(prev) ) ) {
	    num += curr;
	    equation.slice(0,i) + equation.slice(i+1, equation.length);
	} else if (!isNaN(curr)) {
	    //its a number, add it to the end of the number string
	    num += curr;
	} else if (curr === '.') {
	    num += curr;
	} else {
	    //its not a number, push number to array, push op to array, and clear num
	    equationList.push(Number(num));
	    equationList.push(curr);
            num = '';
	}
	prev = curr;
    }
    if (num) {
        equationList.push(Number(num));
	num = '';
    }
    console.log(equationList);
    process(equationList);
    equationList = [];
}

function process(equation) {
    for (i = 0; i < equation.length; i++) {
        if (equation[i] === "/" || equation[i] === "*") {
	    var res = operate( equation[i], equation[i-1], equation[i+1]);
	    console.log(res);
	    console.log(equation);
	    equation.splice(i-1,3,res); 
	    i -= 2;
	} 
    }

    for (j = 0; j < equation.length; j++) {
        if (equation[j] === "+" || equation[j] === "-"){
	    var res = operate( equation[j], equation[j-1], equation[j+1]);
	    console.log(res);
	    console.log(equation);
	    equation.splice(j-1,3,res);
	    j -= 2;
	}
    }

    displayText.innerHTML = (Number(equation[0])).toString();
}

function operate( op, num1, num2 ) {
    switch (op) {
        case '+':
	    return add(num1, num2).toFixed(8);
            break;
        case '-':
	    return sub(num1, num2).toFixed(8);
            break;
        case '*':
            return mul(num1, num2).toFixed(8);
            break;
        case '/':
            return div(num1, num2).toFixed(8);
            break;
    }
}

const add = (a, b) => { return a + b };
const sub = (a, b) => { return a - b };
const mul = (a, b) => { return a * b };
const div = (a, b) => { return a / b };
