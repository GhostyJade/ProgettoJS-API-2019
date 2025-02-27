var data = []
let theCorrectAnswer

const unsplashApiKey = "ba4e6a7d1a48e8f0c7501a7c3417fbc8ae34540b13c806187f37307b8f8edea1"

const image = document.getElementById("image")
const text = document.getElementById("text")
let btnNextQuestion
let btnCheckQuestion
const options = document.getElementById("options")
const result = document.getElementById("result")
const masterContainer = document.getElementById("masterOfPuppets")
const subContainer = document.getElementById("subContainer")
const onscreenScore = document.getElementById("scoreh")

let score = 0
let currentQuestion = 0
let totalQuestions = 25
let submitted = false

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
    fetch("https://opentdb.com/api.php?amount=" + totalQuestions)
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
    lbl.innerHTML = data
    options.appendChild(el)
    options.appendChild(lbl)
    const emptiness = document.createElement("br")
    options.appendChild(emptiness)
}

const recreateButtons = () => {
    options.appendChild(btnNextQuestion)
    options.appendChild(btnCheckQuestion)
}

const dispatchQuestion = () => {
    if (data.length > 0) {
        updateOnScreenScore()
        submitted = false
        result.innerHTML = ""
        options.innerHTML = ""
        const q = data.pop()

        const txt = q.question
        var answers = q.incorrect_answers
        theCorrectAnswer = q.correct_answer
        // console.log(theCorrectAnswer)
        answers.push(theCorrectAnswer)
        shuffle(answers)
        getImage(q.category)

        text.innerHTML = txt
        for (var i = 0; i < answers.length; i++) {
            createRadioElement(answers[i], i)
        }
        recreateButtons()
        currentQuestion++
    } else {
        subContainer.remove()
        showScores()
    }
}

const getImage = async (name) => {
    fetch("https://api.unsplash.com/search/photos/?client_id=" + unsplashApiKey + "&query=" + name + "&orientation=landscape")
        .then(content => content.json())
        .then(e => image.setAttribute("src", e.results[Math.round(Math.random() * 10 - 1)].urls.regular))
}

const createAlert = (status) => {
    result.innerHTML = ""
    const alert = document.createElement("p")
    const mk = document.createElement("mark")
    mk.setAttribute("class", "tag")
    if (status) {
        mk.classList.add("tertiary")
        mk.innerText = "Correct"
    }
    else {
        mk.classList.add("secondary")
        mk.innerText = "Wrong"
    }
    alert.appendChild(mk)
    result.appendChild(alert)
}

const checkAnswer = () => {
    const radios = document.getElementsByName("answer")
    if (!submitted && radios !== null) {
        radios.forEach(e => { if (e.checked) submitted = true })
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                if (radios[i].value === theCorrectAnswer) {
                    score++
                    createAlert(true)
                }
                else {
                    createAlert(false)
                }

            }
        }
    }
}

const initButtons = () => {
    btnNextQuestion = document.createElement("input")
    btnNextQuestion.setAttribute("type", "button")
    btnNextQuestion.setAttribute("value", "Next")
    btnNextQuestion.setAttribute("id", "thankYouNext")
    btnNextQuestion.onclick = dispatchQuestion
    btnCheckQuestion = document.createElement("input")
    btnCheckQuestion.setAttribute("type", "button")
    btnCheckQuestion.setAttribute("value", "Confirm")
    btnCheckQuestion.setAttribute("class", "primary")
    btnCheckQuestion.setAttribute("id", "checkQuestion")
    btnCheckQuestion.onclick = checkAnswer
}

const updateOnScreenScore = () => {
    onscreenScore.innerText = "Correct answers: " + score + " / " + totalQuestions + " - Remaining questions: " + data.length
}

const elementFactory = (type, data, classAttribs) => {
    const el = document.createElement(type)
    if (!classAttribs.length == 0) {
        classAttribs.forEach(e => el.setAttribute(e.name, e.value))
    }
    el.innerText = data
    return el
}

const showScores = () => {
    masterContainer.appendChild(elementFactory("p", "Your score is " + score + "/" + totalQuestions, [[name = "class", value = "results"]]))
}

getQuestions()
initButtons()
