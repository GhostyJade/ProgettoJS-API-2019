var retrievedQuestions = []

const image = document.getElementById("image")
const text = document.getElementById("text")

const getQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
        .then(content => content.results.forEach(e=>retrievedQuestions.push(e)))
        //.then(document.getElementById("game").onclick=dispatchQuestion(retrievedQuestions[0]))
}

async function dispatchQuestion (question) {
    //console.log(question)
    const txt = question.question
    // const img
    text.innerText = txt
}


getQuestions()

