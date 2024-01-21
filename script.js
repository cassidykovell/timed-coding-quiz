var timer = document.getElementById("timer");
var start = document.getElementById("button");
var quizContainer = document.getElementById("quiz-container");
var questionElement = document.getElementById("question");
var answerOptionsElement = document.getElementById("answer-options");
var messageElement = document.getElementById("message");
var leaderboard = document.getElementById("leaderboard-container");
var initialsSections = document.getElementById("initials-section");
var finalScore = document.getElementById("final-score");
var save = document.getElementById("save");
var userInitials = document.getElementById("user-initials");
var correctAnswers = 0;
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
      },
      {
        question: "What is the purpose of CSS?",
        options: [
          "1. It styles, lays out, and structures websites.",
          "2. It is the foundational structure of a webpage.",
          "3. It is a code editor.",
          "4. It allows you to comumunicate with the operating system of your computer."
        ],
        correctAnswerIndex: 0
      },
      {
        question: "What is a string?",
        options: [
          "1. It is a number.",
          "2. It is a boolean.",
          "3. It is text.",
          "4. It is and array.", 
        ],
      correctAnswerIndex: 2
      }
    ];

    var questionIndex = 0;
    leaderboard.style.display = "none";
    initialsSections.style.display = "none";
    
    function displayQuestion() {
      if (questionIndex >= quizQuestions.length) {
        endQuiz();
        checkQuizEnd();
        return;
      }
      var currentQuestion = quizQuestions[questionIndex];
      questionElement.textContent = currentQuestion.question;
      answerOptionsElement.innerHTML = "";
      
      currentQuestion.options.forEach((option, index) => {
        var optionElement = document.createElement("li");
        optionElement.textContent = option;
        optionElement.classList.add("answer-option");
        answerOptionsElement.appendChild(optionElement);
      });
      
      start.style.display = "none";
      document.querySelector("h3").style.display = "none";
    }
    
    function startQuiz() {
      correctAnswers = 0;
      quizContainer.style.display = "block";
      leaderboard.style.display = "none";
      startTimer();
      displayQuestion();
    }
    
    start.addEventListener("click", startQuiz);
    
    answerOptionsElement.addEventListener("click", function (event) {
      var selectedOption = event.target;
      if (selectedOption.classList.contains("answer-option")) {
        var selectedOptionIndex = Array.from(answerOptionsElement.children).indexOf(selectedOption);
        questionIndex++;
        if (questionIndex < quizQuestions.length) {
        var currentQuestion = quizQuestions[questionIndex];
 
        if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
          messageElement.textContent = "Correct!";
        
          correctAnswers++;
        } else {
          messageElement.textContent = "Incorrect!";
          remainingTime -= 5;
        }
    
        setTimeout(function () {
          messageElement.textContent = "";
        }, 2000);
    
        
        console.log(questionIndex);
        console.log(quizQuestions.length);
          displayQuestion();
        } else {
          console.log("Inside else statement");
          messageElement.textContent = "Quiz finished!";
          checkQuizEnd();
        }
      }
    });
    
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
    
    function checkQuizEnd() {
      console.log("endQuiz")
        endQuiz();
    }
    
    function endQuiz() {
      clearInterval(timerInterval);
      timer.textContent = "Quiz Over!";
      timer.style.display = "none";
      quizContainer.style.display = "none";
      initialsSections.style.display = "block";
      finalScore.innerHTML = remainingTime;
  }

  var localStorageData = JSON.parse(localStorage.getItem('quiz'));
  displayScores(localStorageData);

  save.addEventListener('click', function(event) {
  event.preventDefault();
  
  var initials = userInitials.value;
  var userData = {
    name: initials,
    score: remainingTime
  };
  
  var localStorageData = JSON.parse(localStorage.getItem('quiz'));
  
  if (localStorageData === null) {
    localStorageData = [];
  }
  
  localStorageData.push(userData);
  
  localStorage.setItem('quiz', JSON.stringify(localStorageData));
  
  initialsSections.style.display = "none";
  leaderboard.style.display = "block";
  
  displayScores(localStorageData);
});

function displayScores(scores) {
  var scoreboard = document.getElementById('leaderboard-container');
  scoreboard.innerHTML = '';
  
  if (scores !== null) {
    scores.sort(function(a, b) {
      return b.score - a.score;
    });

    var leaderboardHeader = document.createElement('h2');
      leaderboardHeader.textContent = "Leaderboard";
      leaderboardHeader.classList.add('leaderboard-header');
      scoreboard.appendChild(leaderboardHeader);

    scores.forEach(function(score) {
      var listItem = document.createElement('li');
      listItem.textContent = score.name + ': ' + score.score;
      listItem.classList.add('score-item');
      scoreboard.appendChild(listItem);
    });
  }
}


  


    