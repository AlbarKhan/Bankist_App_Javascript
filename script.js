"use strict";

const account1 = {
  owner: "Albar Khan",
  userid: "ak",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movementsDate: [
    "2019-11-18T21:31:17.178z",
    "2019-12-28T09  :21:17.178z",
    "2019-1-18T21:12:17.178z",
    "2019-2-18T21:47:17.178z",
    "2019-3-18T21:42:17.178z",
    "2019-4-18T21:14:17.178z",
    "2019-5-18T21:34:17.178z",
    "2019-6-18T21:21:17.178z",
  ],
  interestRate: 1.2,
  pin: 111,
};

const account2 = {
  owner: "Tausif shaikh",
  userid: "ts",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDate: [],
  interestRate: 1.1,
  pin: 222,
};

const accounts = [account1, account2];
// console.log(accounts);

const loginForm = document.querySelector(".login");
const app = document.querySelector(".app");
const user = document.getElementById("username");
const pin = document.getElementById("pin");
const welcomeText = document.querySelector(".welcome");
const Movement = document.querySelector(".movements");
const loanValue = document.querySelector(".form__input--loan-amount");
const requestAmount = document.querySelector(".form__input--amount");
const loanBtn = document.querySelector(".form__btn--loan");
const transferBtn = document.querySelector(".form__btn--transfer");
const requestedLoanAmount = document.querySelector(".form__input--loan-amount");
const sortBtn = document.querySelector(".btn--sort");
const labelBalance = document.querySelector(".balance_value");
const labelsummaryvaluein = document.querySelector(".summary__value--in");
const labelsummaryvalueOut = document.querySelector(".summary__value--out");
const closeAccountbtn = document.querySelector(".form__btn--close");
const closeAccountUserId = document.querySelector(".form__input--user");
const closeAccountPin = document.querySelector(".form__input--pin");
const balanceDateLabel = document.querySelector(".balance_date");
const labeltimer = document.querySelector(".timer");
let currentAccount, timer;
let currentUser;

const printWelcome = function (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], "Good Morning"],
    [[11, 12, 13, 14], "Good Day"],
    [[15, 16, 17, 18], "Good Afternoon"],
    [[19, 20, 21, 22], "Good Evening"],
    [[23, 1, 2, 3, 4, 5], "Good Night"],
  ]);
  const arr = [...greetings.keys()].find((key) => key.includes(now.getHours()));
  const greet = greetings.get(arr);
  welcomeText.textContent = `${greet} ${name}`;
  //   for (const [times, message] of greetings) {
  //     if (times.includes(hour)) {
  //       greeting = message;
  //       break;
  //     }
  //   }

  //   welcomeText.textContent = `${greeting}, ${name}!`;
  // };
};

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((accu, ele) => accu + ele);
  labelBalance.textContent = `$${balance}`;
  return balance;
};

const totalInOut = function (movements) {
  let totalIn = 0;
  let totalOut = 0;
  movements.forEach((mov) => {
    if (mov > 1) {
      totalIn += mov;
    } else {
      totalOut += mov;
    }
  });
  labelsummaryvaluein.textContent = `$${totalIn}`;
  labelsummaryvalueOut.textContent = `$${Math.floor(Math.abs(totalOut))}`;
  // return totalIn;
};

// .............................Display Movements.............................
const displayMovements = function (movements, sort = false) {
  Movement.innerHTML = "";
  const now = new Date();

  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;
  mov.reverse().forEach((movement, index) => {
    const newMovement = document.createElement("div");
    newMovement.className = "movements_row";
    let movementype = movement < 0 ? "withdrawl" : "deposit";

    // If The movement is Negative Then using Math.abs method to make it positive and the add the minus sign manually for proper Formatting
    const isNegative = movement < 0;
    const formattedMovement = `$${Math.abs(movement)}`;

    const displaValue = isNegative
      ? `-${formattedMovement}`
      : formattedMovement;

    newMovement.innerHTML = `
    <div class="movements-type movements-type--${movementype}">${
      movements.length - index
    } ${movementype}</div>
    <div class="movements__date text-secondary">${
      now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear()
    }</div>
    <div class="movements__value">${displaValue}</div>
    `;
    Movement.appendChild(newMovement);
  });
  return Movement;
};

function updateUI(account) {
  displayMovements(account.movements);
  calcPrintBalance(account.movements);
  totalInOut(account.movements);
  return;
}

// .............................SORTING .................................
let sorted = false;
sortBtn.addEventListener("click", function () {
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// .............................Transfer Money .................................
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const transerTo = document.querySelector(".form__input--to").value;

  const receiver = accounts.find(
    (acc) => acc.userid == transerTo.toLowerCase()
  );
  console.log(receiver);
  const balance = calcPrintBalance(currentAccount.movements);
  const amount = +requestAmount.value;
  if (
    receiver &&
    requestAmount &&
    balance >= amount &&
    receiver.userid != currentAccount.userid
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
  } else {
    alert("worgn user id");
    return;
  }
});
// console.log(currentAccount);

// .............................Loan Request.............................
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const accountBalance = Math.trunc(
    currentAccount.movements.reduce((accu, ele) => accu + ele)
  );
  const tenPercentOfBalance = Math.trunc(accountBalance * 0.1);
  if (requestedLoanAmount.value > 0) {
    if (tenPercentOfBalance >= requestedLoanAmount.value) {
      setTimeout(() => {
        currentAccount.movements.push(Number(requestedLoanAmount.value));
        requestedLoanAmount.value = "";
        updateUI(currentAccount);
      }, 3000);
    } else {
      alert("Not Enough money");
      return;
    }
  } else {
    return;
  }
});

const logoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labeltimer.textContent = `${min}:${sec}`;
    time--;
    if (time === 0) {
      clearInterval(timer);
      app.style.opacity = 0;
      welcomeText.textContent = "login to get started";
    }
  };
  let time = 600;
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

// close Account

closeAccountbtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("working...😂😂");
  if (
    currentAccount.userid == closeAccountUserId.value &&
    currentAccount.pin == closeAccountPin.value
  ) {
    console.log(closeAccountUserId.value);
    console.log(currentUser);
    accounts.splice(currentUser, 1);
    app.style.opacity = 0;
    welcomeText.textContent = "login to get started";
  } else {
    return;
  }
  closeAccountUserId.value = "";
  closeAccountPin.value = "";
});

// logoutTimer();
// .............................LOGIN Form.............................
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let userAuthentticated = false;
  const now = new Date();
  accounts.forEach((account, index) => {
    if (
      !userAuthentticated &&
      user.value.toLowerCase() === account.userid &&
      Number(pin.value) === account.pin
    ) {
      userAuthentticated = true;
      currentUser = index;
      currentAccount = accounts[currentUser];
      printWelcome(account.owner);
      updateUI(account);
      if (timer) clearInterval(timer);
      timer = logoutTimer();
      balanceDateLabel.textContent = `As of ${new Intl.DateTimeFormat(
        "en-GB"
      ).format(now)}`;
    }
  });

  if (userAuthentticated) {
    app.style.opacity = 1;
    user.value = "";
    pin.value = "";
    userAuthentticated = false;
  } else {
    alert("Wrong id Password");
  }
  currentAccount;
});

// const arr = [1, 2, 1, 1];

// arr.push(999);
