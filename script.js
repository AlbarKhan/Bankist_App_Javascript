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
// let user = document.getElementById("username").value;
const app = document.querySelector(".app");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let user = document.getElementById("username").value;
  let pin = document.getElementById("pin").value;

  let userAuthentticated = false;

  const checkLogin = accounts.forEach((account) => {
    if (user.toLowerCase() == account.userid && pin == account.pin) {
      userAuthentticated = true;
    }
  });

  if (userAuthentticated) {
    app.style.opacity = 100;
    user = "";
    pin = "";
  } else {
    alert("Wrong id Password");
  }
});

const nam = "wwjww";
