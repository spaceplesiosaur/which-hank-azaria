var player1Input = document.getElementById('player1Input');
var enterGameButton = document.getElementById('enterGameButton');
var welcomeHeaderText = document.getElementById('welcomeHeaderText');
var welcomePageScreen = document.getElementById('welcomePageScreen');
var enterPageScreen = document.getElementById('enterPageScreen');

player1Input.addEventListener('keyup', checkNameField);
enterGameButton.addEventListener('click', onEnterGameButton);


function onEnterGameButton() {
  console.log("onEnter ran");
  fillPlayerName();
  openWelcomeScreen();
}

function fillPlayerName() {
  console.log(player1Input.value);
  welcomeHeaderText.innerText = `WELCOME ${player1Input.value.toUpperCase()} AND PLAYER 2 NAME!`
}

function checkNameField() {
  console.log("checkNameField ran");
  if (player1Input.value !== "") {
    enterGameButton.disabled = false;
  } else {
    enterGameButton.disabled = true;
    enterGameButton.innerText = "Please enter a name";
    enterGameButton.classList.add('.enterPage-button-playGameButton-error')
  }
}

function openWelcomeScreen() {
  welcomePageScreen.classList.remove('hidden');
  enterPageScreen.classList.add('hidden');

}
