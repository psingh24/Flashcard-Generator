var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js")
var inquirer = require("inquirer");
var fs = require("fs")


function app() {
    inquirer.prompt([{
            name: "route",
            message: "What would you like to do?",
            type: "list",
            choices: ["Make a Basic Card", "Make a Cloze Card", "Show me existing cards", "Quiz me!"]
        },
        {
            name: "basicCardFront",
            message: "What would you like to be on the front of the card?",
            when: function (answers) {
                return answers.route === "Make a Basic Card"
            }
        },
        {
            name: "basicCardBack",
            message: "What would you like to be on the back of the card?",
            when: function (answers) {
                return answers.basicCardFront
            },

        },
        {
            name: "clozeCardFull",
            message: "What is the full question?",
            when: function (answers) {
                return answers.route === "Make a Cloze Card"
            }
        },
        {
            name: "clozeCardhiddens",
            message: "What should I hide from the question?",
            when: function (answers) {
                return answers.clozeCardFull
            },

        }
    ]).then(function (answers) {
        if (answers.route === "Make a Basic Card") {
            var newBasicCard = new BasicCard(answers.basicCardFront, answers.basicCardBack);
            newBasicCard.createCard();

            setTimeout(app, 2000)
        } else if (answers.route === "Make a Cloze Card") {
            var newClozeCard = new ClozeCard(answers.clozeCardFull, answers.clozeCardhiddens);
            newClozeCard.createCard();

            setTimeout(app, 2000)
        } else if (answers.route === "Show me existing cards") {

            fs.readFile("log.txt", 'utf8', function (err, data) {
                //turn the log file into an array
                var questionsArray = data.split(";")

                questionsArray.splice(questionsArray.length - 1)
                console.log(questionsArray)

                setTimeout(app, 2000)
            })
        } else if (answers.route === "Quiz me!") {
            fs.readFile("log.txt", 'utf8', function (err, data) {
                var questionsArray = data.split(";")
                questionsArray.splice(questionsArray.length - 1)
                var index = 0;
                playFlashCards(questionsArray, index)



            })
        }

    })

}

function playFlashCards(array, index) {

    var questions = array[index]
    var parsedQuestion = JSON.parse(questions)

    var question;
    var correctAnswer;

    if (parsedQuestion.type === "basic") {
        question = parsedQuestion.front;
        correctAnswer = parsedQuestion.back
    } else if (parsedQuestion.type === "cloze") {
        question = parsedQuestion.fullText;
        correctAnswer = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: "quiz",
        message: question
    }]).then(function (answer) {
        if (answer.quiz === correctAnswer) {
            console.log("correct")

            if (array.length - 1 > index) {
                playFlashCards(array, index + 1)
            } else {
                setTimeout(app, 2000)
            }
        } else {
            console.log("Incorrect")

            if (array.length - 1 > index) {
                playFlashCards(array, index + 1)
            } else {
                setTimeout(app, 2000)
            }

        }

    })
}

app()