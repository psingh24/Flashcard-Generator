var fs = require("fs")


function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    this.createCard = function() {

        // var front = this.front;
        // var back = this.back;
        
        // var output = "Front: "+front+", Back: "+back
        var basicData = {
            front: this.front,
            back: this.back,
            type: "basic"
        }
        // var data = JSON.stringify(basicData, null, 2)
        fs.appendFile("log.txt", JSON.stringify(basicData) + ";", function(err) {

            if(err) {
                console.log(err)
            }
        })

    }
}

module.exports = BasicCard;