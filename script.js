"use strict";

const account1 = {
  owner: "Albar Khan",
  userid: "ak",
  movements: [],
  interestRate: 1.2,
  pin: 111,
};

const account2 = {
  owner: "Tausif shaikh",
  userid: "ts",
  movements: [],
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

//Login form
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let userAuthentticated = false;

  accounts.forEach((account) => {
    if (
      !userAuthentticated &&
      user.value.toLowerCase() === account.userid &&
      Number(pin.value) === account.pin
    ) {
      userAuthentticated = true;
      printWelcome(account.owner);
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
});
