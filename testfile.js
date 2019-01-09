var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {

    
        return console.log(error);
    }

    var dataArr = data.split(",");

    console.log(dataArr[0]);
    console.log(dataArr[1]);

