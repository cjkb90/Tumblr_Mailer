var fs = require('fs');
var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.html", "utf-8")
var emailTemplateEJS = fs.readFileSync("email_template.ejs","utf-8")
var ejs = require('ejs');
var tumblr = require('tumblr.js')
var client = tumblr.createClient({
  consumer_key: 'xx',
  consumer_secret: 'xx',
  token: 'xx',
  token_secret: 'xx'
});

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

var contactData = csvParse(csvFile);

var customEmail = function(data, html){
  for (i=0;i<data.length;i++){
    var htmlCustom = html.replace("FIRST_NAME", data[i].firstName).replace("NUM_MONTHS_SINCE_CONTACT",data[i].numMonthsSinceContact);
    console.log(htmlCustom);
  }
}


client.posts('cjkb90.tumblr.com', function(err, blog){
  var latestPosts = [];
  for (i=0;i<blog.posts.length;i++){
      var blogDate = new Date(blog.posts[i].date.slice(0,11));
      var oneWeekAgo = new Date(Date.now());
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      if (blogDate > oneWeekAgo){
        latestPosts.push(blog.posts[i]);
      }
  }
  var makeTemplate = function(data){
  for(i=0;i<data.length;i++){
    var customizedTemplate = ejs.render(emailTemplateEJS, 
                    { firstName: data[i].firstName,  
                      numMonthsSinceContact: data[i].numMonthsSinceContact,
                      latestPosts: latestPosts
                    });
    console.log(customizedTemplate);
  }
}
  makeTemplate(contactData);
})