var fs = require('fs');
var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.html", "utf-8")

var csvParse = function(file){
  //Set arr to an array where each row is an element, starting with the header
  var csvArr = csvFile.split("\n");
  //Take out and define the header
  var header = csvArr.shift().split(",");
  var newObj={};
  var finalArr = [];
  for (i=0;i<csvArr.length;i++){
      //Define person array into an array for each person
      var personArr = csvArr[i].split(",");
      //Reset object
      newObj = {};
      //Inside loop will assign the properties of the headers to each person
      for (j=0;j<personArr.length;j++){
          newObj[header[j]]=personArr[j];
      }
      finalArr.push(newObj);
  }
  return(finalArr);
};
