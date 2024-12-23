// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scriptNew.js":[function(require,module,exports) {
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
var account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  // %
  pin: 1111
};
var account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};
var account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};
var account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};
var accounts = [account1, account2, account3, account4];

// Elements
var labelWelcome = document.querySelector('.welcome');
var labelDate = document.querySelector('.date');
var labelBalance = document.querySelector('.balance__value');
var labelSumIn = document.querySelector('.summary__value--in');
var labelSumOut = document.querySelector('.summary__value--out');
var labelSumInterest = document.querySelector('.summary__value--interest');
var labelTimer = document.querySelector('.timer');
var containerApp = document.querySelector('.app');
var containerMovements = document.querySelector('.movements');
var btnLogin = document.querySelector('.login__btn');
var btnTransfer = document.querySelector('.form__btn--transfer');
var btnLoan = document.querySelector('.form__btn--loan');
var btnClose = document.querySelector('.form__btn--close');
var btnSort = document.querySelector('.btn--sort');
var inputLoginUsername = document.querySelector('.login__input--user');
var inputLoginPin = document.querySelector('.login__input--pin');
var inputTransferTo = document.querySelector('.form__input--to');
var inputTransferAmount = document.querySelector('.form__input--amount');
var inputLoanAmount = document.querySelector('.form__input--loan-amount');
var inputCloseUsername = document.querySelector('.form__input--user');
var inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
var displayMovements = function displayMovements(movements) {
  containerMovements.innerHTML = '';
  // const mov = sort ? movements.splice().sort((a, b) => a - b) : movements;

  movements.forEach(function (mov, i) {
    var type = mov > 0 ? 'deposit' : 'withdrawal';
    var html = "\n    <div class=\"movements__row\">\n      <div class=\"movements__type movements__type--".concat(type, "\">").concat(i + 1, " ").concat(type, "</div>\n      <div class=\"movements__value\">").concat(mov, "\u20AC</div>\n    </div>\n  ");
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

var calDisplayBalance = function calDisplayBalance(acc) {
  acc.balance = acc.movements.reduce(function (acc, move) {
    return acc + move;
  }, 0);
  labelBalance.textContent = "".concat(acc.balance, "\u20AC");
};
// calDisplayBalance(account1.movements);

var calDisplaySummary = function calDisplaySummary(acc) {
  var income = acc.movements.filter(function (mov) {
    return mov > 0;
  }).reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelSumIn.textContent = "".concat(income, "\u20AC");
  var outGoing = acc.movements.filter(function (mov) {
    return mov < 0;
  }).reduce(function (acc, cur, arr) {
    return acc + cur;
  }, 0);
  labelSumOut.textContent = "".concat(Math.abs(outGoing), "\u20AC");
  var intrest = acc.movements.filter(function (mov) {
    return mov > 0;
  }).map(function (mov) {
    return mov * acc.interestRate / 100;
  }).filter(function (int, i, arr) {
    return int >= 1;
  }).reduce(function (acc, int) {
    return acc + int;
  }, 0);
  labelSumInterest.textContent = "".concat(intrest, "\u20AC");
};
// caldisplaySummary(account1.movements);

var createUserName = function createUserName(acc) {
  acc.forEach(function (acc) {
    acc.name = acc.owner.toLocaleLowerCase().split(' ').map(function (word) {
      return word[0];
    }).join('');
  });
};
createUserName(accounts);

//UPDATE UI

var updateUI = function updateUI(acc) {
  //Display Movements
  displayMovements(acc.movements);
  //display Balance
  calDisplayBalance(acc);
  //Display Summary
  calDisplaySummary(acc);
  // console.log('LOGIN');
};

//EVENT HANDLER
var currentAccount;
btnLogin.addEventListener('click', function (e) {
  var _currentAccount;
  e.preventDefault();
  // console.log(accounts);
  currentAccount = accounts.find(function (acc) {
    return acc.name === inputLoginUsername.value;
  });
  if (((_currentAccount = currentAccount) === null || _currentAccount === void 0 ? void 0 : _currentAccount.pin) === Number(inputLoginPin.value)) {
    //Display UI
    labelWelcome.textContent = "welcome back, ".concat(currentAccount.owner.split(' ')[0]);
    containerApp.style.opacity = 100;

    //Clear Iput Field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //UPDATE UI
    updateUI(currentAccount);
  }
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    var amount = Number(inputTransferAmount.value);
    var receiverAcc = accounts.find(function (acc) {
      return acc.name === inputTransferTo.value;
    });
    inputTransferAmount.value = inputTransferTo.value = '';
    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && (receiverAcc === null || receiverAcc === void 0 ? void 0 : receiverAcc.name) != currentAccount.name) {
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
  var amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(function (mov) {
    return mov >= amount * 0.5;
  })) {
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
  console.log(inputCloseUsername.value, currentAccount.name, Number(inputClosePin.value), currentAccount.pin);
  if (inputCloseUsername.value === currentAccount.name && Number(inputClosePin.value) === currentAccount.pin) {
    console.log('delete');
    var index = accounts.findIndex(function (acc) {
      return acc.name === currentAccount.name;
    });

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
var _accounts$flatMap$red = accounts.flatMap(function (acc) {
    return acc.movements;
  }).reduce(function (sum, cur) {
    cur > 0 ? sum.deposit += cur : sum.withdraw += cur;
    return sum;
  }, {
    withdraw: 0,
    deposit: 0
  }),
  withdraw = _accounts$flatMap$red.withdraw,
  deposit = _accounts$flatMap$red.deposit;
// console.log(withdraw, deposit);

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount, movements, !sorted);
//   sorted = !sorted;
// });

//FlatMap()
var overBalance = accounts.flatMap(function (acc) {
  return acc.movements;
}).reduce(function (acc, cur) {
  return acc + cur;
}, 0);
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

var calcAverageHumanAge = function calcAverageHumanAge(ages) {
  return ages.map(function (age) {
    return age <= 2 ? 2 * age : 16 + age * 4;
  }).filter(function (age) {
    return age >= 18;
  }).reduce(function (acc, age, i, arr) {
    return acc + age / arr.length;
  }, 0);
};
// return humanAgesAvg

var avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
var avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log('avg1', avg1, avg2);

var sortName = ['aygh', 'hgyh', 'zuhg', 'dfl', 'iuy'];
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
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62466" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scriptNew.js"], null)
//# sourceMappingURL=/scriptNew.a55035d1.js.map