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
var secsInput = 30;
var seconds = secsInput;
var timerText;

function setQuestion(currentQuestion, currentQuesitonIndex) {
    var ques = questions[currentQuestionIndex];
    questionP.textContent = (currentQuestion+1) + ". " + ques.question;
    option1Span.textContent = question.option1;
    option2Span.textContent = question.option2;
    option3Span.textContent = question.option3;
    option4Span.textContent = question.option4;
}

function changeProgressBar(currentQuestion) 