
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
        questionEl.remove();
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
        }}

        container.appendChild(scoreBoard);
    let backButton = document.createElement("button");
    backButton.textContent = "Previous";
    scoreBoard.appendChild(backButton);
    backButton.addEventListener("click", function () {
        onLoad();
        scoreBoard.remove();
        backButton.remove();
        container.appendChild(highscoreButton);
    });   

    // function to display high scores:
    highscoreButton.addEventListener("click", function () {
        displayScores();
        highscoreButton.remove();
        questionEl.remove();
        instructionText.remove();
        hideAll();
    });

