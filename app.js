const express = require('express');
const app = express();

const csv=require('csvtojson');



app.get('/',function(req,res){
	 // console.log(req.query)
     res.send("hello")
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/home',express.static(__dirname + '/public'))

app.get('/todo',function(req,res){
     console.log("in get ")
     csv()
  .fromFile('./todo.csv')
  .then((jsonObj)=>{
      res.send(jsonObj);
     // console.log("inget1",jsonObj);
  })
})

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// });   

app.post('/todo',function(req,res){
	var csvWriter = require('csv-write-stream');
    var fs =require('fs')
	var writer = csvWriter({ headers: ["content" , "checked"]})
	writer.pipe(fs.createWriteStream('todo.csv'));

	let array=req.body.todoList
	console.log("in post",array);
	if(array){
	for (key of array) {
       let content= key["content"];
       let checked= key["checked"];
       console.log("postcontent",content);
       console.log("postchecked",checked);
       writer.write({ content , checked });
        // console.log(todos,check);
    }
    writer.end();
}
    res.send("");
})

app.set('port',process.env.PORT || 7000)
app.listen(app.get('port'), function(err) {

    if (!err)
        console.log("Server started at localhost:7000");
    else {
        console.log("server not listening")
        console.log(err)
    }
});

