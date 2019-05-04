var currentQuestion = 0;
var userScore = 0;
var selectedAnswer = null;
var currentQuestionIndex;
var questionIndexList = [];
var unselectedButtonColor = "#e6f3ff";

function $(elementId) {
     return document.getElementById(elementId);
}

var quizSetDiv = $("quizSet");
var resultBoxDiv = $("resultBox");
var questionP = $("question");
var option1Span = $("option1");
var option2Span = $("option2");
var option3Span = $("option3");
var option4Span = $("option4");
var submitButton = $("submit");
var progressP = $("progress");
var resultP = $("result");
var retakeButton = $("retake");
var btn1 = $("btn1");
var btn2 = $("btn2");
var btn3 = $("btn3");
var btn4 = $("btn4");

var currentQuestionCircle;
var countDown;
var secsInput = 10;
var seconds = secsInput;
var timerText;

function setQuestion(currentQuestion, currentQuesitonIndex) {
    var ques = questions[currentQuestionIndex];
    questionP.textContent = (currentQuestion+1) + ". " + ques.question;
    option1Span.textContent = ques.option1;
    option2Span.textContent = ques.option2;
    option3Span.textContent = ques.option3;
    option4Span.textContent = ques.option4;
}

function changeProgressBar(currentQuestion) {
    progressP.innerHTML = "Question " + (currentQuestion+1) + " of 10";
    currentQuestionCircle = $("no" + (currentQuestion+1));
    currentQuestionCircle.style.backgroundColor = "#cc7a00";
}

function defaultOptionColors() {
    btn1.style.backgroundColor = unselectedButtonColor;
    btn2.style.backgroundColor = unselectedButtonColor;
    btn3.style.backgroundColor = unselectedButtonColor;
    btn4.style.backgroundColor = unselectedButtonColor;
}

function getQuestion(currentQuestion, currentQuestionIndex){
    selectedAnswer = null; //new question, clear the previous selectedAnswer
    if(currentQuestion == 9) { //last question
        submit.innerHTML = "Submit Test";
        submit.style.backgroundColor = "#00b300";
    }
    if(currentQuestion > 9) { //shouldn't get here
        return;
    }
    setQuestion(currentQuestion, currentQuestionIndex);
    changeProgressBar(currentQuestion);
    defaultOptionColors();

    startTimer(secsInput, "timer");
}

function setCorrect() {
    userScore++;
    currentQuestionCircle.style.backgroundColor = "#009900";
}

function setWrong() {
    currentQuestionCircle.style.backgroundColor = "#cc0000";
}

function finalScore() {
    if(userScore > 5){
        resultP.innerHTML = "Congrats! You Passed!<br/>Your score is " + userScore + "!";
    } else {
        resultP.innerHTML = "Sorry. You failed.<br/> Your score is " + userScore + ".";
    }
}

function setResultPage() {
    quizSetDiv.style.display = "none";
    resultBoxDiv.style.display = "block";
    progress.innerHTML = "Quiz Completed";
    timer.textContent = "00:00";
    finalScore();
}

function randomGenerator() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    while( questionIndexList.indexOf(currentQuestionIndex) != -1)
    {
        currentQuestionIndex = Math.floor(Math.random() * questions.length);
    }
    questionIndexList.push(currentQuestionIndex);
    return currentQuestionIndex;
}

function nextPage() {
    clearTimeout(countDown);
    secs = secsInput;

    if(selectedAnswer === questions[currentQuestionIndex].answer) {
        setCorrect();
    } else {
        setWrong();
    }

    if(currentQuestion == 9){
        setResultPage();
    } else {
        getQuestion(++currentQuestion, randomGenerator());
    }
}

function startTimer(secs, elem) {
    timerText = $(elem);
    var extraZero = "";
    if((""+secs).length == 1) {
        extraZero = "0";
    }
    timerText.innerHTML = "00:" + extraZero + secs;

    if(secs<0){ //countdown has reached 0
        nextPage();
    } else { //continue the countdown
        secs--;
        countDown = setTimeout('startTimer('+secs+',"'+elem+'")', 1000);
    }
}

/** Answer Buttons */
btn1.addEventListener("click", optionSelect);
btn2.addEventListener("click", optionSelect);
btn3.addEventListener("click", optionSelect);
btn4.addEventListener("click", optionSelect);

function optionSelect(e) {
    defaultOptionColors();
    var tmpButton = $(e.target.id.replace("option", "btn"));

    tmpButton.style.backgroundColor = "#1aff1a";
    selectedAnswer = parseInt( tmpButton.id.replace("btn", ""), 10);
}

/** Submit Button */
submit.addEventListener("click", nextQuestion);

function nextQuestion() {
    if(selectedAnswer == null) { //no option selected
        alert("Please select an option");
        return;
    }
    nextPage();
}

/** retake test button */
retakeButton.addEventListener("click", retakeTest);

function retakeTest() {
    window.location.reload();
}

window.onload = getQuestion(currentQuestion, randomGenerator());
