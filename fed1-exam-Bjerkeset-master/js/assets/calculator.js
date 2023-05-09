const startBtn = document.getElementById("start-button");
const startSlide = document.getElementById("start-slide");
const backBtn = document.getElementById("js-back-btn");

let finalPrice = 0;
let currentQuestion = 0;
const totalQuestions = 3;
const selectedAnswers = {};

const answerValues = {
  yes: { q1: 50, q2: 40, q3: 50 },
  no: { q1: 0, q2: 0, q3: 0 },
  other: { q1: 30, q2: 20, q3: 0 },
};

function start() {
  startSlide.classList.remove("active");
  goToQuestion(1);
}

// Store selected awnser and for selected awnser object
function storeSelectedAnswer(questionNumber) {
  const answer = document.querySelector(
    `input[name="q${questionNumber}"]:checked`
  ).value;
  selectedAnswers[`q${questionNumber}`] = answer;
}

function goToQuestion(questionNumber) {
  hideCurrentQuestion();
  setCurrentQuestion(questionNumber);
  showCurrentQuestion();
}

function hideCurrentQuestion() {
  if (currentQuestion > 0) {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");
  }
}

function setCurrentQuestion(questionNumber) {
  if (questionNumber >= 1 && questionNumber <= totalQuestions) {
    currentQuestion = questionNumber;
    document.getElementById("current-slide").textContent = currentQuestion;
  } else if (questionNumber > totalQuestions) {
    calculateFinalPrice();
    displayFinalPrice();
  }
}

function showCurrentQuestion() {
  document.getElementById(`question${currentQuestion}`).classList.add("active");
}

function calculateFinalPrice() {
  if (Object.keys(selectedAnswers).length === totalQuestions) {
    let price = 0;
    for (
      let questionNumber = 1;
      questionNumber <= totalQuestions;
      questionNumber++
    ) {
      const answer = selectedAnswers[`q${questionNumber}`];
      price += answerValues[answer][`q${questionNumber}`];
    }
    finalPrice = price;
  }
}

function displayFinalPrice() {
  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");
  document.getElementById("final-price").textContent = `$${finalPrice}`;
  document.getElementById("result").classList.add("active");
}

function previous() {
  if (currentQuestion > 1) {
    goToQuestion(currentQuestion - 1);
  }
}

function handleRadioClick(questionNumber) {
  storeSelectedAnswer(questionNumber);
  goToQuestion(questionNumber + 1);
}

startBtn.addEventListener("click", start);
backBtn.addEventListener("click", previous);

document.querySelectorAll("input[type=radio]").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const questionNumber = parseInt(e.target.name.slice(1));
    handleRadioClick(questionNumber);
  });
});

document.getElementById("start-slide").classList.add("active");
