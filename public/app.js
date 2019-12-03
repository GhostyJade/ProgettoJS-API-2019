var retrievedQuestions = []

const image = document.getElementById("image")
const text = document.getElementById("text")

async function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
        .then(e => retrievedQuestions.push(e))
}

async function dispatchQuestion (question) {
    const txt = question.question
    const img
    text.innerText = txt
}

await getQuestions()
document.getElementById("game").onclick=await dispatchQuestion(retrievedQuestions[0])

