const image = document.getElementById("image")
const text = document.getElementById("text")

let questionDefinition = {
    category: "", question: "" 
}

const getQuestions = () => {
    var data = []
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
        .then(content => {
            var d = content.results
            console.log(d.length)
            for(i = 0; i < d.length; i++){
                data.push(d[i])
            }
        })
        .then(console.log(data.length))
        //.then(document.getElementById("game").onclick=dispatchQuestion(retrievedQuestions[0]))
}

async function dispatchQuestion (question) {
    //console.log(question)
    const txt = question.question
    // const img
    text.innerText = txt
}


getQuestions()
