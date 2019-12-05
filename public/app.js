var data = []

const image = document.getElementById("image")
const text = document.getElementById("text")

const getQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
        .then(content => {
            var d = content.results
            for(i = 0; i < d.length; i++){
                data.push(d[i])
            } //TODO maybe I can improve by assigning it directly, instead of looping
        })
        //.then(document.getElementById("game").onclick=dispatchQuestion(retrievedQuestions[0]))
}

async function dispatchQuestion (question) {
    //console.log(question)
    const txt = question.question
    // const img
    text.innerText = txt
}


getQuestions()
