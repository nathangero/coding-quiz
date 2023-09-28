var startButton = document.getElementById("button-start-quiz");
var quiz = document.getElementById("container-quiz");
var h3El = quiz.querySelector("h3");
var olEl = quiz.querySelector("ol");

var questionIndex = 0;
var questions = [
    "String values must be enclosed by a pair of ______",
    "True or False: \n<pre><code>addEventListener(\"click\", runFunction);</code></pre> is valid."
]

var answers = [
    "\" \"",
    "True",
]

var multipleChoice = {

}

function setupQuestions() {

}

function setupMultipleChoice() {

}

function startGame() {
    document.getElementById("title-screen").style.visibility = "hidden"; // Hide the title screen when the game starts
    document.getElementById("container-quiz").setAttribute("style", "display: flex; flex-direction: column; align-items: center; margin: 0 auto; text-align: start;")

    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");
    
    h3El.textContent = questions[questionIndex]
    olEl.append(li1, li2, li3, li4);
    olEl.setAttribute
}


this.setupQuestions();
startButton.addEventListener("click", startGame);