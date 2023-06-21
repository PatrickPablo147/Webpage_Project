const questions = [
    {
        question: "Who develope the Arduino?",
        answers: [
            {text: "Massimo Banzi", correct: true},
            {text: "Misisipi Branzi", correct: false},
            {text: "Massimo Bonzai", correct: false},
            {text: "Missmo Branzi", correct: false},
        ] 
    },
    {
        question: "When does the Arduino invented?",
        answers: [
            {text: "1986", correct: false},
            {text: "1990", correct: false},
            {text: "2005", correct: true},
            {text: "2021", correct: false},
        ] 
    },
    {
        question: "Which Arduino component is used to measure the distance to an object by using ultrasonic waves?",
        answers: [
            {text: "Bluetooth Module", correct: false},
            {text: "Ultrasonic Sensor", correct: true},
            {text: "DC Motor", correct: false},
            {text: "Temperature Sensor", correct: false},
        ] 
    },
    {
        question: "What is the syntax to analyse a character?",
        answers: [
            {text: "isAlpha()", correct: true},
            {text: "pinMode()", correct: false},
            {text: "isalpha()", correct: false},
            {text: "digital()", correct: false},
        ] 
    },
    {
        question: "It converts power plugged into the power port.",
        answers: [
            {text: "Reset Button", correct: false},
            {text: "Digital I/O Pins", correct: true},
            {text: "Power Port", correct: false},
            {text: "Voltrage Regulator", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();