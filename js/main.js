
let localAccounts = JSON.parse(localStorage.getItem("Accounts")) === null ? {} : JSON.parse(localStorage.getItem("Accounts"));
let movingDatas = {};

const loginBt = document.querySelector("#login-bt");
const loginUsernameInput = document.querySelector("#login-username");
const loginPasswordInput = document.querySelector("#login-password");
const notifList = document.querySelector(".notif-list");


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const notifModels = {
    error: "red",
    done: "green",
    warn: "yellow",
    info: "dodgerblue"
}

function showNotif(text, model) {
    var newNotif = document.createElement("li");
    newNotif.appendChild(document.createTextNode(text));
    notifList.appendChild(newNotif);
    notifList.lastChild.classList.add("notif-items");
    notifList.lastChild.style.backgroundColor = notifModels[model];
    setTimeout((item) => {
        item.remove();
    }, 3000, notifList.lastChild);
}

if ( loginBt != null ){
    loginBt.addEventListener("click", function(e) {
        if (loginUsernameInput.value.length === 0 || loginPasswordInput.value.length === 0 ) {
            showNotif("Please enter all fields", "warn");
        }else{
            loginUsernameInput.value = loginUsernameInput.value.toLowerCase();
            if ( localAccounts[loginUsernameInput.value] === undefined ) {
                showNotif("Username or password is wrong !", "error");
            }else if ( localAccounts[loginUsernameInput.value] != undefined && localAccounts[loginUsernameInput.value].Password != loginPasswordInput.value ) {
                showNotif("Username or password is wrong !", "error");
            } else {
                movingDatas = {
                    Username: loginUsernameInput.value,
                    Email: localAccounts[loginUsernameInput.value].Email,
                    Gender: localAccounts[loginUsernameInput.value].Gender,
                }
                localStorage.setItem("MoveDatas", JSON.stringify(movingDatas));
                window.open("pages/info.html", "_self");
            }
        }
    });
}



const registerUsernameInput = document.querySelector("#register-username");
const registerEmailInput = document.querySelector("#register-email");
const registerPasswordInput = document.querySelector("#register-password");
const registerConfirmPasswordInput = document.querySelector("#register-confirm-password");
const registerBt = document.querySelector("#register-bt");

if ( registerBt != null ){
    registerBt.addEventListener("click", function(e) {
        if (registerUsernameInput.value.length === 0 || registerEmailInput.value.length === 0 || registerPasswordInput.value.length === 0 || registerConfirmPasswordInput.value.length === 0 || document.querySelector('input[name="gender-radio"]:checked') === null ) {
            showNotif("Please enter all fields", "warn");
        }else {
            if ( registerPasswordInput.value != registerConfirmPasswordInput.value ) {
                return showNotif("Passwords are not matching", "error");
            } else {
                registerUsernameInput.value = registerUsernameInput.value.toLowerCase();
                if ( localAccounts[registerUsernameInput.value] != undefined ) {
                    return showNotif("Account with this username already exist !", "error");
                } else if ( validateEmail(registerEmailInput.value) === null ) {
                    return showNotif("Invalid email address !", "error");
                }
                localAccounts[registerUsernameInput.value] = {
                    Email: registerEmailInput.value,
                    Password: registerPasswordInput.value,
                    Gender: document.querySelector('input[name="gender-radio"]:checked').labels[0].innerHTML,
                }
                localStorage.setItem("Accounts", JSON.stringify(localAccounts));
                showNotif("Account created successfully", "done");
                setTimeout(() => {
                    window.open("../index.html", "_self");
                }, 2000);
            }
        }
    });
}

function onInfoPanelLoad() {
    const movingDatas = JSON.parse(localStorage.getItem("MoveDatas"));
    if ( movingDatas === null ){
        showNotif("Error #5F29A", "error");
    } else {
        document.querySelector("#username-label").innerHTML = movingDatas.Username;
        document.querySelector("#email-label").innerHTML = "Email: " + movingDatas.Email;
        document.querySelector("#gender-label").innerHTML = "Gender: " + movingDatas.Gender;
    }
}


const logoutBt = document.querySelector("#logout-bt");

if ( logoutBt != null ){
    logoutBt.addEventListener("click", function(e) {
        window.open("../index.html", "_self");
    })
}