const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "One of the following is not among the three idiots",
    choice1: "Benjamin",
    choice2: "Bonga",
    choice3: "James",
    choice4: "Joseph",
    answer: 4,
  },
  {
    question: "What is the tribe of Benjamin and Bonga",
    choice1: "Yoruba",
    choice2: "Igbo",
    choice3: "Zaar (Sayawa)",
    choice4: "Tangale",
    answer: 3,
  },
  {
    question: "What is the tribe of James and Joseph",
    choice1: "Zaar (Sayawa)",
    choice2: "Tangale",
    choice3: "Yoruba",
    choice4: "Igbo",
    answer: 2,
  },
  {
    question: "One of these ladies is Bonga's girlfriend",
    choice1: "Efra",
    choice2: "Balki",
    choice3: "Jamimah",
    choice4: "Hauwa",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

StartGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectChoice = e.target;
    const selectedAnswer = selectChoice.dataset["number"];
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

StartGame()