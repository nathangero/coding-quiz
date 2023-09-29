var startButton = document.getElementById("button-start-quiz");
var quiz = document.getElementById("container-quiz");
var h3El = quiz.querySelector("h3");
var olEl = quiz.querySelector("ol");
var li1Answer = document.createElement("li"); // Create a list item
var li1Button = document.createElement("button"); // Create a button
li1Answer.appendChild(li1Button); // Attach the button to the list item for the user to click

var li2Answer = document.createElement("li");
var li2Button = document.createElement("button");
li2Answer.appendChild(li2Button);

var li3Answer = document.createElement("li");
var li3Button = document.createElement("button");
li3Answer.appendChild(li3Button);

var li4Answer = document.createElement("li");
var li4Button = document.createElement("button");
li4Answer.appendChild(li4Button);


var questionIndex = 0;
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

function setupQuestion() {
    var question = QUESTIONS[questionIndex]

    h3El.textContent = question
    li1Button.textContent = MULTIPLE_CHOICE[question].ANS_ONE;
    li2Button.textContent = MULTIPLE_CHOICE[question].ANS_TWO;
    li3Button.textContent = MULTIPLE_CHOICE[question].ANS_THREE;
    li4Button.textContent = MULTIPLE_CHOICE[question].ANS_FOUR;
}

function startGame(event) {
    event.stopPropagation();

    document.getElementById("title-screen").style.visibility = "hidden"; // Hide the title screen when the game starts
    document.getElementById("container-quiz").setAttribute("style", "display: flex; flex-direction: column; margin: 0 auto; text-align: start; width: 50%;")

    setupQuestion();
    olEl.append(li1Answer, li2Answer, li3Answer, li4Answer);
}

function onButtonClick(event) {
    // console.log(event);
    

    var userAnswer = event.target.textContent;
    var quizAnswer = getQuizAnswer();
    // console.log("userAnswer:", userAnswer);
    // console.log("quizAnswer:", quizAnswer);

    var hr = document.createElement("hr");
    var resultText = document.createElement("p");

    if (userAnswer == quizAnswer) {
        resultText.textContent = "Correct!";
    } else {
        resultText.textContent = "Incorrect";
    }

    olEl.append(hr, resultText);
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

function getQuizAnswer() {
    return ANSWERS[QUESTIONS[questionIndex]];
}


startButton.addEventListener("click", startGame);
// document.addEventListener("keypress", onKeydownAction); // Allow numbers to be used to answer questions
li1Button.addEventListener("click", onButtonClick);
li2Button.addEventListener("click", onButtonClick);
li3Button.addEventListener("click", onButtonClick);
li4Button.addEventListener("click", onButtonClick);