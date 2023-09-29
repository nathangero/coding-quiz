/* CONST VARIABLES */
const SUBTRACT_TIME = 10;
const SCORE_INCREASE = 10;
const SCORE_DECREASE = 10;

const QUESTIONS = {
    0: "String values must be enclosed by a pair of ______",
    1: "True or False: \n<pre><code>addEventListener(\"click\", runFunction);</code></pre> is valid.",
    2: "What does this do",
    3: "What does stevent.stopPropagation() do?",
    4: "Which CSS code changes the mouse cursor into a hand?",
    5: "Which is not true about a JavaScript Object?",
    6: "Which git command allows the user to add a comment to the commit?",
    7: "True or False: Linking JavaScript files in the HTML goes under the <head> tag",
    8: "Which below will create a JavaScript array?",
    9: "Which is the correct way to debug JavaScript in order to print to the console?"
}

const ANSWERS = {
    [QUESTIONS[0]]: "\" \"",
    [QUESTIONS[1]]: "True",
    [QUESTIONS[2]]: "",
    [QUESTIONS[3]]: "",
    [QUESTIONS[4]]: "",
    [QUESTIONS[5]]: "",
    [QUESTIONS[6]]: "",
    [QUESTIONS[7]]: "",
    [QUESTIONS[8]]: "",
    [QUESTIONS[9]]: "",
}

const MULTIPLE_CHOICE = {
    [QUESTIONS[0]]: {
        ANS_ONE: "\" \"",
        ANS_TWO: "{ }",
        ANS_THREE: "( )",
        ANS_FOUR: "< >",
    },
    [QUESTIONS[1]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[2]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[3]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[4]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[5]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[6]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[7]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[8]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
    [QUESTIONS[9]]: {
        ANS_ONE: "",
        ANS_TWO: "",
        ANS_THREE: "",
        ANS_FOUR: "",
    },
}


/* DOM VARIABLES */
var subtitle = document.getElementById("subtitle");
var startButton = document.getElementById("button-start-quiz");
var quiz = document.getElementById("container-quiz");
var timer = document.getElementById("timer");
var penalty = document.createElement("p");
var h3El = quiz.querySelector("h3");
var olEl = quiz.querySelector("ol");
var li1Answer = document.createElement("li"); // Create a list item
var li1Button = document.createElement("button"); // Create a button

var li2Answer = document.createElement("li");
var li2Button = document.createElement("button");

var li3Answer = document.createElement("li");
var li3Button = document.createElement("button");

var li4Answer = document.createElement("li");
var li4Button = document.createElement("button");


/* GLOBAL VARIABLES */
var userScore = 0;
var questionIndex = 0;
var seconds = 90; // Global to adjust when user gets an answer wrong

/* EVENT LISTENER FUNCTIONS */
function startGame(event) {
    event.stopPropagation();
    questionIndex = 0; // Reset to 0 when a new game starts

    timer.innerHTML = "Time: " + seconds;
    timer.setAttribute("style", "font-size: 30px; margin: 10px auto; border: 2px solid black; border-radius: 10px; padding: 10px;");
    
    var gameTimer = setInterval(() => {
        if (seconds === 0) {
            alert("game over!")
            clearInterval(gameTimer);
            return;
        }
        seconds--;
        timer.innerHTML = "Time: " + seconds;
    }, 1000);

    document.getElementById("title-screen").style.display = "none"; // Hide the title screen when the game starts
    document.getElementById("container-quiz").setAttribute("style", "display: flex; flex-direction: column; margin: 0 auto; text-align: start; width: 70%;")

    setupQuestion();
    olEl.append(li1Answer, li2Answer, li3Answer, li4Answer);
}

function onAnswerClick(event) {
    // console.log(event);

    var userAnswer = event.target.textContent;
    var quizAnswer = getQuizAnswer();

    var resultText = document.createElement("h3");

    olEl.children[olEl.children.length - 1].appendChild(resultText);

    if (userAnswer == quizAnswer) {
        handleCorrectAnswer();
        olEl.children[olEl.children.length - 1].children[1].textContent = "Correct!";
    } else {
        handleIncorrectAnswer();
        olEl.children[olEl.children.length - 1].children[1].textContent = "Incorrect";
    }
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

    seconds -= SUBTRACT_TIME; // Penalize the user 
    penalty.setAttribute("style", "visibility: visible;");

    var penaltySeconds = 2; // Show penality for 2 seconds
    var penaltyTimer = setInterval(() => {
        if (penaltySeconds === 0) {
            clearInterval(penaltyTimer);
            penalty.setAttribute("style", "visibility: hidden")
        }
        penaltySeconds--;
    }, 1000);
}

function getQuizAnswer() {
    return ANSWERS[QUESTIONS[questionIndex]];
}

function setupQuestion() {
    var question = QUESTIONS[questionIndex]

    h3El.textContent = question
    li1Button.textContent = MULTIPLE_CHOICE[question].ANS_ONE;
    li2Button.textContent = MULTIPLE_CHOICE[question].ANS_TWO;
    li3Button.textContent = MULTIPLE_CHOICE[question].ANS_THREE;
    li4Button.textContent = MULTIPLE_CHOICE[question].ANS_FOUR;
}

function initVariables() {
    subtitle.innerHTML = "You'll have 90 seconds to answer all  questions. Getting questions wrong will subtract the time by " + SUBTRACT_TIME + " seconds.<br>Good luck and have fun!";

    timer.setAttribute("style", "display: none;");
    penalty.setAttribute("style", "visibility: hidden; color: red;");
    penalty.textContent = "-" + SUBTRACT_TIME;
    timer.appendChild(penalty);

    console.log(timer)
    console.log(penalty)

    li1Answer.appendChild(li1Button); // Attach the button to the list item for the user to click
    li2Answer.appendChild(li2Button);
    li3Answer.appendChild(li3Button);
    li4Answer.appendChild(li4Button);
}


/* RUN ON SITE STARTUP */
initVariables();
startButton.addEventListener("click", startGame);
// document.addEventListener("keypress", onKeydownAction); // Allow numbers to be used to answer questions
li1Button.addEventListener("click", onAnswerClick);
li2Button.addEventListener("click", onAnswerClick);
li3Button.addEventListener("click", onAnswerClick);
li4Button.addEventListener("click", onAnswerClick);