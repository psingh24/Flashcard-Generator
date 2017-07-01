var fs = require("fs");

function BasicCard(front, back) {
  this.front = front;
  this.back = back;
  this.createCard = function() {
    // var front = this.front;
    // var back = this.back;

    // var output = "Front: "+this.front+", Back: "+this.back+", Type: basic;"
    var basicData = {
      front: this.front,
      back: this.back,
      type: "basic"
    };

    var data = JSON.stringify(basicData) + ";";

    fs.appendFile("log.txt", data, function(err) {
      if (err) {
        console.log(err);
      }
    });
  };
}

module.exports = BasicCard;
