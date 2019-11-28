var retrievedQuestions = []

fetch("https://opentdb.com/api.php?amount=10").then(response => response.json()).then(e => console.log(e))

