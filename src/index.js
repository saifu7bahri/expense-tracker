let state = {
    balance: 3000,
    income: 2000,
    expense: 1000,
    transactions: [
        // { id: unique(), name: 'Salary', amount: 5000, type: "income" },
        // { id: unique(), name: 'Bills', amount: 200, type: "expense" },
        // { id: unique(), name: 'Insurance', amount: 400, type: "expense" }
    ]
}

const balanceElement = document.querySelector('#balance');
const incomeElement = document.querySelector('#income');
const expenseElement = document.querySelector('#expense');
const historyElement = document.querySelector('#history');
const addIncomeElement = document.querySelector('#addInc');
const addExpenseElement = document.querySelector('#addExp');
const nameInputElement = document.querySelector('#name');
const amountInputElement = document.querySelector('#amount');


function initialize() {
    updateState();
    initializeListeners();
}

function uniqueId() {
    return Math.round(Math.random() * 1000000);
}

function initializeListeners() {
    addIncomeElement.addEventListener('click', onAddIncomeClick);
    addExpenseElement.addEventListener('click', onAddExpenseClick);
}
// for convenience
function addTransaction(name, amount, type) {
    if (name !== '' && amount !== '') {
        let transaction = {
            id: uniqueId(),
            name: name, 
            amount: parseInt(amount),
            type: type
         }; 

        state.transactions.push(transaction);
        
        console.log(state);//test
        
        updateState(); // call this to go through the checks
    }   else {
        alert('Data is invalid.')
    }
    nameInputElement.value = ""; //empty the box once clicked
    amountInputElement.value = "";
 
}

function onAddIncomeClick() {
    addTransaction(nameInputElement.value, amountInputElement.value, 'income');
}

function onAddExpenseClick() {
    addTransaction(nameInputElement.value, amountInputElement.value, 'expense');
}

function removalClick(event) {
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;

    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id === id) {
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);
    updateState();
}

function updateState() {
    var balance = 0,
        income = 0,
        expense = 0,
        item;

    for (var i = 0; i < state.transactions.length; i++){
        item = state.transactions[i]; // declare item variable again

        if (item.type === 'income') {
            income += item.amount;
        } else if (item.type === 'expense') {
            expense += item.amount;
        }
    }
    balance = income - expense;

    console.log(balance, income, expense); //check if its working
    state.balance = balance;
    state.income = income;
    state.expense = expense;

    render();
}

function render() {
    balanceElement.innerHTML = `$${state.balance}`;
    incomeElement.innerHTML = `$${state.income}`;
    expenseElement.innerHTML = `$${state.expense}`;

    var transactionElement, boxElement, amountElement, item, btnElement;
// create the variables before storing
    historyElement.innerHTML = '';

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i]; //declare itemn variable
        transactionElement = document.createElement('li');
        transactionElement.append(item.name); //adding a li under transaction

        historyElement.appendChild(transactionElement);

        boxElement = document.createElement('div');
        amountElement = document.createElement('span');
        if (item.type === 'income') {
            amountElement.classList.add('inc-amt');
        } else if (item.type === 'expense') {
            amountElement.classList.add('exp-amt');
        }
        amountElement.innerHTML = `$${item.amount}`;

        boxElement.appendChild(amountElement);

        btnElement = document.createElement('button');
        btnElement.setAttribute('data-id', item.id);
        btnElement.innerHTML = 'X';

        btnElement.addEventListener('click', removalClick);

        boxElement.appendChild(btnElement);

        transactionElement.appendChild(boxElement);

    }
}
initialize();