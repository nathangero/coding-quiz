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
        ANS_ONE: ANSWERS[QUESTIONS[0]],
        ANS_TWO: "{ }",
        ANS_THREE: "( )",
        ANS_FOUR: "< >",
    },
    [QUESTIONS[1]]: {
        ANS_ONE: ANSWERS[QUESTIONS[1]],
        ANS_TWO: "<code>addEventListener(\"click\", event);</code>",
        ANS_THREE: "<code>addEventListener(runFunction);</code>",
        ANS_FOUR: "<code>doEventListener(\"click\", runFunction);</code>",
    },
    [QUESTIONS[2]]: {
        ANS_ONE: ANSWERS[QUESTIONS[2]],
        ANS_TWO: "<code>for (i < 10; i++) {}</code>",
        ANS_THREE: "<code>forEach (var i = 0; i < 10; i++) {}</code>",
        ANS_FOUR: "<code>for (var i = 0: i < 10: i++) {}</code>",
    },
    [QUESTIONS[3]]: {
        ANS_ONE: ANSWERS[QUESTIONS[3]],
        ANS_TWO: "Prevent any default behaviors from occurring",
        ANS_THREE: "Prevents the webpage from showing animations no matter what.",
        ANS_FOUR: "Prevents user from entering input in < input > tags",
    },
    [QUESTIONS[4]]: {
        ANS_ONE: ANSWERS[QUESTIONS[4]],
        ANS_TWO: "<code>cursor: progress;</code>",
        ANS_THREE: "<code>cursor: hand;</code>",
        ANS_FOUR: "<code>cursor: text;</code>",
    },
    [QUESTIONS[5]]: {
        ANS_ONE: ANSWERS[QUESTIONS[5]],
        ANS_TWO: "Can only have one datatype in the object (string, boolean, number, etc)",
        ANS_THREE: "Only contains key:value pairings",
        ANS_FOUR: "Created by using {}",
    },
    [QUESTIONS[6]]: {
        ANS_ONE: ANSWERS[QUESTIONS[6]],
        ANS_TWO: "<code>git commit -D \"\"</code>",
        ANS_THREE: "<code>git commit -d \"\"</code>",
        ANS_FOUR: "<code>git commit -M \"\"</code>",
    },
    [QUESTIONS[7]]: {
        ANS_ONE: ANSWERS[QUESTIONS[7]],
        ANS_TWO: "True",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[8]]: {
        ANS_ONE: ANSWERS[QUESTIONS[8]],
        ANS_TWO: "<code>var myArr = {}</code>",
        ANS_THREE: "<code>var myArr = <></code>",
        ANS_FOUR: "<code>var myArr = ()</code>",
    },
    [QUESTIONS[9]]: {
        ANS_ONE: ANSWERS[QUESTIONS[9]],
        ANS_TWO: "<code>console.print()</code>",
        ANS_THREE: "<code>console.logger()</code>",
        ANS_FOUR: "<code>console.show()</code>",
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
var olEl = quiz.querySelector("ol");
var li1Answer = document.createElement("li"); // Create a list item
var li1Button = document.createElement("button"); // Create a button
var li2Answer = document.createElement("li");
var li2Button = document.createElement("button");
var li3Answer = document.createElement("li");
var li3Button = document.createElement("button");
var li4Answer = document.createElement("li");
var li4Button = document.createElement("button");

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
    questionIndex = 9;
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
    olEl.append(li1Answer, li2Answer, li3Answer, li4Answer);
}

function onAnswerClick(event) {
    // console.log(event);

    // TODO: toggleAttribute() ON CLICK
    var userAnswer = event.target.textContent;
    var quizAnswer = getQuizAnswer();

    var resultText = document.createElement("h3");

    olEl.children[olEl.children.length - 1].appendChild(resultText);

    if (userAnswer === quizAnswer) {
        olEl.children[olEl.children.length - 1].children[1].textContent = "Correct!";
        handleCorrectAnswer();
    } else {
        olEl.children[olEl.children.length - 1].children[1].textContent = "Incorrect";
        handleIncorrectAnswer();
        showPenalty();
    }

    // Quickly Show user if they're correct or not
    var resultSeconds = 1;
    var resultTimer = setInterval(() => {
        if (resultSeconds <= 0) {
            clearInterval(resultTimer);
            olEl.children[olEl.children.length - 1].children[1].textContent = "";

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
    li1Button.innerHTML = MULTIPLE_CHOICE[question].ANS_ONE;
    li2Button.innerHTML = MULTIPLE_CHOICE[question].ANS_TWO;
    li3Button.innerHTML = MULTIPLE_CHOICE[question].ANS_THREE;
    li4Button.innerHTML = MULTIPLE_CHOICE[question].ANS_FOUR;
    
    if (MULTIPLE_CHOICE[question].ANS_THREE.length <= 0) {
        li3Button.setAttribute("style", "display: none;");
    } else {
        li3Button.setAttribute("style", "display: inherit;");
    }

    if (MULTIPLE_CHOICE[question].ANS_FOUR.length <= 0) {
        li4Button.setAttribute("style", "display: none;");
    } else {
        li4Button.setAttribute("style", "display: inherit;");
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

    // console.log(Object.keys(QUESTIONS).length)

    li1Answer.appendChild(li1Button); // Attach the button to the list item for the user to click
    li2Answer.appendChild(li2Button);
    li3Answer.appendChild(li3Button);
    li4Answer.appendChild(li4Button);

    initHighScores();
}


/* RUN ON SITE STARTUP */
initVariables();
startButton.addEventListener("click", startGame);
// document.addEventListener("keypress", onKeydownAction); // Allow numbers to be used to answer questions
li1Button.addEventListener("click", onAnswerClick);
li2Button.addEventListener("click", onAnswerClick);
li3Button.addEventListener("click", onAnswerClick);
li4Button.addEventListener("click", onAnswerClick);
submitButton.addEventListener("click", onSubmitClick);