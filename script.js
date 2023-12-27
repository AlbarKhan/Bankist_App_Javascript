"use strict";

const account1 = {
  owner: "Albar Khan",
  userid: "ak",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  pin: 111,
};

const account2 = {
  owner: "Tausif shaikh",
  userid: "ts",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.1,
  pin: 222,
};

const accounts = [account1, account2];
console.log(accounts);

const loginForm = document.querySelector(".login");
const app = document.querySelector(".app");
const user = document.getElementById("username");
const pin = document.getElementById("pin");
const welcomeText = document.querySelector(".welcome");
const Movement = document.querySelector(".movements");
const loanValue = document.querySelector(".form__input--loan-amount");
const loanBtn = document.querySelector(".form__btn--loan");
const requestedLoanAmount = document.querySelector(".form__input--loan-amount");
const sortBtn = document.querySelector(".btn--sort");
let currentUser;
let sort = false;
// const currentUserMovements = accounts[currentUser].

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

// .............................Display Movements.............................
const displayMovements = function (movements, date) {
  Movement.innerHTML = "";
  const now = new Date();
  movements.reverse().forEach((movement, index) => {
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
      now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear()
    }</div>
    <div class="movements__value">${displaValue}</div>
    `;
    Movement.appendChild(newMovement);
  });
  console.log(movements.reverse());
};

// .............................SORTING .................................
sortBtn.addEventListener("click", function (e) {});
// .............................Loan Request.............................

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const currentUserMovements = accounts[currentUser].movements;
  const accountBalance = Math.trunc(
    currentUserMovements.reduce((accu, ele) => accu + ele)
  );
  const tenPercentOfBalance = Math.trunc(accountBalance * 0.1);
  if (requestedLoanAmount.value > 0) {
    if (tenPercentOfBalance >= requestedLoanAmount.value) {
      currentUserMovements.push(Number(requestedLoanAmount.value));
      requestedLoanAmount.value = "";
      const displayLoanPlus = displayMovements(currentUserMovements);
    } else {
      alert("Not Enough money");
      return;
    }
  } else {
    return;
  }
});

// .............................LOGIN Form.............................
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let userAuthentticated = false;

  accounts.forEach((account, index) => {
    if (
      !userAuthentticated &&
      user.value.toLowerCase() === account.userid &&
      Number(pin.value) === account.pin
    ) {
      userAuthentticated = true;
      currentUser = index;
      printWelcome(account.owner);
      displayMovements(account.movements);
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

  console.log(accounts[currentUser].movements);
});

// const arr = [1, 2, 1, 1];

// arr.push(999);

// console.log();
