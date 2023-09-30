/* CONST VARIABLES */
const SUBTRACT_TIME = 10;
const SCORE_INCREASE = 10;
const SCORE_DECREASE = 10;
const STORE_KEY_HIGHSCORES = "highScores"

const QUESTIONS = {
    0: "String values must be enclosed by a pair of ______",
    1: "Which of the following is a valid way to setup an event listener?",
    2: "Which is a valid form of a for loop?",
    3: "What does event.stopPropagation() do?",
    4: "Which CSS code changes the mouse cursor into a hand?",
    5: "Which is not true about a JavaScript Object?",
    6: "Which git command allows the user to add a comment to the commit?",
    7: "True or False: Linking JavaScript files in the HTML goes under the <head> tag",
    8: "Which below will create a JavaScript array?",
    9: "Which is the correct way to debug JavaScript in order to print to the console?"
}

const ANSWERS = {
    [QUESTIONS[0]]: "\" \"",
    [QUESTIONS[1]]: "<code>addEventListener(\"click\", runFunction);</code>",
    [QUESTIONS[2]]: "<code>for (var i = 0; i < 10; i++) {}</code>",
    [QUESTIONS[3]]: "Prevents further propagation of the current event in the capturing and bubbling phases",
    [QUESTIONS[4]]: "<code>cursor: pointer;</code>",
    [QUESTIONS[5]]: "All options are TRUE",
    [QUESTIONS[6]]: "<code>git commit -m \"\"</code>",
    [QUESTIONS[7]]: "False",
    [QUESTIONS[8]]: "<code>var myArr = []</code>",
    [QUESTIONS[9]]: "<code>console.log()</code>",
}

const MULTIPLE_CHOICE = {
    [QUESTIONS[0]]: {
        0: ANSWERS[QUESTIONS[0]],
        1: "{ }",
        2: "( )",
        3: "< >",
    },
    [QUESTIONS[1]]: {
        0: ANSWERS[QUESTIONS[1]],
        1: "<code>addEventListener(\"click\", event);</code>",
        2: "<code>addEventListener(runFunction);</code>",
        3: "<code>doEventListener(\"click\", runFunction);</code>",
    },
    [QUESTIONS[2]]: {
        0: ANSWERS[QUESTIONS[2]],
        1: "<code>for (i < 10; i++) {}</code>",
        2: "<code>forEach (var i = 0; i < 10; i++) {}</code>",
        3: "<code>for (var i = 0: i < 10: i++) {}</code>",
    },
    [QUESTIONS[3]]: {
        0: ANSWERS[QUESTIONS[3]],
        1: "Prevent any default behaviors from occurring",
        2: "Prevents the webpage from showing animations no matter what.",
        3: "Prevents user from entering input in < input > tags",
    },
    [QUESTIONS[4]]: {
        0: ANSWERS[QUESTIONS[4]],
        1: "<code>cursor: progress;</code>",
        2: "<code>cursor: hand;</code>",
        3: "<code>cursor: text;</code>",
    },
    [QUESTIONS[5]]: {
        0: ANSWERS[QUESTIONS[5]],
        1: "Can only have one datatype in the object (string, boolean, number, etc)",
        2: "Only contains key:value pairings",
        3: "Created by using {}",
    },
    [QUESTIONS[6]]: {
        0: ANSWERS[QUESTIONS[6]],
        1: "<code>git commit -D \"\"</code>",
        2: "<code>git commit -d \"\"</code>",
        3: "<code>git commit -M \"\"</code>",
    },
    [QUESTIONS[7]]: {
        0: ANSWERS[QUESTIONS[7]],
        1: "True",
        2: "",
        3: "",
    },
    [QUESTIONS[8]]: {
        0: ANSWERS[QUESTIONS[8]],
        1: "<code>var myArr = {}</code>",
        2: "<code>var myArr = <></code>",
        3: "<code>var myArr = ()</code>",
    },
    [QUESTIONS[9]]: {
        0: ANSWERS[QUESTIONS[9]],
        1: "<code>console.print()</code>",
        2: "<code>console.logger()</code>",
        3: "<code>console.show()</code>",
    },
}


/* DOM VARIABLES */
var subtitle = document.getElementById("subtitle");
var titleScreen = document.getElementById("title-screen");
var startButton = document.getElementById("button-start-quiz");

var scoreboard = document.getElementById("scoreboard");
var playersList = scoreboard.querySelector("ol");
var noPlayers = document.createElement("p");

var quiz = document.getElementById("container-quiz");
var timer = document.getElementById("timer");
var quizQuestionText = quiz.querySelector("h3");
var quizAnswerContainer = quiz.querySelector("ol");

var gameEndScreen = document.getElementById("container-game-over");
var userScoreText = document.getElementById("user-score");
var usersInitialsText = document.getElementById("usersInitials");
var submitButton = gameEndScreen.querySelector("button");

/* GLOBAL VARIABLES */
var userScore = 0;
var questionIndex = 0;
var seconds = 90; // Global to adjust when user gets an answer wrong
var secondsRemaining = 0; // Use to calculate user's final score
var highScores = {};

/* EVENT LISTENER FUNCTIONS */
function startGame(event) {
    event.stopPropagation();

    // Reset variables when starting a new game
    userScore = 0;
    questionIndex = 8;
    seconds = 90;

    timer.innerHTML = "Time: " + seconds;
    timer.setAttribute("style", "font-size: 30px; margin: 10px auto; border: 2px solid black; border-radius: 10px; padding: 10px;");
    
    var gameTimer = setInterval(() => {
        if (seconds === 0) {
            clearInterval(gameTimer);
            endGame();
            return;
        }
        seconds--;
        timer.innerHTML = "Time: " + seconds;
    }, 1000);

    titleScreen.style.display = "none"; // Hide the title screen when the game starts
    scoreboard.style.display = "none";
    quiz.setAttribute("style", "display: flex; flex-direction: column; margin: 0 auto; text-align: start; width: 70%;")

    setupNextQuestion();
}

function onAnswerClick(event) {
    // console.log(event);
    console.log("@onAnswerClick");

    // Disables all the answer buttons to avoid cheating the score.
    for (var i = 0; i < quizAnswerContainer.children.length; i++) {
        quizAnswerContainer.children[i].children[0].toggleAttribute("disabled");
    }

    var userAnswer = event.target.textContent;
    var quizAnswer = getQuizAnswer();

    var resultText = document.createElement("h3");

    quizAnswerContainer.children[quizAnswerContainer.children.length - 1].appendChild(resultText);

    if (userAnswer === quizAnswer) {
        quizAnswerContainer.children[quizAnswerContainer.children.length - 1].children[1].textContent = "Correct!";
        handleCorrectAnswer();
    } else {
        quizAnswerContainer.children[quizAnswerContainer.children.length - 1].children[1].textContent = "Incorrect";
        handleIncorrectAnswer();
        showPenalty();
    }

    // Quickly Show user if they're correct or not
    var resultSeconds = 1;
    var resultTimer = setInterval(() => {
        if (resultSeconds <= 0) {
            clearInterval(resultTimer);
            quizAnswerContainer.children[quizAnswerContainer.children.length - 1].children[1].textContent = "";

            getNextQuestion();
        }
        resultSeconds--;
    }, 500);
}

function onSubmitClick(event) {
    event.stopPropagation();
    event.preventDefault();

    gameEndScreen.style.display = "none";
    titleScreen.style.display = "flex";
    scoreboard.style.display = "flex";

    highScores[usersInitialsText.value] = userScore;
    localStorage.setItem(STORE_KEY_HIGHSCORES, JSON.stringify(highScores));
    initHighScores();
}

// Todo?
// function onKeydownAction(event) {
//     console.log(event);
//     console.log(event.body);

//     var validNums = ["Digit1", "Digit2", "Digit3", "Digit4"];
//     var keyPressed = event.code

//     // Validate if keypress is valid
//     if (validNums.includes(keyPressed)) {
//         console.log("Valid keypress!")
        
//         var userAnswer = event.target.textContent;
//         var quizAnswer = getQuizAnswer();
//         // console.log("userAnswer:", userAnswer)

//         if (userAnswer == quizAnswer) {
//             alert("Correct!");
//         } else {
//             alert("Incorrect. Correct answer is: " + quizAnswer)
//         }
//     }
// }

/* HELPER FUNCTIONS */

function endGame() {
    gameEndScreen.style.display = "flex";
    quiz.style.display = "none";
    userScoreText.textContent = "You scored: " + userScore + " / " + (SCORE_INCREASE * Object.keys(QUESTIONS).length);
}

function handleCorrectAnswer() {
    userScore += SCORE_INCREASE;
    console.log("user score:", userScore);
}

function handleIncorrectAnswer() {
    var futureScore = userScore - SCORE_DECREASE;
    if (futureScore >= 0) { // Check if the user's score will go below 0 or not
        userScore = futureScore;
    }
    console.log("user score:", userScore);

    // Check if the timer will go below 0 or not.
    var futureTime = seconds - SUBTRACT_TIME;
    if (futureTime <= 0) {
        seconds = 0;
        // clearInterval(gameTimer);
        timer.innerHTML = "Time: " + seconds;
        return;
    }

    seconds = futureTime; // Penalize the user 
    // penalty.style.visibility = "visible";

    console.log("new seconds:", seconds);
}

function showPenalty() {
    timer.style.color = "red";
    var penaltySeconds = 1; // Show penality for 1 seconds
    var penaltyTimer = setInterval(() => {
        if (penaltySeconds === 0) {
            clearInterval(penaltyTimer);
            timer.style.color = "black";
        }
        penaltySeconds--;
    }, 650);
}

function getNextQuestion() {
    var futureIndex = questionIndex + 1;

    // End game if all questions have been used up
    if (futureIndex >= Object.keys(QUESTIONS).length) {
        seconds = 0;
        // clearInterval(gameTimer);
        timer.innerHTML = "Time: " + seconds;
        return;
    }

    questionIndex++;
    setupNextQuestion();
}

function getQuizAnswer() {
    var quizAnswer = ANSWERS[QUESTIONS[questionIndex]]
    return quizAnswer.includes("<code>") ? removeCodeFromQuizAnswer(quizAnswer) : quizAnswer;
}

// Remove the <code> tag from the answer
function removeCodeFromQuizAnswer(textContent) {
    var split1 = textContent.split("<code>");
    var split2 = split1[1].split("</code>");
    var text = split2[0];

    return text;
}

function setupNextQuestion() {
    var question = QUESTIONS[questionIndex]

    quizQuestionText.innerHTML = question
    quizAnswerContainer.innerHTML = ""; // Erase the choices

    for (var i = 0; i < Object.keys(MULTIPLE_CHOICE[question]).length; i++) {
        var answer = MULTIPLE_CHOICE[question][i];
        if (answer === "") { // If the answer is empty, skip it
            continue;
        }

        var liButton = document.createElement("button");
        liButton.innerHTML = answer;
        liButton.addEventListener("click", onAnswerClick); // Add on click listener

        var li = document.createElement("li");
        li.appendChild(liButton);
        li.setAttribute("data-index", i);
    
        quizAnswerContainer.appendChild(li);
    }
}

// Sort the highscores by highest score
function sortScoresDescending(scores) {

    return scores;
}

// Get local storage high scores
function initHighScores() {
    var localScores = JSON.parse(localStorage.getItem(STORE_KEY_HIGHSCORES));
    console.log("localScores:", localScores);

    if (localScores) { 
        highScores = sortScoresDescending(localScores);

        // Remove if the "no highs scores yet" was there before
        if (scoreboard.children[2]) {
            scoreboard.children[2].remove();
        }

        playersList.innerHTML = "" // Reset he scoreboard before editing it

        var index = 0;
        for (const playerInitials in highScores) {
            var li = document.createElement("li");
            li.textContent = playerInitials + ": " + highScores[playerInitials];
            li.setAttribute("data-index", index);
        
            playersList.appendChild(li);
            index++;
        }

    } else {
        console.log("no high scores to be had")
        noPlayers = document.createElement("p");
        noPlayers.textContent = "No high scores yet";
        noPlayers.setAttribute("style", "font-size: 35px; margin: 0 auto; align-items: center;")
        scoreboard.appendChild(noPlayers);
    }
}

function initVariables() {
    subtitle.innerHTML = "You'll have 90 seconds to answer all  questions. Getting questions wrong will subtract the time by " + SUBTRACT_TIME + " seconds.<br><br>Good luck and have fun!";

    timer.setAttribute("style", "display: none;");

    initHighScores();
}


/* RUN ON SITE STARTUP */
initVariables();
startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", onSubmitClick);
// document.addEventListener("keypress", onKeydownAction); // Allow numbers to be used to answer questions
