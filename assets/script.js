console.log('Hello World!');

let container = document.getElementById("quiz-card");
let timerText = document.createElement("p");

let instructionText = document.getElementById("instructions");
container.appendChild(timerText);

let startButton = document.createElement("button");
let questionElement = document.createElement("h2");
let correctText = document.createElement("h3");

let score;
let timerCount = 45;

let buttons = [];
let finalScore;
let highscoreButton = document.getElementById("highscore");

//questions and answers for quiz
let questions = [
    {
        question: "What was Kobe Bryant's high school jersey number?",
        answers: ["8", "24", "33", "34"],
        correctAnswer: "33"
    },
    {
        question: "How many NBA championships did Kobe Bryant win throughout his career?",
        answers: ["3", "4", "5", "6"],
        correctAnswer: "5"
    },
    {
        question: "What is Kobe Bryant's career-high point total in a single NBA game?",
        answers: ["51", "63", "72", "81"],
        correctAnswer: "81"
    },
    {
        question: "What was the nickname given to Kobe Bryant during his playing days?",
        answers: ["Air", "The King", "Black Mamba", "Bean"],
        correctAnswer: "Black Mamba"
    },
    {
        question: "What prestigious award did Kobe Bryant win in 2018 for his contributions to the sport of basketball?",
        answers: ["Academy Award", "NBA Finals MVP", "Olympic Gold Medal", "NBA MVP"],
        correctAnswer: "Academy Award"
    }];

// shows score, timer and instructions including a start-quiz button on load page
onLoad();
function onLoad() {
    score = 0;
    timerCount = 45;
    questionElement.remove();
    container.appendChild(instructionText);
    startButton.textContent = "Start Quiz";
    container.appendChild(startButton);
}

// function to display scoreboard
function displayScores() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    let scoreBoard = document.createElement("ul");
    for (let i = 0; i < scores.length; i++) {
        let userScore = document.createElement("li");
        userScore.textContent = scores[i].initials + " highest score:" + scores[i].score;
        scoreBoard.appendChild(userScore);
    }
    container.appendChild(scoreBoard);



    let backButton = document.createElement("button");
    backButton.textContent = "Previous";
    scoreBoard.appendChild(backButton);
    backButton.addEventListener("click", function () {
        onLoad();
        scoreBoard.remove();
        backButton.remove();
        container.appendChild(highscoreButton);
    })
};

// function to display high scores
highscoreButton.addEventListener("click", function () {
    displayScores();
    highscoreButton.remove();
    questionElement.remove();
    instructionText.remove();
    hideAll();
});

// gets questions from objects and shows question in container element
function getCurrentQuestion() {
    questionElement.textContent = questions[score].question;
    console.log(score);
    console.log(questions[score].question);
    container.appendChild(questionElement);

}

// creates same amount of buttons as amount of answers (4)
function generateGame() {
    for (let i = 0; i < questions[score].answers.length; i++) {
        let answerButton = document.createElement("button");
        answerButton.textContent = questions[score].answers[i];
        container.appendChild(answerButton);

        buttons.push(answerButton);

        // if correct answer is chosen, move to next question
        answerButton.addEventListener("click", function () {
            if (score > (questions.length - 2)) {
                winGame();
            }
            // if answer is correct, adds +3 seconds to timer
            if (answerButton.textContent === questions[score].correctAnswer) {
                score++;
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].remove();
                }
                timerCount += 3;
                container.appendChild(correctText);
                correctText.textContent = "Correct!";
                if (score === 5) {
                    return
                }
                getCurrentQuestion();
                generateGame();
            }
            //if answer is incorrect, subtracts -5 seconds from timer; text shows: incorrect answer
            else {
                timerCount -= 5;
                correctText.textContent = "Incorrect Answer!";
                container.appendChild(correctText);
            }
        });
    }
}
// function to start timer
function startTimer() {
    timerInterval = setInterval(function () {
        if (timerCount > 0) {
            timerCount--;
            timerText.textContent = timerCount + "seconds remaining";
        }
        else {
            loseGame();
        }
    }, 1000);
}
// function to show when game is won
function winGame() {
    clearInterval(timerInterval);
    finalScore = score + timerCount;
    questionElement.textContent = "You've won! Your score:" + finalScore;
    hideAll();
    submitScore(finalScore);
}

// function to show when game is lost
function loseGame() {
    clearInterval(timerInterval);
    questionElement.textContent = "Time is up! Your score: " + score;
    hideAll();
    submitScore(score);
}

// hides buttons, timers, and correct/incorrect text
function hideAll() {
    startButton.remove();
    correctText.remove();
    timerText.remove();

    // removes buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}

// function to submit score
function submitScore(finalScore) {
    let nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("placeholder", "Enter your initials");
    container.appendChild(nameField);
    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submit");
    container.appendChild(submitButton);

    submitButton.addEventListener("click", function () {
        let initials = nameField.value;
        // new object with the score and initials
        let data = { score: finalScore, initials: initials };
        // retrieve the scores array from local storage
        let scores = JSON.parse(localStorage.getItem("scores")) || [];
        // adds new data object to the scores array
        scores.push(data);
        // saves updated scores array to local storage
        localStorage.setItem("scores", JSON.stringify(scores));
        submitButton.remove();
        nameField.remove();
        onLoad();
        container.appendChild(highscoreButton);

    });
}

startButton.addEventListener("click", function startQuiz() {
    startButton.remove();
    getCurrentQuestion();
    generateGame();
    startTimer();
    highscoreButton.remove();
});
