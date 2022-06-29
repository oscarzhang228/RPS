//black background
const body = document.querySelector("body");
body.classList.add("welcome");

//animate welcome text like a game flashing
const welcomeText = document.querySelector(".welcomeText");
const strWelcomeText = welcomeText.textContent;
const welcomeTextArr = strWelcomeText.split("");

welcomeText.textContent = "";

for (let i = 0; i < welcomeTextArr.length; i++) {
  welcomeText.innerHTML += "<span>" + welcomeTextArr[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 550);

function onTick() {
  const span = welcomeText.querySelectorAll("span")[char];
  span.classList.add("fade");
  span.classList.add("current");
  char++;
  let remove = setInterval(() => span.classList.remove("current"), 545);
  if (char === welcomeTextArr.length) {
    finish();
    return;
  }
}

function finish() {
  clearInterval(timer);
  timer = null;
}

const rules = document.querySelector(".rules");
const rulesArr = rules.textContent.split("");

rules.textContent = "";

for (let i = 0; i < rulesArr.length; i++) {
  rules.innerHTML += "<span>" + rulesArr[i] + "</span>";
}

setTimeout(() => {
  let index = 0;
  let timer2 = setInterval(transition, 100);
  function transition() {
    const theSpan = rules.querySelectorAll("span")[index];
    theSpan.classList.add("fade");
    index++;
    if (index === rulesArr.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer2);
    timer2 = null;
  }

  //click to speed up text appearing
  window.addEventListener("click", () => {
    const allSpan = document.querySelectorAll("span");
    const allButton = document.querySelectorAll(".name");
    allSpan.forEach((text) => {
      text.style.cssText = "opacity:1;";
    });

    allButton.forEach((button) => {
      button.style.opacity = "1";
      button.style.transition = "all 2s";
    });
  });
  //get to the actual game
  const nameSubmit = document.querySelector(".loginButtons");
  nameSubmit.addEventListener("submit", function goToSecondPage(e) {
    e.preventDefault();
    const submitName = document.getElementById("nameField");
    sessionStorage.setItem("username", submitName.value);
    location.href = "./html/main.html";
  });
}, 10500);
