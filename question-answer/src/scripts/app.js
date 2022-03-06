// soru datası
import questions from './data/questions.js';

// kaçıncı soruda olduğunu kontrol etmek için
let checkQueue = 1;
// kullanıcının verdiği cevbı tutacak değişken
let answer = null;
// sayfa sayacı değişkeni
let pageCounter = 0;

//! soruları yerleştirme //

window.addEventListener('load', () => buildQuestionAnswerEl());

function buildQuestionAnswerEl() {
  const questionsAnswersContainer = document.querySelector(
    '.questions-answers-container'
  );
  questionsAnswersContainer.innerHTML = `
        <div class="question-container">
            <p>${questions[pageCounter].question}</p>
        </div>
        <div class="answer-container">
        <div class="answer-choice a" style="display: flex">
            <input
            type="radio"
            name="answer-choice"
            value="${questions[pageCounter].answer}"
            style="margin-right: 10px"
            />
            <label for="answer-choice">${questions[pageCounter].answer}</label>
        </div>

        <div class="answer-choice button" style="display: flex">
            <input
            type="radio"
            name="answer-choice"
            value="${questions[pageCounter].wrongAnswers[0]}"
            style="margin-right: 10px"
            />
            <label for="answer-choice">${questions[pageCounter].wrongAnswers[0]}</label>
        </div>

        <div class="answer-choice c" style="display: flex">
            <input
            type="radio"
            name="answer-choice"
            value="${questions[pageCounter].wrongAnswers[1]}"
            style="margin-right: 10px"
            />
            <label for="answer-choice">${questions[pageCounter].wrongAnswers[1]}</label>
        </div>

        <div class="answer-choice d" style="display: flex">
            <input
            type="radio"
            name="answer-choice"
            value="${questions[pageCounter].wrongAnswers[2]}"
            style="margin-right: 10px"
            />
            <label for="answer-choice">${questions[pageCounter].wrongAnswers[2]}</label>
        </div>
        </div>
   `;

  const radioBtns = document.querySelectorAll('input[type=radio]');
  //seçilen cevabı değişkene aktarma kısmı
  radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener('change', e => {
      // kullanıcının verdiği cevap answer değişkenine aktar
      answer = e.target.value;
    });
  });
}

//verilen cevaplar
const answersGiven = [];
const results = [];

const continueBtn = document.querySelector('.continue');
// devam et basıldığında oluşacak olay
continueBtn.addEventListener('click', () => {
  console.log(answer);
  if (answer != null) {
    answersGiven.push(answer);
    answer = null;
    //   console.log(answersGiven);
    pageCounter++;
    if (pageCounter <= 2) {
      buildQuestionAnswerEl();
    } else {
      calculateResults();
      buildFinishScreen();
    }
  }
});

function calculateResults() {
  for (let i = 0; i < answersGiven.length; i++) {
    results.push({
      correctAnswer: questions[i].answer,
      answersGiven: answersGiven[i],
    });
  }
}

function buildFinishScreen() {
  const questionsAnswersContainer = document.querySelector(
    '.questions-answers-container'
  );
  questionsAnswersContainer.innerHTML = '';
  results.forEach(item => {
    questionsAnswersContainer.innerHTML += `
        <div id="result-container" style="display: flex; width: 100%; border-bottom: 3px solid rgb(229, 239, 247)">
            <div style="background-color: #00b894; width: 200px; height: 40px; border-radius: 5px; margin: 10px; color: #fff; text-align: center; line-height: 40px">${
              item.correctAnswer
            }</div>
            <div style="background-color: ${
              item.correctAnswer == item.answersGiven ? '#00b894' : '#d63031'
            }; width: 200px; height: 40px; border-radius: 5px; margin: 10px; color: #fff; text-align: center; line-height: 40px">${
      item.answersGiven
    }</div>
        </div>
      `;
  });
}
