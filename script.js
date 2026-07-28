"use strict";

/*
 * PRIZE MESSAGES
 * Edit the text below whenever you want to change a prize message.
 * Keep the numbers 1 through 20 so they continue to match the NFC URLs.
 */
const PRIZE_MESSAGES = {
  1: "Congratulations! You won a prize! Please try not to scream like a chicken.",
  2: "Lucky you! The prize fairy has chosen you today.",
  3: "Wow! You are so lucky, even your pencil is jealous.",
  4: "Congratulations! You won! Please walk to the teacher like a superstar.",
  5: "Amazing! Your luck level is 100 today.",
  6: "You won a prize! Your English power just went up by 10 points.",
  7: "Great job! The magic card says you deserve a prize.",
  8: "Congratulations! Please accept your prize with a big winner smile.",
  9: "Lucky winner! Your chair is probably proud of you.",
  10: "Wow! You won! Please do a tiny happy dance.",
  11: "Congratulations! You are officially the lucky student of the moment.",
  12: "You won a prize! Please say, “I am awesome!” in English.",
  13: "Amazing! This card thinks you are cooler than ice cream.",
  14: "Congratulations! You found the lucky card. Now go collect your treasure.",
  15: "Fantastic! Your prize radar is working perfectly today.",
  16: "Hooray! You are so lucky, even the dictionary is impressed.",
  17: "Congratulations! This card has officially crowned you a prize champion.",
  18: "You won! Please collect your prize before it learns to run away.",
  19: "Brilliant! Your lucky English word today is “winner.”",
  20: "Jackpot! You found Prize #20. Give yourself a superhero pose.",
};

const confettiLayer = document.querySelector("#confetti-layer");
const validPrize = document.querySelector("#valid-prize");
const errorPrize = document.querySelector("#error-prize");
const prizeNumber = document.querySelector("#prize-number");
const prizeMessage = document.querySelector("#prize-message");
const actions = document.querySelector("#celebration-actions");
const celebrateButton = document.querySelector("#celebrate-button");
const soundButton = document.querySelector("#sound-button");

/** Read ?card= and accept only one whole number from 1 to 20. */
function getCardNumber() {
  const parameters = new URLSearchParams(window.location.search);
  const cardValues = parameters.getAll("card");

  if (cardValues.length !== 1 || !/^\d+$/.test(cardValues[0])) return null;

  const card = Number(cardValues[0]);
  return Number.isInteger(card) && card >= 1 && card <= 20 ? card : null;
}

function showPrize(card) {
  prizeNumber.textContent = `Prize #${card}`;
  prizeMessage.textContent = PRIZE_MESSAGES[card];
  validPrize.hidden = false;
  errorPrize.hidden = true;
  actions.hidden = false;
  document.title = `Prize #${card} — Congratulations!`;
}

function showError() {
  validPrize.hidden = true;
  errorPrize.hidden = false;
  actions.hidden = true;
  document.title = "NFC Card Setup Error";
}

/** Create colorful paper pieces. Old pieces are removed so the animation restarts. */
function celebrate() {
  confettiLayer.replaceChildren();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#6c3cff", "#ff4fa3", "#ffd43b", "#2fc7f7", "#46d68c", "#ff7a45"];
  const pieceCount = window.innerWidth < 480 ? 75 : 120;

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--fall-time", `${2.2 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    piece.style.setProperty("--spin", `${360 + Math.random() * 900}deg`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    confettiLayer.append(piece);
  }

  window.setTimeout(() => confettiLayer.replaceChildren(), 5500);
}

/** Build a short tune only after the student taps the sound button. */
function playWinnerSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    soundButton.textContent = "Sound is not supported";
    soundButton.disabled = true;
    return;
  }

  const audio = new AudioContextClass();
  const notes = [
    { frequency: 523.25, start: 0, duration: 0.14 },
    { frequency: 659.25, start: 0.15, duration: 0.14 },
    { frequency: 783.99, start: 0.3, duration: 0.14 },
    { frequency: 1046.5, start: 0.46, duration: 0.35 },
  ];

  notes.forEach(({ frequency, start, duration }) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const noteStart = audio.currentTime + start;
    const noteEnd = noteStart + duration;
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.2, noteStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteEnd);
  });

  window.setTimeout(() => audio.close(), 1200);
}

const cardNumber = getCardNumber();
if (cardNumber === null) showError();
else {
  showPrize(cardNumber);
  celebrate();
}

celebrateButton.addEventListener("click", celebrate);
soundButton.addEventListener("click", playWinnerSound);
