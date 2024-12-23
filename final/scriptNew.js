'use strict';
/*

const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

//SLICE
console.log(arr.slice(2, 5));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//SPLICE
// console.log(arr.splice(3));
// console.log(arr);

//REVERSE
const arr2 = ['g', 'h', 'i', 'j', 'k'];
console.log(arr.reverse());

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log(arr);
console.log(arr2);

//JOIN
console.log([letters.join('*', '')]);

//AT
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (let [i, movement] of movements.entries()) {
  if (movement > 1) {
    console.log(`deposit ${i + 1}:${movement}`);
  } else {
    console.log(`withdraw Amount ${i + 1} :${Math.abs(movement)}`);
  }
}
//forEach loop
console.log('----------FOREACH---------------');
movements.forEach(function (movement, i, arr) {
  if (movement > 1) {
    console.log(`deposit ${i + 1}:${movement}`);
  } else {
    console.log(`withdraw Amount ${i + 1}
        :${Math.abs(movement)}`);
  }
});

//forEach eith use MAP & SET
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, currency) {
  console.log(`key ${key}: value${value}`);
  console.log(`currency :${currency}`);
});

console.log('-------SET------------');
const currency = new Set(['RUPEE', 'EUR', 'TURKISH', 'EUR', 'RUPEE']);
currency.forEach(function (value, key, set) {
  console.log(`key ${key}: value${value}`);
});
*/

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // const mov = sort ? movements.splice().sort((a, b) => a - b) : movements;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calDisplayBalance(account1.movements);

const calDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${income}€`;

  const outGoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur, arr) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outGoing)}€`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrest}€`;
};
// caldisplaySummary(account1.movements);

const createUserName = function (acc) {
  acc.forEach(function (acc) {
    acc.name = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserName(accounts);

//UPDATE UI

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //display Balance
  calDisplayBalance(acc);
  //Display Summary
  calDisplaySummary(acc);
  // console.log('LOGIN');
};

//EVENT HANDLER
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(accounts);
  currentAccount = accounts.find(acc => acc.name === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear Iput Field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //UPDATE UI
    updateUI(currentAccount);
  }

  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.name === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.name != currentAccount.name
    ) {
      //Treanfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      //UPDATE UI
      updateUI(currentAccount);
    }
  });
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.5)) {
    // Add Movements
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);

    //clear Input Field
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(
    inputCloseUsername.value,
    currentAccount.name,
    Number(inputClosePin.value),
    currentAccount.pin
  );
  if (
    inputCloseUsername.value === currentAccount.name &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('delete');
    const index = accounts.findIndex(acc => acc.name === currentAccount.name);

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

const { withdraw, deposit } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      cur > 0 ? (sum.deposit += cur) : (sum.withdraw += cur);
      return sum;
    },
    { withdraw: 0, deposit: 0 }
  );
// console.log(withdraw, deposit);

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount, movements, !sorted);
//   sorted = !sorted;
// });

//FlatMap()
const overBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
// console.log(overBalance);

// const flatBalance = overBalance.flat().reduce((acc, cur) => acc + cur, 0);
// console.log(flatBalance);

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

let julia = [3, 5, 2, 12, 7];
let kate = [4, 1, 15, 8, 3];
//1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
julia.splice(-2);
julia.splice(0, 1);

//2. Create an array with both Julia's (corrected) and Kate's data
let dog = julia.concat(kate);
console.log(dog);
//3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

dog.forEach(function (value, i, arr) {
  if (value >= 3) {
    console.log(`Dog number ${i + 1} is an adult, and is ${value} years old`);
  } else {
    console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  }
});


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// const usDollar = movements.map(function (movement) {
//   return movement * 1.41;
// });

// console.log(usDollar);

// const usDollar = [];
// for (let [i, value] of movements.entries()) {
//   usDollar.push(value * 1.1);
//   console.log(usDollar);
// }

// const usDollar = movements.map(function (mov, i) {
//   `Movements ${i + 1} : you ${mov > 0 ? 'deposit' : 'wihdraw'}`;
// });
// console.log(usDollar);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);

// console.log(withdrawals);

const balance = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`iteration ${i}: ${acc}`);
  return acc + cur;
}, 100);

const eurToUsd = 1.1;
//PIPELINE
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  .reduce((acc, cur) => acc + cur, 0);
// console.log(totalDepositUsd);

const firstWithdraw = movements.find(mov => mov > 0);
// console.log('firstWithdraw', firstWithdraw);

const finName = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
// console.log(finName);

//SOME Method
// console.log(movements.some(mov => mov > 1000000));

//EVERY Method
//Sort()

movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
// console.log(movements);

//Fill()
const arr = [1, 2, 3, 4, 5, 78];
const x = new Array(5);
// console.log(x);
x.fill(5);
// console.log(x);
arr.fill(20, 2, 4);
// console.log(arr);

const c = Array.from({ length: 10 }, () => 8);
// console.log(c);

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


//1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.

const age = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = age.map(function (age) {
  let humanAge;
  if (age <= 2) {
    humanAge = 2 * age;
  } else humanAge = 16 + age * 4;
  console.log(humanAge);
});

// const calcAverageHumanAge = function (age) {
//   let humanAge = age.map(age => (age <= 2 ? 2 * age : 16 + 2 * age));
// };
*/
//Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// return humanAgesAvg

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log('avg1', avg1, avg2);

const sortName = ['aygh', 'hgyh', 'zuhg', 'dfl', 'iuy'];
// console.log(sortName.sort());

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀


//1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dogs => (dogs.recFood = Math.trunc(dogs.weight ** 0.75 * 28)));


//2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

//3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dogs => dogs.curFood < dogs.recFood)
  .map(dog => dog.owners)
  .flat();


const ownersEatTooLittle = dogs
  .filter(dogs => dogs.curFood > dogs.recFood)
  .map(dog => dog.owners)
  .flat();


//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"


// const reverseMovement = movements.slice().reverse();
// const sliceOne = movements.slice(0,5);
// console.log(sliceOne);
// const spliceOne = movements.splice(0,5);
// console.log(spliceOne); 
// const splitOne = movements.split(' ');
// console.log(splitOne);


const groupMovement = Object.groupBy(movements,movements=> movements > 0 ? 'deposit': 'withdrawals');
*/