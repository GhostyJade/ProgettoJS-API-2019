var data = []
let theCorrectAnswer

const unsplashApiKey = "ba4e6a7d1a48e8f0c7501a7c3417fbc8ae34540b13c806187f37307b8f8edea1"

const image = document.getElementById("image")
const text = document.getElementById("text")
const btnNextQuestion = document.getElementById("nextQuestion")
const btnCheckQuestion = document.getElementById("conf")
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
            data = content.results
        }).then(dispatchQuestion)
}

const createRadioElement = (data, index) => {
    const el = document.createElement("input")
    el.setAttribute("type", "radio")
    el.setAttribute("id", "option" + index)
    el.setAttribute("name", "answer")
    el.setAttribute("value", data)
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
    theCorrectAnswer = q.correct_answer
    console.log(theCorrectAnswer)
    answers.push(theCorrectAnswer)
    shuffle(answers)
    getImage(q.category)

    text.innerHTML = txt
    for (var i = 0; i < answers.length; i++) {
        createRadioElement(answers[i], i)
    }
}

const getImage = async (name) => {
    fetch("https://api.unsplash.com/search/photos/?client_id=" + unsplashApiKey + "&query=" + name + "&orientation=landscape").then(content => content.json()).then(e => image.setAttribute("src", e.results[0].urls.regular))
}

const createAlert = () => {

}

const checkAnswer = () => {
    const radios = document.getElementsByName("answer")
    if (radios !== null)
        for (let i = 0; i < radios.length; i++)
            if (radios[i].checked)
                if (radios[i].value === theCorrectAnswer)
                    console.log("CORRECT")
                else
                    console.log("WRONG")

}

getQuestions()

btnNextQuestion.onclick = dispatchQuestion
btnCheckQuestion.onclick = checkAnswer