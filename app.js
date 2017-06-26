var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js")
var inquirer = require("inquirer");
var fs = require("fs")


inquirer.prompt([

        {
            name: "route",
            message: "What would you like to do?",
            type: "list",
            choices: ["Make a Basic Card", "Make a Cloze Card", "Show me existing cards"]
        },
        {
            name: "basicCardFront",
            message: "What would you like to be on the front of the card?",
            when: function(answers) {
                return answers.route === "Make a Basic Card"
            }
        },
        {
            name: "basicCardBack",
            message: "What would you like to be on the back of the card?",
            when: function(answers) {
                return answers.basicCardFront
            },

        },
        {
            name: "clozeCardFull",
            message: "What is the full question?",
            when: function(answers) {
                return answers.route === "Make a Cloze Card"
            }
        },
        {
            name: "clozeCardhiddens",
            message: "What should I hide from the question?",
            when: function(answers) {
                return answers.clozeCardFull
            },

        }
]).then(function(answers) {
    if(answers.route === "Make a Basic Card") {
        var newBasicCard = new BasicCard(answers.basicCardFront, answers.basicCardBack);
        newBasicCard.createCard();

    }
    else if(answers.route === "Make a Cloze Card") {
        var newClozeCard = new ClozeCard(answers.clozeCardFull, answers.clozeCardhiddens);
        newClozeCard.createCard();

    }
    else if(answers.route === "Show me existing cards") {
        
        fs.readFile("log.txt", 'utf8', function(err, data) {
         var question = data.split(";")
         console.log(question)
         
         var questions1 = question[0]

         var parsedQuestion = JSON.parse(questions1)

        //  console.log(parsedQuestion.type)
         var firstques = parsedQuestion.front
         var answer = parsedQuestion.back

         inquirer.prompt([
             {
                 name: "question",
                 message: firstques
             }
         ]).then(function (answers) {  
             if(answers.question === answer) {
                 console.log("Thats right")
             }
         })

            // var text = data.splice(",")
            // console.log(text)
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i])
            // }
        })

    }
})