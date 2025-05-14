const questions = [
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
    ]
  },
  {
    question: "Which language is known for its use in data analysis?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: true },
      { text: "HTML", correct: false },
    ]
  },
  {
    question: "Which programming language is used for styling web pages?",
    answers: [
      { text: "CSS", correct: true },
      { text: "PHP", correct: false },
      { text: "JavaScript", correct: false },
    ]
  },
  {
    question: "What does SQL stand for?",
    answers: [
      { text: "Structured Query Language", correct: true },
      { text: "Simple Question Logic", correct: false },
      { text: "Structured Question Language", correct: false },
    ]
  },
  {
    question: "Which language is best known for Android app development?",
    answers: [
      { text: "Swift", correct: false },
      { text: "Kotlin", correct: true },
      { text: "Ruby", correct: false },
    ]
  },
  {
    question: "Which programming language runs in the browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C#", correct: false },
    ]
  },
  {
    question: "Which of the following is a markup language?",
    answers: [
      { text: "HTML", correct: true },
      { text: "Python", correct: false },
      { text: "Go", correct: false },
    ]
  },
  {
    question: "Which language is used for backend development?",
    answers: [
      { text: "CSS", correct: false },
      { text: "Node.js", correct: true },
      { text: "Photoshop", correct: false },
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.innerText = '';
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = "Quiz Completed!";
  scoreContainer.innerText = `our score: ${score}/${questions.length}`;
  nextButton.innerText = "Restart";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();