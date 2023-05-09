// Get references to the buttons and elements to be used later
const startBtn = document.getElementById("start-button");
const startSlide = document.getElementById("start-slide");
const nextBtn = document.getElementById("js-forward-btn");
const backBtn = document.getElementById("js-back-btn");
const q1YesBtn = document.getElementById("q1-yes");
const q1NoBtn = document.getElementById("q1-no");
const q1OtherBtn = document.getElementById("q1-other");
const q2YesBtn = document.getElementById("q2-yes");
const q2NoBtn = document.getElementById("q2-no");
const q2OtherBtn = document.getElementById("q2-other");

let finalPrice = 0;
let currentQuestion = 0;
const totalQuestions = 2;

// start the price calculator
function start() {
  startSlide.classList.remove("active");
  goToQuestion(1);
}

// Handle the answer and update the final price based on the answer
function nextQuestion(questionNumber, answer) {
  const multipliers = {
    yes: 1.2,
    no: 1,
    other: 1.1,
  };

  finalPrice *= multipliers[answer];
  if (finalPrice === 0) finalPrice = 100;

  goToQuestion(questionNumber + 1);
}

// Show the appropriate question based on the question number
function goToQuestion(questionNumber) {
  if (questionNumber >= 1 && questionNumber <= totalQuestions) {
    if (currentQuestion > 0) {
      document
        .getElementById(`question${currentQuestion}`)
        .classList.remove("active");
    }
    currentQuestion = questionNumber;
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");
    document.getElementById("current-slide").textContent = currentQuestion;
  } else if (questionNumber > totalQuestions) {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");
    document.getElementById("final-price").textContent = `$${finalPrice.toFixed(
      2
    )}`;
    document.getElementById("result").classList.add("active");
  }
}

// Handle the click event for answer buttons
function handleAnswerClick(questionNumber, answer) {
  nextQuestion(questionNumber, answer);
}

// Go to the previous question
function previous() {
  if (currentQuestion > 1) {
    goToQuestion(currentQuestion - 1);
  }
}

// Go to the next question
function next() {
  if (currentQuestion < totalQuestions) {
    goToQuestion(currentQuestion + 1);
  }
}

// Add event listeners to buttons
startBtn.addEventListener("click", start);

q1YesBtn.addEventListener("click", () => handleAnswerClick(1, "yes"));
q1NoBtn.addEventListener("click", () => handleAnswerClick(1, "no"));
q1OtherBtn.addEventListener("click", () => handleAnswerClick(1, "other"));

q2YesBtn.addEventListener("click", () => handleAnswerClick(2, "yes"));
q2NoBtn.addEventListener("click", () => handleAnswerClick(2, "no"));
q2OtherBtn.addEventListener("click", () => handleAnswerClick(2, "other"));

backBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);

// Add the "active" class to the start-slide element
document.getElementById("start-slide").classList.add("active");
