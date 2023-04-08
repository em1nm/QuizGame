
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
let questions = [
    {
        question: "What was Kobe Bryant's high school jersey number?:",
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
        question: "What prestigious award did Kobe Bryant win in 2018 for his contributions to the sport of basketball?:",
        answers: ["NBA MVP", "NBA Finals MVP", "Olympic Gold Medal", "Academy Award"],
        correctAnswer: "Academy Award"
    }]