var fs = require("fs")


function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partialText = this.text.replace(cloze, "_____")
    this.createCard = function () {

        // var text = this.text;
        // var cloze = this.cloze;
        // var partialText = this.text.replace(cloze, "_____" )

        // var output = "Full Question: "+text+", Partial: "+partialText+", cloze: "+cloze
        var clozeData = {
            text: this.text,
            cloze: this.cloze,
            fullText: this.partialText,
            type: "cloze"
        }
        var data = JSON.stringify(clozeData) + ";"

        fs.appendFile("log.txt", data, function (err) {

            if (err) {
                console.log(err)
            }
        })

    }
}

module.exports = ClozeCard;