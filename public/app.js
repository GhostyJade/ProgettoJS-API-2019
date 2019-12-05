var data = []

const image = document.getElementById("image")
const text = document.getElementById("text")
const btnNextQuestion = document.getElementById("nextQuestion")
const options = document.getElementById("options")

/**
 * Shuffles array in place. (took from stackoverflow.)
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const getQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
        .then(content => {
            var d = content.results
            for (i = 0; i < d.length; i++) {
                data.push(d[i])
            } //TODO maybe I can improve by assigning it directly, instead of looping
        }).then(dispatchQuestion)
}

const createRadioElement = (data, index) => {
    const el = document.createElement("input")
    el.setAttribute("type", "radio")
    el.setAttribute("id", "option" + index)
    const lbl = document.createElement("label")
    lbl.setAttribute("for", "option" + index)
    lbl.setAttribute("id", "opt" + index)
    lbl.innerText = data
    options.appendChild(el)
    options.appendChild(lbl)
    const emptiness = document.createElement("br")
    options.appendChild(emptiness)
}

const dispatchQuestion = () => {
    const q = data.pop()
    const txt = q.question
    var answers = q.incorrect_answers
    answers.push(q.correct_answer)
    shuffle(answers)
    // const img
    text.innerHTML = txt
    for (var i = 0; i < answers.length; i++) {
        //document.getElementById("opt" + i).innerText = answers[i]
        createRadioElement(answers[i], i)
    }
}

const checkAnswer = () => {

}

getQuestions()

btnNextQuestion.onclick = dispatchQuestion