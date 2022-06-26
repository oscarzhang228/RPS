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
    span.classList.add("blink");
    return;
  }
}

function finish() {
  clearInterval(timer);
  timer = null;
}
