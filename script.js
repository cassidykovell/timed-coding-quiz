var timer = document.getElementById("timer");
var start = document.getElementById("button");
var quizContainer = document.getElementById("quiz-container");
var questionElement = document.getElementById("question");
var answerOptionsElement = document.getElementById("answer-options");
var messageElement = document.getElementById("message");
var remainingTime = 75;
var timerInterval;
var quizQuestions = [
  {
    question: "What does a 'for' loop do?",
    options: [
      "1. Repeats until a specific condition equals false.",
      "2. Executes a block of statements continuously until the given condition is true.",
      "3. Executes only once.",
      "4. Occurs when the boolean condition is always true."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "What should arrays be contained in?",
    options: ["1. Quotes", "2. Curly brackets", "3. Parentheses ", "4. Square brackets"],
    correctAnswerIndex: 3
  },
  {
    question: "What number denotes the first item in an array?",
    options: ["1. 1", "2. 0", "3. .5", "4. 2"],
    correctAnswerIndex: 1
  },
  {
    question: "What does putting 'var' before something do?",
    options: [
      "1. It makes it an array.",
      "2. It makes it a boolean.",
      "3. It declares a variable.",
      "4. It makes it a 'for' loop."
    ],
    correctAnswerIndex: 2
  }
];
var questionIndex = 0;

function displayQuestion() {
  var currentQuestion = quizQuestions[questionIndex];
  questionElement.textContent = currentQuestion.question;
  answerOptionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("li");
    optionElement.textContent = option;
    optionElement.classList.add("answer-option");
    answerOptionsElement.appendChild(optionElement);
  });

  start.style.display = "none";
  document.querySelector("h3").style.display = "none";
}

function startQuiz() {
  quizContainer.style.display = "block";
  startTimer();
  displayQuestion();
}

start.addEventListener("click", startQuiz);

function startTimer() {
  remainingTime = 75;
  timer.textContent = remainingTime;
  timerInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timer.textContent = "Quiz Over!";
      remainingTime = 75;
    } else {
      timer.textContent = remainingTime;
      remainingTime--;
    }
  }, 1000);
}

answerOptionsElement.addEventListener("click", function (event) {
  var selectedOption = event.target;
  if (selectedOption.classList.contains("answer-option")) {
    var selectedOptionIndex = Array.from(answerOptionsElement.children).indexOf(selectedOption);
    var currentQuestion = quizQuestions[questionIndex];

    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      messageElement.textContent = "Correct!";
    } else {
      messageElement.textContent = "Incorrect!";
    }

    setTimeout(function () {
      messageElement.textContent = "";
    }, 2000);

    questionIndex++;

    if (questionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      console.log("Quiz finished!");
    }
  }
});